import { style } from "@/styles/StyledConstants";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import FlexRow from "../flex/FlexRow";

type Props = {
  event: any;
  size?: string;
  header?: any;
  childrenComponent?: any;
  footer?: any;
  children?: any;
  colorMode?: any;
};

const ModalSlider = ({
  colorMode,
  event,
  size,
  header,
  footer,
  children,
}: Props) => {
  return (
    <Drawer
      isOpen={event.isOpen}
      onClose={event.onClose}
      size={size ? size : "xs"}
      placement="bottom"
    >
      <DrawerOverlay
        overflow="scroll"
        background={
          "linear-gradient(to right,rgba(255,255,255,.5),rgba(255,255,255,.5)),linear-gradient(to right,rgba(0,0,0,.1),rgba(0,0,0,.1))"
        }
        backdropFilter="blur(5px)"
      />
      <DrawerContent
        border={
          colorMode == "light" ? "1px solid #e2e2e2" : style.card.border.default
        }
        // borderRadius={style.modal.borderRadius}
        borderBottomRadius={"1.4rem"}
      >
        {header && (
          <DrawerHeader
            style={{
              background: `${colorMode == "light" ? "#fff" : "#000A24"}`,
            }}
          >
            <FlexRow>{header}</FlexRow>
          </DrawerHeader>
        )}

        <DrawerBody
          style={{
            overflowY: "scroll",
            background: `${colorMode == "light" ? "#fff" : "#000A24"}`,
            borderBottomRightRadius: "1.4rem",
            borderBottomLeftRadius: "1.4rem",
            // background: "",
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
