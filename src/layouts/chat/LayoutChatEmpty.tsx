import { Heading, Text } from "@chakra-ui/react";
import { StyledCol } from "@/styles/StyledComponents";

const LayoutChatEmpty = (props: any) => {
    return (
        <StyledCol className="p-1">
            <Heading as="h4" size="lg">No message</Heading>
            <Text fontSize="md">Be the first one to start conversation in #{props?.channel?.name}</Text>
        </StyledCol>
    )
}

export default LayoutChatEmpty;