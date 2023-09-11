import { style } from "@/styles/StyledConstants";
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
}: Props) => {

  const {colorMode} = useColorMode();

  return (
    <Box
      style={{
        height: height ? `${height}` : "100%",
        width: width ? `${width}` : "100%",
        borderRadius: ` ${style.card.borderRadius.default}`,
        border: `${border ? border : style.card.border.card}`,
        background: ` ${colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}`,
        boxShadow: ` ${style.card.shadow.default} `,
        margin: margin ? style?.margin[margin] : "0rem",
        marginLeft: `${style.margin[marginLeft]}`,
        marginRight: `${style.margin[marginRight]}`,
        marginTop: `${style.margin[marginTop]}`,
        marginBottom: `${style.margin[marginBottom]}`,
        padding: padding ? `${padding}` : "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {header && (
          <Box>
            <Box padding={style.padding.sm}>{header}</Box>
            <Divider
              mt="0px"
              mb="0px"
              width={"100%"}
              alignSelf={"flex-end"}
              borderColor={"#102540"}
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
              alignItems: hrAlign ? hrAlign : "flex-start",
            }}
            onClick={onClick}
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
            borderColor={"#102540"}
          />
          <Box padding={style.padding.sm}>{footer}</Box>
        </Box>
      )}
    </Box>
  );
};

export default CardNative;
