import { style } from "@/styles/StyledConstants";
import { Box, Divider } from "@chakra-ui/react";

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
}: Props) => {
  return (
    <Box
      style={{
        height: `${height}`,
        width: width ? `${width}` : "100%",
        borderRadius: ` ${style.card.borderRadius.default}`,
        border: `${border ? border : style.card.border.default}`,
        background: ` ${bg ? bg : "#060606"}`,
        boxShadow: ` ${style.card.shadow.default} `,
        margin: margin ? style?.margin[margin] : "0rem",
        marginLeft: `${style.margin[marginLeft]}`,
        marginRight: `${style.margin[marginRight]}`,
        marginTop: `${style.margin[marginTop]}`,
        marginBottom: `${style.margin[marginBottom]}`,
        padding: padding ? `${padding}` : "0px",
      }}
    >
      {header && (
        <Box>
          <Box padding={style.padding.sm}>{header}</Box>
          <Divider
            mt="0px"
            mb="0px"
            width={"100%"}
            alignSelf={"flex-end"}
            borderColor={"#14244B"}
          />
        </Box>
      )}

      {children && (
        <Box
          style={{ padding: `${style.card.padding.overview}` }}
          onClick={onClick}
        >
          {children}
        </Box>
      )}
      {footer && <Box>{footer}</Box>}
    </Box>
  );
};

export default CardNative;
