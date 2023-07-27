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
      closeOnOverlayClick={false}
      isCentered
      onClose={event?.onClose}
      isOpen={event?.isOpen}
      size={size ? size : "xl"}
    >
      <ModalOverlay />
      <ModalContent>
        {header && (
          <ModalHeader
          // marginTop="9rem"
          // sx={{
          //   "@media screen and (min-width: 1280px)": {
          //     marginTop: "5rem",
          //   },
          // }}
          >
            {header}
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && (
          <ModalFooter justifyContent={"flex-start"}>{footer}</ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
