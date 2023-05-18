import React from "react";

type Props = {
  width?: string;
  vrAlign?: string;
  hrAlign?: string;
  className?: string;
  children: any;
  padding?: string;
  margin?: string;
};

export default function FlexRow({
  width,
  vrAlign,
  hrAlign,
  className,
  children,
  padding,
  margin,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: vrAlign ? vrAlign : "center",
        justifyContent: hrAlign ? hrAlign : "center",
        flexDirection: "column",
        textAlign: "left",
        width: width ? width : "fit-content",
        padding: padding ? padding : "0px",
        margin: margin ? margin : "0px",
      }}
    >
      {children}
    </div>
  );
}
