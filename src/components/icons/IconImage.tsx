import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";
import { IKImage } from "imagekitio-react";
import { style } from "@/styles/StyledConstants";
function IconImage(props: any) {
  return (
    <StyledIcon
      className={props.style?.className + " state-1-2 scale state_hover "}
      onClick={props.onClick}
    >
      <IKImage
        path={`/icons/${props.path}`}
        transformation={[
          {
            height: "25",
            width: "25",
          },
        ]}
      />
    </StyledIcon>
  );
}

export default IconImage;
