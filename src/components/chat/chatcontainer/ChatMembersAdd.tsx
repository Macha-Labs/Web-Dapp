import { Row } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Text, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { ChatContext } from "@/providers/ChatProvider";

const ChatMembersAdd = (props: any) => {
  const chatContext=useContext(ChatContext);  
  const hookPortalChannelMembership = usePortalChannelMembership(
    chatContext?.hookChannel?.channel
  );
  const toast = useToast();

  const callbackAdd = () => {
    chatContext?.streamContext.reloadMembers();
    toast({
      title: "Channel Members Added",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    props?.modalAddMembers.onClose();
    props?.modalChatMembers.onOpen();
  };

  return (
    <LayoutCardPannel
      header={
        <Row className="hr-between w-full">
          <Button
            size="xs"
            onClick={props?.modalAddMembers.onClose}
            variant="state_default_hover"
          >
            Cancel
          </Button>
          <Text size={"sm"}>Add Members</Text>
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
      {hookPortalChannelMembership?.followers?.map((item: any, index: any) => {
        return (
          <>
            {!chatContext?.hookMembers?.allUsersIds.includes(
              item?.lens?.ownedBy.toLowerCase()
            ) && (
              <>
                <Row key={item?.id} className="hr-between p-1">
                  <Row className="vr-center">
                    <Avatar
                      src={helperIPFS(item?.lens?.image)}
                      className="m-r-0-5"
                    />
                    <Text>
                      {item?.lens?.name
                        ? item?.lens?.name
                        : item?.lens?.handle
                        ? item?.lens?.handle
                        : truncateAddress(item?.lens?.ownedBy)}
                    </Text>
                  </Row>

                  <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(item)
                    }
                  />
                </Row>
              </>
            )}
          </>
        );
      })}
    </LayoutCardPannel>
  );
};

export default ChatMembersAdd;
