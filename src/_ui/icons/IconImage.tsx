import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";
import { IKImage } from "imagekitio-react";
import { style as gStyle } from "../../styles/StyledConstants";
import GlobalIcons from "@/styles/GlobalIcons";

type Props = {
  slug?: string;
  size?: string;
  onClick?: any;
  style?: any;
};

function IconImage({ slug, size, onClick, style }: Props) {
  return (
    <StyledIcon className={style?.className} onClick={onClick}>
      <IKImage
        path={GlobalIcons[slug]}
        transformation={[
          {
            height: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
            width: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
          },
        ]}
      />
    </StyledIcon>
  );
}

export default IconImage;
