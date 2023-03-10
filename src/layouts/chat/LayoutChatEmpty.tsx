import { Heading, Text } from "@chakra-ui/react";
import { Col } from "@/styles/StyledComponents";

const LayoutChatEmpty = (props: any) => {
    return (
        <Col className="p-1">
            <Heading as="h4" size="lg">No message</Heading>
            <Text fontSize="md">Be the first one to start conversation in #{props?.channel?.name}</Text>
        </Col>
    )
}

export default LayoutChatEmpty;