import { style as gStyle, style } from "../../styles/StyledConstants";
import { Box, Divider, useColorMode } from "@chakra-ui/react";

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
};

const CardNative = ({
  height,
  width,
  padding,
  onClick,
  margin,
  children,
  border,
  bg,
  header,
  footer,
  hrAlign,
  shadowOnHover,
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      // border={
      //   colorMode == "light" ? "1px solid #e2e2e2" : gStyle.card.border.default
      // }
      borderRadius={style.card.borderRadius.default}
      
      style={{
        height: height ? `${height}` : "auto",
        width: width ? `${width}` : "auto",
        // margin: margin ? style?.margin[margin] : "0rem",
        // padding: padding ? `${padding}` : "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "all",
        transitionDuration: "600ms",
      }}
      onClick={onClick}
      cursor={shadowOnHover && "pointer"}
      _hover={{
        // border: `${shadowOnHover && gStyle.card.border.meta}`,
        boxShadow: `${shadowOnHover && "-0.15px 0.15px 2px 0px #004AD9"}`,
        background : `${colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}`
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
