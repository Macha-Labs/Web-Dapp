import { style as gStyle, style } from "../../styles/StyledConstants";
import { Box, Divider, useColorMode } from "@chakra-ui/react";
import { radius } from "@thirdweb-dev/react/dist/declarations/src/design-system";

type Props = {
  header?: any;
  footer?: any;
  padding?: string;
  onClick?: any;
  height?: string;
  width?: string;
  children?: any;
  margin?: string;
  border?: any;
  bg?: any;
  hrAlign?: any;
  shadowOnHover?: any;
  addStyle?: any;
};

const CardNative = ({
  height,
  width,
  onClick,
  children,
  header,
  footer,
  hrAlign,
  addStyle = {},
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      style={{
        height: height ? `${height}` : "auto",
        width: width ? `${width}` : "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "all",
        transitionDuration: "600ms",
        borderRadius:`${style.card.borderRadius.default}`,
        ...addStyle
      }}
      onClick={onClick}
      cursor={"pointer"}
      _hover={{
       ...addStyle._hover
      }}
      className="cardNative_container"
    >
      <Box
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
      >
        {header && (
          <Box className="cardNative_header">
            <Box >{header}</Box>
            <Divider
              mt="0px"
              mb="0px"
              width={"100%"}
              alignSelf={"flex-end"}
              borderColor={colorMode == "light" ? "#e2e2e2" : "#102540"}
            />
          </Box>
        )}

        {children && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              // flex: "1",
              height: "100%",
              alignItems: hrAlign ? hrAlign : "flex-start",
            }}
            onClick={onClick}
            className="cardNative_children"
          >
            {children}
          </Box>
        )}
      </Box>
      {footer && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
        >
          <Divider
            mt="0px"
            mb="0px"
            width={"100%"}
            alignSelf={"flex-end"}
            borderColor={colorMode == "light" ? "#e2e2e2" : "#102540"}
          />
          <Box>{footer}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CardNative;
