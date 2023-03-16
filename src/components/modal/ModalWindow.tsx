import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton } from "@chakra-ui/react";

const ModalWindow = (props: any) => {
    return <>
        <Modal onClose={props.event?.onClose} isOpen={props.event?.isOpen} size='xl'>
                <ModalOverlay />
                {props.header && <ModalHeader>
                    {props?.header}
                    <ModalCloseButton></ModalCloseButton>
                </ModalHeader>}
                <ModalContent className="hidescroll">
                    <ModalBody className="hidescroll" style={{ padding: "0px" }}>
                        {props.children}
                    </ModalBody>
                </ModalContent>
            </Modal>
    </>
}

export default ModalWindow;