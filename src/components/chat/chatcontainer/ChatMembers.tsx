import { Col, Row, StyledCard } from "@/styles/StyledComponents";
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
import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import ModalSlider from "@/components/modal/ModalSlider";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatMembers = (props) => {
  console.log("hookchannel", props?.hookChannel?.channel);
  const hookPortalChannelMembership = usePortalChannelMembership(props?.hookChannel?.channel);
  const chatContext = useContext(ChatContext);
  const modalAddMembers = useDisclosure();

  const TemplateAddMembers = () => {
    return (
      <ModalSlider event={modalAddMembers} size="md">
        <LayoutCardPannel
          header={
            <Row className="hr-between w-full">
              <Button size="sm" onClick={() => props.setVisible(false)}>
                Cancel
              </Button>
              <Text size={"sm"}>Add Members</Text>
              <Button variant="state_brand" size="sm" onClick={() => props.addMembersToChannel()}>
                Save
              </Button>
            </Row>
          }
        >
          {hookPortalChannelMembership.following.map((item, index) => {
            return (
              <>
                <Row key={index} className="p-5 hr-between">
                  <Row className="hr-between">
                    <div>
                      <Avatar
                        src={helperIPFS(
                          item?.image
                        )}
                      />
                    </div>
                    <div>
                      <Text>
                        {item?.name
                          ? item?.name
                          : truncateAddress(
                              item?.ownedBy
                            )}
                      </Text>
                      <Text color="#6FC62A">
                        @{item?.handle}
                      </Text>
                    </div>
                  </Row>

                  <Checkbox
                    value=""
                    onChange={() =>
                      props.handleCheckedUsers(
                        item?.wallet?.defaultProfile?.ownedBy,
                        index
                      )
                    }
                  />
                </Row>
              </>
            );
          })}
        </LayoutCardPannel>
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
