import useChatChannelsStore from "@/store/useChatChannelsStore";
import { Col } from "@/styles/StyledComponents";
import { Button, Heading, Image } from "@chakra-ui/react";

const ChatNonDisplay = () => {
  const $channels = useChatChannelsStore((state: any) => state.channels);

  return (
    <>
      {/* <StyledChat className="flex-hr-vr-center">
        Select Channel from list
      </StyledChat> */}
      {$channels?.length ? (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/nochatselected.png" className="w-30 m-b-2" />
          <Heading className="m-b-1" size="lg">
            Select Channel
          </Heading>
          <Heading className="" size="xs">
            No chat selected, select from the pannel
          </Heading>
        </Col>
      ) : (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/noChannels.png" className="w-30 m-b-1" />
          <Heading className="m-b-1" size="lg">
            Getting Started
          </Heading>
          <Heading className="" size="xs">
            Create a new channel or join with the invite link
          </Heading>
          <Button variant="state_brand" className=" m-t-1">
            Join Metawork Community
          </Button>
        </Col>
      )}
    </>
  );
};

export default ChatNonDisplay;
