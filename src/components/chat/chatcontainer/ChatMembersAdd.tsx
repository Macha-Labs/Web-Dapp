import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import ModalSlider from "@/components/modal/ModalSlider";
import useChatMembers from "@/hooks/chat/useChatMembers";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useChatMembersStore } from "@/store/useChatMembersStore";
import { ChatContext } from "@/providers/ChatProvider";

const ChatMembersAdd = (props: any) => {
  const $channel = useChatChannelStore((state: any) => state.channel);
  const chatContext = useContext(ChatContext)
  const hookPortalChannelMembership = usePortalChannelMembership($channel);
  const hookChatMembers = useChatMembers()
  const $memberIds = useChatMembersStore((state: any) => state.memberIds);
  const toast = useToast();

  const callbackAdd = () => {
    toast({
      title: "Channel Members Added",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.hookMembers?.load($channel)
    // props?.modalAddMembers.onClose();
    // props?.modalChatMembers.onOpen();
  };

  return (
    <ModalSlider event={props.modalAddMembers} size="sm"
    header={
      <Row className="hr-between vr-center w-full">
        <Button
          size="xs"
          onClick={props?.modalAddMembers.onClose}
          variant="state_default_hover"
        >
          Cancel
        </Button>
        <Heading as="h6" size="sm">Add Members</Heading>
        <Button
          variant="state_brand"
          size="sm"
          isLoading={hookPortalChannelMembership?.isLoading}
          onClick={() =>
            hookPortalChannelMembership?.addMembersToChannel(callbackAdd)
          }
        >
          Save
        </Button>
      </Row>
    }
    >
    <div>
      {hookPortalChannelMembership?.followers?.map((item: any, index: any) => {
        return (
          <>
            {!$memberIds?.includes(
              item?.lens?.ownedBy?.toLowerCase()
            ) && (
              <StyledCard className="m-b-0-5 state_hover">
                <Row key={item?.id} className="hr-between p-1">
                  <Row className="vr-center">
                    <Avatar
                      src={helperIPFS(item?.lens?.image)}
                      className="m-r-0-5"
                    />
                    <Col>
                      <Text>
                        {item?.lens?.name
                          ? item?.lens?.name
                          : item?.lens?.handle
                          ? item?.lens?.handle
                          : truncateAddress(item?.lens?.ownedBy)}
                      </Text>
                      <Text color="#6FC62A">@{item?.lens?.handle}</Text>
                    </Col>
                  </Row>
                  
                  <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(item)
                    }
                  />
                </Row>
              </StyledCard>
            )}
          </>
        );
      })}
    </div>
    </ModalSlider>
  );
};

export default ChatMembersAdd;
