import { StyledRow } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

type Props = {
  event: any;
  size?: string;
  header?: any;
  childrenComponent?: any;
  footer?: any;
  children?: any;
};

const ModalSlider = ({ event, size, header, footer, children }: Props) => {
  return (
    <Drawer
      isOpen={event.isOpen}
      onClose={event.onClose}
      size={size ? size : "xs"}
    >
      <DrawerOverlay overflow="scroll" />
      <DrawerContent border={style.modal.border.default}>
        {header && (
          <DrawerHeader
            style={{
              background: `${style.popover.bg.default}`,
            }}
          >
            <StyledRow className="vr-center justify-content-center">
              {header}
            </StyledRow>
          </DrawerHeader>
        )}

        <DrawerBody
          style={{
            overflowY: "scroll",
            background: `${style.popover.bg.default}`,
            // background: "#000416",
          }}
        >
          {children}
        </DrawerBody>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalSlider;
