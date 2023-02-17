import ModalSlider from "@/components/modal/ModalSlider";
import { useChannelSettings } from "@/hooks/useChannelSettings";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { Col } from "@/styles/StyledComponents";
import { Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ChatPermissions from "./ChatPermissions";

function ChatSetting() {
  const hookChannelSettings = useChannelSettings();
  const modalChatPermission = useDisclosure();
  const TemplatePermission = () => {
    return (
      <ModalSlider size={"md"} event={modalChatPermission}>
        <ChatPermissions />
      </ModalSlider>
    );
  };
  return (
    <>
      <div>
        <Heading as="h4" size="md" className="m-b-1">
          Channel Settings
        </Heading>
        <Col>
          <LayoutOptions
            options={hookChannelSettings.chatOptions}
            style={{ className: "m-b-1" }}
          />
          <LayoutOptions
            options={hookChannelSettings.chatOptions2}
            style={{ className: "m-b-1" }}
          />
          <LayoutOptions options={hookChannelSettings.chatOptions3} />
        </Col>
      </div>
      <TemplatePermission />
    </>
  );
}

export default ChatSetting;
