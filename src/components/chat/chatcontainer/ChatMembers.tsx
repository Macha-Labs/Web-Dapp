import {Row} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatMembers = (props: any) => {
  const hookPortalChannelMembership = usePortalChannelMembership(props?.hookChannel?.channel);
  const chatContext = useContext(ChatContext);

  return (
    <>
      <LayoutCardPannel
        header={
          <>
            <Row className="hr-between vr-center">
              <Button
                onClick={function (): void {
                  hookPortalChannelMembership.removeMembersFromChannel();
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
              {/* {console.log("itm",item.name,"full ",item)}  */}
                <Row className="hr-between p-1">
                  <Row className="hr-between">
                    <div>
                      <Avatar src={item?.image} className="m-r-1"/>
                    </div>
                    <div>
                      <Text>
                        {item?.name ? item?.name : truncateAddress(item?.id)}
                      </Text>
                      <Text color="#6FC62A">@{item?.handle}</Text>
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
