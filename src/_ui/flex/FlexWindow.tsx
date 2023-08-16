import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {
  view?: string;
  children?: any;
  navElem?: any;
  bodyElem?: any;
  style?: any;
  marginTop?: any;
  leftElem?: any;
  rightElem?: any;
  navLeft?: any;
  navTop?: any;
};

export const FlexWindow = ({
  view = "col",
  children,
  bodyElem,
  marginTop,
  navLeft,
  navTop
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
              background: `${style.body.bg.default}`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {navTop}
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
            {navLeft}
          </div>
          <div
            className="window-right"
            style={{ marginLeft: `${style.nav.widthLeft}` }}
          >
            {bodyElem}
          </div>
        </>
      )}

      {view == "both" && (
        <Box
          marginTop={style.nav.margin}
        >
          <div
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0", }}
          >
            {navLeft}
          </div>
          <div
            className="windowTop"
            style={{
              position: "fixed",
              top: "0",
              zIndex: "1000",
              width: "100%",
              background: `${style.body.bg.default}`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {navTop}
          </div>
          <div style={{ marginTop: `${marginTop}` }}>{bodyElem}</div>
        </Box>
      )}
    </div>
  );
};
