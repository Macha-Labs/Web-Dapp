import React from "react";
import { style as gstyle } from "../../styles/StyledConstants";

type Props = {
  width?: string;
  height?: string;
  vrAlign?: string;
  hrAlign?: string;
  className?: string;
  children: any;
  padding?: string;
  marginTop?: any;
  marginRight?: any;
  marginBottom?: any;
  marginLeft?: any;
};

export default function FlexColumn({
  width,
  height,
  vrAlign,
  hrAlign,
  className,
  children,
  padding,
  marginTop,
  marginLeft,
  marginBottom,
  marginRight,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: vrAlign ? vrAlign : "center",
        justifyContent: hrAlign ? hrAlign : "center",
        flexDirection: "column",
        textAlign: "left",
        width: width ? width : "100%",
        height: height ? height : "100%",
        padding: padding ? padding : "0px",
        marginTop: marginTop ? `${gstyle.margin[marginTop]}` : "0px",
        marginLeft: marginLeft ? `${gstyle.margin[marginLeft]}` : "0px",
        marginBottom: marginBottom ? `${gstyle.margin[marginBottom]}` : "0px",
        marginRight: marginRight ? `${gstyle.margin[marginRight]}` : "0px",
      }}
    >
      {children}
    </div>
  );
}
