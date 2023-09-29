import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import {
  Button,
  Heading,
  Image,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

const ChatNonDisplay = () => {
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);
  const { colorMode } = useColorMode();
  return (
    <>
      <FlexColumn>
        <Image
          src={
            colorMode == "light"
              ? "/assets/Macha-logo-text-light.svg"
              : "/assets/Macha-logo-text.svg"
          }
          alt="macha-logo"
          marginBottom="2rem"
          marginTop="2rem"
        />
        {/* <Heading className="m-b-1" size="lg">
          Getting Started
        </Heading> */}

        <InputSearch width="80%" placeholder="Search for new internet" />
        {/* <VectorSearch/> */}
      </FlexColumn>
    </>
  );
};

export default ChatNonDisplay;
