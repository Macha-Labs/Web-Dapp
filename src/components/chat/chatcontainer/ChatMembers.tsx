import {Row} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatMembers = (props: any) => {
  const hookPortalChannelMembership = usePortalChannelMembership(props?.hookChannel?.channel);
  const chatContext = useContext(ChatContext);
  const toast = useToast();

  const callbackRemove = () => {
    props?.modalAddMembers.onClose();
    toast({
      title: "Channel Members Removed",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
  }

  return (
    <>
      <LayoutCardPannel
        header={
          <>
            <Row className="hr-between vr-center">
              <Button
                onClick={function (): void {
                  hookPortalChannelMembership.removeMembersFromChannel(callbackRemove);
                }}
                size="xs"
                variant="state_default_hover"
              >
                Remove
              </Button>
              <Button
                onClick={() => props.modalAddMembers.onOpen()}
                size="sm"
                variant="state_brand"
              >
                Add New Members
              </Button>
            </Row>
          </>
        }
      >
        {chatContext.hookMembers.onlineUsers
          .concat(chatContext.hookMembers.offlineUsers)
          ?.map((item: any, index: any) => {
            return (
              <>
                <Row className="hr-between p-1">
                  <Row className="hr-between">
                    <div>
                      <Avatar src={item?.lens?.image} className="m-r-1"/>
                    </div>
                    <div>
                      <Text>
                        {item?.lens?.name ? item?.lens?.name : truncateAddress(item?.lens?.id)}
                      </Text>
                      <Text color="#6FC62A">@{item?.lens?.handle}</Text>
                    </div>
                  </Row>
                  <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(
                        item
                      )
                    }
                  />
                </Row>
              </>
            );
          })}
      </LayoutCardPannel>

    </>
  );
};

export default ChatMembers;
