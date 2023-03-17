import {Col, Row, StyledCard} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext} from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { truncateAddress } from "@/helpers";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import { DataContext } from "@/providers/DataProvider";
import ModalSlider from "@/components/modal/ModalSlider";

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
  }


  return (
    <ModalSlider size="sm" event={props.modalChatMembers} header={
      <>
        <Row className="hr-between vr-center w-full">
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
    }>
      <>
        {dataContext?.members?.onlineUsers
          .concat(dataContext?.members?.offlineUsers)
          ?.map((item: any, index: any) => {
            return (
              <StyledCard className="state_hover m-b-0-5"  key={`key-${index}`}>
                <Row className="hr-between p-1">
                  <Row className="hr-between vr-center">
                    <div>
                      <Avatar size="sm" src={item?.lens?.image} className="m-r-1"/>
                    </div>
                    <Col>
                      <Text>
                        {item?.lens?.name ? item?.lens?.name : truncateAddress(item?.lens?.id)}
                      </Text>
                      <Text color="#6FC62A">@{item?.lens?.handle}</Text>
                    </Col>
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
              </StyledCard>
            );
          })}
      </>

    </ModalSlider>
  );
};

export default ChatMembers;
