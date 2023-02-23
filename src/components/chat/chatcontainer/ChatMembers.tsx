import { Col, Row} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import ModalSlider from "@/components/modal/ModalSlider";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatMembers = (props: any) => {
  const hookPortalChannelMembership = usePortalChannelMembership(props?.hookChannel?.channel);
  const chatContext = useContext(ChatContext);
  const modalAddMembers = useDisclosure();

  const TemplateAddMembers = () => {
    return (
      <ModalSlider event={modalAddMembers} size="md">
        <LayoutCardPannel
          header={
            <Row className="hr-between w-full">
              <Button size="xs" onClick={modalAddMembers.onClose} variant="state_default_hover">
                Cancel
              </Button>
              <Text size={"sm"}>Add Members</Text>
              <Button variant="state_brand" size="sm" onClick={() => props.addMembersToChannel()}>
                Save
              </Button>
            </Row>
          }
        >
          {hookPortalChannelMembership?.followers?.map((item: any, index: any) => {
            console.log("followings",item)
            return (
              <>
                <Row key={index} className="hr-between p-1">
                  <Row className="vr-center">
                    <Avatar
                      src={helperIPFS(item?.lens?.image)}
                      className="m-r-0-5"
                    />
                    <Text>
                      {truncateAddress(item?.wallet?.address)}
                      {/* {item?.name
                          ? item?.name
                          : truncateAddress(
                              item?.lens?.ownedBy
                            )} */}
                    </Text>
                  </Row>

                  <Checkbox
                    value=""
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(
                        item?.wallet?.address,
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
                onClick={function (): void {
                  hookPortalChannelMembership.removeMembersFromChannel();
                }}
                size="xs"
                variant="state_default_hover"
              >
                Remove
              </Button>
              <Button
                onClick={() => modalAddMembers.onOpen()}
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
                        item?.id,
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
