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
        cursor: "pointer",
        margin: margin ? style?.margin[margin] : "0rem",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardNative;
