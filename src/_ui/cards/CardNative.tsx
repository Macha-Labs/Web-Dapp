import { style } from "@/styles/StyledConstants";

type Props = {
  padding?: string;
  onClick?: any;
  height?: string;
  width?: string;
  children?: any;
  margin?: string;
};

const CardNative = ({
  height,
  width,
  padding,
  onClick,
  margin,
  children,
}: Props) => {
  return (
    <div
      style={{
        height: `${height}`,
        width: width ? `${width}` : "100%",
        padding: padding ? `${padding}` : `${style.card.padding.overview}`,
        borderRadius: ` ${style.card.borderRadius.default}`,
        border: `${style.card.border.default}`,
        background: ` ${style.card.bg.overview}`,
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
