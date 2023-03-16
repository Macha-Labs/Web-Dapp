import React, { useContext, useMemo } from "react";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import { Button, Heading, Switch, Text } from "@chakra-ui/react";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { DataContext } from "@/providers/DataProvider";
import ModalSlider from "@/components/modal/ModalSlider";
import LayoutCard from "@/layouts/LayoutCard";

const ChatPermissions = (props: any) => {
  const dataContext = useContext(DataContext);
  const hookPortalChannel = usePortalChannel(dataContext?.channel);

  const permissionOptions = [
    {
      value: "send-links",
      text: "send links",
    },
    {
      value: "send-images",
      text: "send images",
    },
    {
      value: "upload-file",
      text: "send files",
    },
    {
      value: "send-message",
      text: "send message",
    },
    {
      value: "send-reply",
      text: "send reply",
    },
    {
      value: "send-reaction",
      text: "send reaction",
    },
    {
      value: "pin-message",
      text: "pin message",
    },
    {
      value: "flag-message",
      text: "flag message",
    },
    {
      value: "delete-own-message",
      text: "delete own message",
    },
    {
      value: "update-own-message",
      text: "update own message",
    },
    {
      value: "leave-channel",
      text: "leave channel",
    },
  ];

  const adminOptions = [
    {
      value: "delete-channel",
      text: "delete channel",
    },
    {
      value: "update-channel",
      text: "update channel",
    },
    {
      value: "freeze-channel",
      text: "freeze channel",
    },
    {
      value: "delete-any-message",
      text: "delete any message",
    },
  ];


  return (
    <ModalSlider event={props.modalChatPermission} size="sm" 
    
    header={
      <Row className="hr-between vr-center w-100">
        <Heading as="h6" size="sm">Permissions</Heading>
        <Button
          size="sm"
          variant="state_brand"
          onClick={() => {
            hookPortalChannel.updatePermissions();
          }}
        >
          Save
        </Button>
      </Row>
    }

    footer={<Text>Changes done will be reflected for all the members of the channel</Text>}
    
    >
        <>
        {permissionOptions.map((permission: any, index: any) => {
          return (
            <StyledCard className="m-b-0-5 state_hover">
              
              <Row key={permission.value} className="p-1 hr-between">
                <Text fontSize="sm">{permission.text}</Text>
                <Switch
                  defaultChecked={hookPortalChannel?.channel?.permissions?.includes(
                    permission.value
                  )}
                  onChange={() =>
                    hookPortalChannel?.togglePermission(permission.value)
                  }
                  isChecked={hookPortalChannel?.channel?.permissions?.includes(
                    permission.value
                  )}
                />
              </Row>
            </StyledCard>
          );
        })}
      </>
    </ModalSlider>
    
  );
};

export default ChatPermissions;
