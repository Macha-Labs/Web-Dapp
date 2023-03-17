import { Col } from "@/styles/StyledComponents";
import { useContext } from "react";
import { Button, Heading, Image } from "@chakra-ui/react";
import { DataContext } from "@/providers/DataProvider";

const ChatNonDisplay = () => {
  const dataContext = useContext(DataContext);
  return (
    <>
      {/* <StyledChat className="flex-hr-vr-center">
        Select Channel from list
      </StyledChat> */}
      {dataContext?.channels?.length ? (
        <Col className="flex-hr-vr-center h-100">
          <Image src="/assets/nochatselected.png" className="w-30 m-b-2" />
          <Heading className="" size="xs">
            Select a chat to start messaging
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
