import React from "react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import IconBase from "../icons/IconsBase";
type Props = {
  children: any;
  back?: any;
  marginTop?: any;
};

export default function NavBlock({ children, back, marginTop }: Props) {
  return (
    <div
      className=""
      style={{
        background: `${style.input.bg.default}`,
        padding: `${style.nav.padding}`,
        width: `100%`,
        borderBottom: `${style.nav.border.default}`,
        position: "fixed",
        height: "60px",
        top: 0,
        zIndex: 1,
        marginTop: `${marginTop ? marginTop : "0px"}`,
      }}
    >
      <FlexRow>
        {back ? (
          <IconBase
            slug="icon-chevron"
            onClick={back}
            style={{ marginRight: "xs" }}
          />
        ) : (
          <></>
        )}
        {children}
      </FlexRow>
    </div>
  );
}
