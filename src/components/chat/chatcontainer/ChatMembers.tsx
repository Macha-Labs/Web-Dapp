import { Row, StyledCard } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import UserListPopup from "@/components/user/UserListPopup";
import ModalSlider from "@/components/modal/ModalSlider";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatMembers = (props) => {
  const channel = props.route?.params?.channel;
  console.log("Focusing channel ", channel);
  const hookPortalChannelMembership = usePortalChannelMembership(channel);
  const chatContext = useContext(ChatContext);

  const modalAddMembers = useDisclosure();

  const TemplateAddMembers = () => {
    return (
      <ModalSlider event={modalAddMembers} size="lg">
        <UserListPopup
          visible={hookPortalChannelMembership.visible}
          setVisible={hookPortalChannelMembership.setVisible}
          addMembersToChannel={hookPortalChannelMembership.addMembersToChannel}
          handleCheckedUsers={hookPortalChannelMembership.handleCheckedUsers}
          followers={hookPortalChannelMembership.followers}
          following={hookPortalChannelMembership.following}
        />
      </ModalSlider>
    );
  };

  return (
    <>
      <LayoutCardPannel
        header={
          <>
            <Row className="hr-between vr-center">
              <Button
                onClick={() => modalAddMembers.onOpen()}
                size="sm"
                variant="state_brand"
              >
                Add New Members
              </Button>
              <Button
                onClick={function (): void {
                  hookPortalChannelMembership.removeMembersFromChannel();
                }}
                size="xs"
              >
                Remove
              </Button>
            </Row>
          </>
        }
      >
        {chatContext.hookMembers.offlineUsers
          .concat(chatContext.hookMembers.onlineUsers)
          ?.map((item, index) => {
            return (
              <>
                <Row className="hr-between p-1">
                  <Row className="hr-between">
                    <div>
                      <Avatar src={item?.image} />
                    </div>
                    <div>
                      <Text>
                        {item?.name ? item.name : truncateAddress(item.ownedBy)}
                      </Text>
                      <Text color="#6FC62A">@{item?.handle}</Text>
                    </div>
                  </Row>
                  <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(
                        item?.ownedBy,
                        index
                      )
                    }
                  />
                </Row>
              </>
            );
          })}
      </LayoutCardPannel>

      <TemplateAddMembers />
    </>
  );
};

export default ChatMembers;
