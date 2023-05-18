import React from "react";

type Props = {
  children: any;
};

export const FlexWindow = ({ children }: Props) => {
  return (
    <div
      style={{
        position: "relative",
        top: "73px",
        width: "100vw",
      }}
    >
      {children}
    </div>
  );
};
