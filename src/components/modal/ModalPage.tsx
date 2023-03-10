import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";

const ModalPage = (props: any) => {
    return <>
        <Modal onClose={props.event?.onClose} isOpen={props.event?.isOpen} size='full'>
                <ModalOverlay />
                <ModalContent className="hidescroll">
                    <ModalBody className="hidescroll" style={{ padding: "0px" }}>
                        {props.children}
                    </ModalBody>
                </ModalContent>
            </Modal>
    </>
}

export default ModalPage;