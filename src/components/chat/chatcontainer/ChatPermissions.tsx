import React, { useContext, useMemo } from "react";

import { ChatContext } from "@/providers/ChatProvider";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import { Button, Switch, Text } from "@chakra-ui/react";

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
        {permissionOptions.map((permission, index) => {
          return (
            <>
              <Row key={index} className="p-1 hr-between">
                <Text fontSize="sm" >{permission.text}</Text>                
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
            </>
          );
        })}
      </StyledCard>
    );
  };

  return (
    <Col className="p-5">
      <TemplateUserPermissions />
      <div className="p-t-3">
        Changes done will be reflected for all the members of the channel
      </div>
      <Button
        onClick={() => {
          hookPortalChannel.updatePermissions();
        }}
      >
        Save
      </Button>
    </Col>
  );
};

export default ChatPermissions;
