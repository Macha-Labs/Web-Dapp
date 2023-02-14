import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from "@chakra-ui/react";
import LayoutCardMessage from "../LayoutCardMessage";

const LayoutChatActionModal = (props) => {

    const templateActionModal = () => {
        if (props.actionMessage?.actionType?.length > 0) {
            return (
                <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered scrollBehavior="inside">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            {props.actionMessage.actionType == "Pin" ? (
                                <>
                                    <Text fontSize='lg' as='b' className="m-v-1">
                                        Pin it
                                    </Text>
                                    <Text className="m-v-1">
                                        Just double checking that you want to pin this message
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text fontSize='lg' as='b' className="m-v-1">
                                        Delete
                                    </Text>
                                    <Text className="m-v-1">
                                        Are you sure you want to delete this message
                                    </Text>
                                </>
                            )
                            }

                           <LayoutCardMessage item={props.actionMessage.item} />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={props.onClose}>
                                Close
                            </Button>
                            {props.actionMessage.actionType == "Pin" ? (
                                <Button variant='solid' colorScheme="blue" onClick={() => props.pinMessage(props.actionMessage.item)} >Pin</Button>
                            ) : (
                                <Button variant='solid' colorScheme="red" onClick={() => props.deleteMessage(props.actionMessage.item)}>Delete</Button>
                            )}

                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )
        } else {
            return (<></>)
        }
    }    

    return (
        <>
            {
                templateActionModal()
            }
        </>
    )
}

export default LayoutChatActionModal;