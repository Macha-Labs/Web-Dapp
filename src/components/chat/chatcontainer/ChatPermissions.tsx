import React, { useContext, useMemo } from "react";

import { ChatContext } from "@/providers/ChatProvider";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import { Button, Heading, Switch, Text } from "@chakra-ui/react";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatPermissions = () => {
  const chatProvider = useContext(ChatContext);
  const hookPortalChannel = usePortalChannel(chatProvider.hookChannel?.channel);

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


  const TemplateUserPermissions = () => {
    console.log("Re rendering this permission layout");
    return (
      <StyledCard>
        {hookPortalChannel?.channel?.permissions.map((permission: any, index: any) => {
          // console.log(
          //   "permissionOption",
          //   permissionOptions,
          //   "getstreamper",
          //   hookPortalChannel?.channel
          // );
          return (
            <>
              <Row key={index} className="p-1 hr-between">
                <Text fontSize="sm">{permission}</Text>
                <Switch
                  defaultChecked={hookPortalChannel?.channel?.permissions?.includes(
                    permission
                  )}
                  onChange={() =>
                    hookPortalChannel?.togglePermission(permission)
                  }
                  isChecked={hookPortalChannel?.channel?.permissions?.includes(
                    permission
                  )}
                />
              </Row>
            </>
          );
        })}
      </StyledCard>
    );
  };

  return (
    <LayoutCardPannel
      header={
        <Row className="hr-between vr-center">
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
      <TemplateUserPermissions />      
    </LayoutCardPannel>
  );
};

export default ChatPermissions;
