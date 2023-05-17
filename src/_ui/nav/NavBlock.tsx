import React from "react";
import { style } from "../../styles/StyledConstants";
type Props = {
  children: any;
};

export default function NavBlock({ children }: Props) {
  return (
    <div
      className=""
      style={{
        background: `${style.input.bg.default}`,
        padding: `${style.nav.padding}`,
        width: `${style.nav.width}`,
        borderBottom: `${style.nav.border.default}`,
      }}
    >
      {children}
    </div>
  );
}
