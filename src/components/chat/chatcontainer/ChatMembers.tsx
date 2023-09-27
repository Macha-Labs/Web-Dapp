import { StyledCol, StyledRow, StyledCard } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { truncateAddress } from "@/helpers";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useChatMembersStore } from "@/store/useChatMembersStore";


const ChatMembers = (props: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  // const chatContext = useContext(ChatContext);
  const $channel = useChatChannelStore((state: any) => state.channel);

  const $memberAll = useChatMembersStore((state: any) => state.memberAll);
  const toast = useToast();

  const onClickAddMembers = () => {
    props.modalAddMembers.onOpen();
    props.modalChatMembers.onClose();
    props?.modalSettings.onClose();
  };

  return (
    <ModalSlider
      size="sm"
      event={props.modalChatMembers}
      header={
        <>
          <StyledRow className="hr-between vr-center w-full">
            <Button
              onClick={function (): void {}}
          
              size="xs"
              variant="state_default_hover"
            >
              Remove
            </Button>
            <Button onClick={onClickAddMembers} size="sm" variant="state_brand">
              Add New Members
            </Button>
          </StyledRow>
        </>
      }
    >
      <>
        {$memberAll?.map((item: any, index: any) => {
          return (
            <StyledCard className="state_hover m-b-0-5" key={`key-${index}`}>
              <StyledRow className="hr-between p-1">
                <StyledRow className="hr-between vr-center">
                  <div>
                    <Avatar
                      size="sm"
                      src={item?.lens?.image}
                      className="m-r-1"
                    />
                  </div>
                  <StyledCol>
                    <Text>
                      {item?.lens?.name
                        ? item?.lens?.name
                        : truncateAddress(item?.lens?.id)}
                    </Text>
                    <Text color="#6FC62A">@{item?.lens?.handle}</Text>
                  </StyledCol>
                </StyledRow>

                {item?.lens?.ownedBy != authContext?.address && (
                  <Checkbox value="" />
                )}
              </StyledRow>
            </StyledCard>
          );
        })}
      </>
    </ModalSlider>
  );
};

export default ChatMembers;
