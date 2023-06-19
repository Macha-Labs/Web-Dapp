import { style } from "@/styles/StyledConstants";
import React from "react";

type Props = {
  view?: string;
  children?: any;
  navElem?: any;
  bodyElem?: any;
  style?: any;
  marginTop?: any;
};

export const FlexWindow = ({
  view = "col",
  children,
  bodyElem,
  marginTop,
  navElem,
}: Props) => {
  return (
    <div
      className="window"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background: `${style.body.bg.default}`,
      }}
    >
      {view == "col" && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              zIndex: "1000",
              width: "100%",
            }}
          >
            {navElem}
          </div>
          <div style={{ marginTop: `${marginTop}` }}>{bodyElem}</div>
        </>
      )}

      {view == "row" && (
        <>
          <div
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0" }}
          >
            {navElem}
          </div>
          <div
            className="window-right"
            style={{ marginLeft: `${style.nav.width}` }}
          >
            {bodyElem}
          </div>
          melE
        </>
      )}
    </div>
  );
};
