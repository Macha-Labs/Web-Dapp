import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";

function IconEmoji(props: any) {
  return (
    <StyledIcon
      className={props.style?.className + " state-1-2 scale"}
      onClick={props.onClick}
    >
      {props.children}
    </StyledIcon>
  );
}

export default IconEmoji;
