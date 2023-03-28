import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import { Col } from "@/styles/StyledComponents";
import { Button, Heading, Image, Spinner } from "@chakra-ui/react";
import Link from "next/link";

const ChatNonDisplay = () => {
  const $channels = useChatChannelsStore((state: any) => state.channels);
  const $channelLoad = useChatChannelStore((state: any) => state.loading);

  return (
    <>
      {$channelLoad && (
        <Col className="flex-hr-vr-center h-100">
          <Spinner size="lg" />
        </Col>
      )}

      {!$channelLoad && $channels?.length && (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/nochatselected.png" className="w-30 m-b-2" />
          <Heading className="m-b-1" size="lg">
            Select Channel
          </Heading>
          <Heading className="" size="xs">
            No chat selected, select from the pannel
          </Heading>
        </Col>
      )}

      {!$channelLoad && !$channels?.length && (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/noChannels.png" className="w-30 m-b-1" />
          <Heading className="m-b-1" size="lg">
            Getting Started
          </Heading>
          <Heading className="" size="xs">
            Create a new channel or join with the invite link
          </Heading>
          <Link href="https://www.metaworkhq.com/invite/c/6418713795d719dc3381cb44">
            <Button variant="state_brand" className=" m-t-1">
              Join Metawork Community
            </Button>
          </Link>
        </Col>
      )}
    </>
  );
};

export default ChatNonDisplay;
