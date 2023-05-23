import { StyledRow } from "@/styles/StyledComponents";
import React from "react";

type Props = {
  width?: string;
  height?: string;
  vrAlign?: string;
  hrAlign?: string;
  className?: string;
  children: any;
  padding?: string;
  margin?: string;
  flexWrap?: any;
};

export default function FlexRow({
  width,
  height,
  vrAlign,
  hrAlign,
  className,
  children,
  padding,
  margin,
  flexWrap,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: flexWrap ? flexWrap : "nowrap",
        alignItems: vrAlign ? vrAlign : "center",
        justifyContent: hrAlign ? hrAlign : "center",
        flexDirection: "row",
        textAlign: "left",
        width: width ? width : "100%",
        height: height ? height : "100%",
        padding: padding ? padding : "0px",
        margin: margin ? margin : "0px",
      }}
    >
      {children}
    </div>
  );
}
