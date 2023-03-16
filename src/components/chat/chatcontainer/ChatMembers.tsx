import {Row} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { DataContext } from "@/providers/DataProvider";

const ChatMembers = (props: any) => {
  const chatContext = useContext(ChatContext);
  const dataContext = useContext(DataContext);
  const hookPortalChannelMembership = usePortalChannelMembership(dataContext?.channel);
  const toast = useToast();

  const callbackRemove = () => {
    toast({
      title: "Channel Members Removed",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.streamContext.reloadMembers();
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
                isLoading={hookPortalChannelMembership?.isLoading}
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
        {dataContext.members.onlineUsers
          .concat(dataContext.members.offlineUsers)
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
