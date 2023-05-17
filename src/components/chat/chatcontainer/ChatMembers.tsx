import {StyledCol, StyledRow, StyledCard} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect} from "react";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import ModalSlider from "@/components/modal/ModalSlider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useChatMembersStore } from "@/store/useChatMembersStore";
import { ChatContext } from "@/providers/ChatProvider";

const ChatMembers = (props: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const chatContext = useContext(ChatContext)
  const $channel = useChatChannelStore((state: any) => state.channel);
  const hookPortalChannelMembership = usePortalChannelMembership($channel);
  const $memberAll = useChatMembersStore((state: any) => state.memberAll);
  const toast = useToast();

  const callbackRemove = () => {
    toast({
      title: "Channel Members Removed",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.hookMembers?.load($channel
      );
  }

  const onClickAddMembers = () => {
    props.modalAddMembers.onOpen()
    props.modalChatMembers.onClose();
    props?.modalSettings.onClose()
  }

  return (
    <ModalSlider size="sm" event={props.modalChatMembers} header={
      <>
        <StyledRow className="hr-between vr-center w-full">
          <Button
            onClick={function (): void {
              hookPortalChannelMembership.removeMembersFromChannel(callbackRemove);
            }}
            isLoading={hookPortalChannelMembership?.isLoading}
            size="xs"
            variant="state_default_hover"
          >
            Remove
          </Button>
          <Button
            onClick={onClickAddMembers}
            size="sm"
            variant="state_brand"
          >
            Add New Members
          </Button>
        </StyledRow>
      </>
    }>
      <>
        {$memberAll
          ?.map((item: any, index: any) => {
            return (
              <StyledCard className="state_hover m-b-0-5"  key={`key-${index}`}>
                <StyledRow className="hr-between p-1">
                  <StyledRow className="hr-between vr-center">
                    <div>
                      <Avatar size="sm" src={item?.lens?.image} className="m-r-1"/>
                    </div>
                    <StyledCol>
                      <Text>
                        {item?.lens?.name ? item?.lens?.name : truncateAddress(item?.lens?.id)}
                      </Text>
                      <Text color="#6FC62A">@{item?.lens?.handle}</Text>
                    </StyledCol>
                  </StyledRow>

                  {item?.lens?.ownedBy != authContext?.address && <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(
                        item
                      )
                    }
                  />}
                  
                </StyledRow>
              </StyledCard>
            );
          })}
      </>

    </ModalSlider>
  );
};

export default ChatMembers;
