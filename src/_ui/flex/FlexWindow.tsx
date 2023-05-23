import { style } from "@/styles/StyledConstants";
import React from "react";

type Props = {
  children?: any;
  leftElem?: any;
  rightElem?: any;
  style?: any;
};

export const FlexWindow = ({ children, leftElem, rightElem }: Props) => {
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
      {leftElem && rightElem ? (
        <>
          <div
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0" }}
          >
            {leftElem}
          </div>
          <div
            className="window-right"
            style={{ marginLeft: `${style.nav.width}` }}
          >
            {rightElem}
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
