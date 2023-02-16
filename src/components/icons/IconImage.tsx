import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";
import { IKImage } from "imagekitio-react";
function IconImage(props: any) {
  return (
    <StyledIcon className="state-1-2 scale m-b-1" onClick={props.onClick}>
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
