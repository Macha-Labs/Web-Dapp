import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  event: any;
  size?: string;
  header?: any;
  childrenComponent?: any;
  footer?: any;
  children?: any;
  style?: any;
};

const ModalWindow = ({
  event,
  size,
  header,
  footer,
  children,
  style,
}: Props) => {
  return (
    <Modal
      onClose={event?.onClose}
      isOpen={event?.isOpen}
      size={size ? size : "xl"}
    >
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader paddingTop="150px">{header}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && (
          <ModalFooter justifyContent={"flex-start"}>{footer}</ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;