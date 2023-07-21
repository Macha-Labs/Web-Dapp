import { style } from "@/styles/StyledConstants";

type Props = {
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
}: Props) => {
  return (
    <div
      style={{
        height: `${height}`,
        width: width ? `${width}` : "100%",
        padding: padding ? `${padding}` : `${style.card.padding.overview}`,
        borderRadius: ` ${style.card.borderRadius.default}`,
        border: `${border ? border : style.card.border.default}`,
        background: ` ${bg ? bg : style.card.bg.overview}`,
        boxShadow: ` ${style.card.shadow.default} `,
        margin: margin ? style?.margin[margin] : "0rem",
        marginLeft: `${style.margin[marginLeft]}`,
        marginRight: `${style.margin[marginRight]}`,
        marginTop: `${style.margin[marginTop]}`,
        marginBottom: `${style.margin[marginBottom]}`,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardNative;
