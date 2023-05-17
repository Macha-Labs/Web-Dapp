import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import { StyledCol } from "@/styles/StyledComponents";
import { Button, Heading, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";

const ChatNonDisplay = () => {
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);

  return (
    <>
      {$channelLoad && (
        <StyledCol className="flex-hr-vr-center h-100">
          <Spinner size="lg" />
        </StyledCol>
      )}

      {!$channelLoad && $channels?.length && (
        <StyledCol className="flex-hr-vr-center h-100">
          <Image src="/assets/nochatselected.png" className="w-30 m-b-2" />
          <Heading className="m-b-1" size="lg">
            Select Channel
          </Heading>
          <Heading className="" size="xs">
            No chat selected, select from the pannel
          </Heading>
        </StyledCol>
      )}

      {!$channelLoad && !$channels?.length && (
        <StyledCol className="flex-hr-vr-center h-100">
          <Image src="/assets/noChannels.png" className="w-30 m-b-1" />
          <Heading className="m-b-1" size="lg">
            Getting Started
          </Heading>
          <Heading className="" size="xs">
            Create a new channel or join with the invite link
          </Heading>
          <Link href="https://app.metaworkhq.com/invite/c/6418713795d719dc3381cb44">
            <Button variant="state_brand" className=" m-t-1">
              Join Metawork Community
            </Button>
          </Link>
        </StyledCol>
      )}
    </>
  );
};

export default ChatNonDisplay;
