import { useChannelSettings } from "@/dex/useChannelSettings";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { Col } from "@/styles/StyledComponents";
import { Heading } from "@chakra-ui/react";
import React from "react";

function ChatSetting() {
  const dexChannelSettings = useChannelSettings();

  return (
    <div>
      <Heading as="h4" size="md" className="m-b-1">
        Channel Settings
      </Heading>

      <Col>
        <LayoutOptions
          options={dexChannelSettings.chatOptions}
          style={{ className: "m-b-1" }}
        />
        <LayoutOptions
          options={dexChannelSettings.chatOptions2}
          style={{ className: "m-b-1" }}
        />
        <LayoutOptions options={dexChannelSettings.chatOptions3} />
      </Col>
    </div>
  );
}

export default ChatSetting;
