import { Row } from "@/styles/StyledComponents";
import { Avatar, Button, Checkbox, Text, Icon, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import UserListPopup from "@/components/user/UserListPopup";
import ModalSlider from "@/components/modal/ModalSlider";

const ChatMembers = (props) => {
  const channel = props.route?.params?.channel;
  console.log("Focusing channel ", channel);
  const hookPortalChannelMembership = usePortalChannelMembership(channel);
  const chatContext = useContext(ChatContext);

  const modalAddMembers = useDisclosure();

  const TemplateAddMembers = ()=>{
    return (
      <ModalSlider event={modalAddMembers} size="lg">
        <UserListPopup
          visible={hookPortalChannelMembership.visible}
          setVisible={hookPortalChannelMembership.setVisible}
          addMembersToChannel={hookPortalChannelMembership.addMembersToChannel}
          handleCheckedUsers={hookPortalChannelMembership.handleCheckedUsers}
          followers={hookPortalChannelMembership.followers}
        />
      </ModalSlider>
    );
  }

  return (
    <>
      <div className="p-1">
        {/* <div onClick={() => hookPortalChannelMembership.setVisible(true)}> */}
        {/* <Row className="p-1"> */}
        {/* <Icon> */}
        {/* <IconAddMembers /> */}

        {/* </Icon> */}
        {/* <Text >Add Members</Text> */}
        {/* </Row> */}
        {/* </div> */}
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
        <Row className="p-2">
          <Button
            onClick={function (): void {
              hookPortalChannelMembership.removeMembersFromChannel();
            }}
          >
            Remove
          </Button>
        </Row>
        <Row className="p-2">
          <Button onClick={()=> modalAddMembers.onOpen()}>Add New Members</Button>
        </Row>
      </div>

      <TemplateAddMembers />
    </>
  );
};

export default ChatMembers;
