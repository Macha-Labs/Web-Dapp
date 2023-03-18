import useXmtpChannelNew from "@/hooks/xmtp/useXmtpChannelNew";
import { Button, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import ModalSlider from "../modal/ModalSlider";

const ChatNewDm = (props: any) => {
    const hookXmtpChannelNew = useXmtpChannelNew();

    const callback = () => {
        props.modal.onClose();
    }

    return (
        <ModalSlider event={props.modal} size="sm" header={<Heading as="h6" size="sm">New Inbox</Heading>}>
            <InputGroup size='md'>
            <Input
                placeholder='Search with address or lens handle'
                ref={hookXmtpChannelNew.input}
            />
            <InputRightElement width='4.5rem'>
                <Button variant="state_brand" size='xs' onClick={() => {hookXmtpChannelNew.validate(callback)}}>
                    Search
                </Button>
            </InputRightElement>
            </InputGroup>
        </ModalSlider>
    )
}

export default ChatNewDm;