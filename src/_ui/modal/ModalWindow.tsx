import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

type Props = {
  event: any;
  size?: string;
  header?: any;
  childrenComponent?: any;
  footer?: any;
  children?: any;
};

const ModalWindow = ({ event, size, header, footer, children }: Props) => {
  return (
    <Modal onClose={event?.onClose} isOpen={event?.isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
