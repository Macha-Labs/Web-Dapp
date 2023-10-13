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
  marginLeft?: any;
  marginRight?: any;
  marginTop?: any;
  marginBottom?: any;
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
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  header,
  footer,
  hrAlign,
  shadowOnHover,
}: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      border={
        colorMode == "light" ? "1px solid #e2e2e2" : gStyle.card.border.default
      }
      borderRadius={style.card.borderRadius.default}
      background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
      style={{
        height: height ? `${height}` : "auto",
        width: width ? `${width}` : "auto",
        margin: margin ? style?.margin[margin] : "0rem",
        marginLeft: `${style.margin[marginLeft]}`,
        marginRight: `${style.margin[marginRight]}`,
        marginTop: `${style.margin[marginTop]}`,
        marginBottom: `${style.margin[marginBottom]}`,
        padding: padding ? `${padding}` : "0px",
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
        border: `${shadowOnHover && gStyle.card.border.meta}`,
        boxShadow: `${shadowOnHover && "-0.15px 0.15px 28px 0px #004AD9"}`,
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
            <Box padding={style.padding.sm}>{header}</Box>
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
              padding: `${style.padding.sm}`,
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
          <Box padding={style.padding.sm}>{footer}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CardNative;
