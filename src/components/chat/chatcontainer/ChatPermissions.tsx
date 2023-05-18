import React from "react";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { StyledRow, StyledCard } from "@/styles/StyledComponents";
import { Button, Heading, Switch, Text } from "@chakra-ui/react";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useChatChannelStore from "@/store/useChatChannelStore";

const ChatPermissions = (props: any) => {
  const $channel = useChatChannelStore((state: any) => state.channel);
  const hookPortalChannel = usePortalChannel($channel);

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
      <StyledRow className="hr-between vr-center w-100">
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
      </StyledRow>
    }

    footer={<Text>Changes done will be reflected for all the members of the channel</Text>}
    
    >
        <>
        {permissionOptions.map((permission: any, index: any) => {
          return (
            <StyledCard key={permission.value} className="m-b-0-5 state_hover">
              
              <StyledRow className="p-1 hr-between">
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
              </StyledRow>
            </StyledCard>
          );
        })}
      </>
    </ModalSlider>
    
  );
};

export default ChatPermissions;
