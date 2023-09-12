import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";

type Props = {
  event: any;
  size?: string;
  header?: any;
  childrenComponent?: any;
  footer?: any;
  children?: any;
  style?: any;
  scrollBehavior?: any;
};

const ModalWindow = ({
  event,
  size,
  header,
  footer,
  children,
  scrollBehavior,
}: Props) => {

  const {colorMode} = useColorMode()

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      onClose={event?.onClose}
      isOpen={event?.isOpen}
      size={size ? size : "xl"}
      scrollBehavior={scrollBehavior}
      blockScrollOnMount={true}
    >
      <ModalOverlay />
      <ModalContent
        bg={colorMode == "light" ? "#ffff" : style.modal.bg.contractModal}
        border={colorMode == "light" ? "1px solid #e2e2e2" : style.modal.border.contract}
      >
        {header && (
          <ModalHeader
            borderBottom={colorMode == "light" ? "1px solid #e2e2e2" : style.modal.border.contract}
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
