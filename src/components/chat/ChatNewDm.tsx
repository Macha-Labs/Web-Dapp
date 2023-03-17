import { Heading } from "@chakra-ui/react";
import ModalSlider from "../modal/ModalSlider";

const ChatNewDm = (props: any) => {
    return (
        <ModalSlider event={props.modal} size="sm" header={<Heading as="h6" size="sm">New Inbox</Heading>}></ModalSlider>
    )
}

export default ChatNewDm;