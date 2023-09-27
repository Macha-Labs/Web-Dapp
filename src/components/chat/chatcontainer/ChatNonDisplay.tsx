import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import { Button, Heading, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";

const ChatNonDisplay = () => {
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);

  return (
    <>
      <FlexColumn>
        <Image src="/assets/noChannels.png" className="w-30 m-b-1" />
        <Heading className="m-b-1" size="lg">
          Getting Started
        </Heading>

        <InputSearch width="80%" />
      </FlexColumn>
    </>
  );
};

export default ChatNonDisplay;
