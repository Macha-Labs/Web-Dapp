import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";
import { IKImage } from "imagekitio-react";
import { style as gStyle } from "../../styles/StyledConstants";
import GlobalIcons from "@/styles/GlobalIcons";
import { Image } from "@chakra-ui/react";

type Props = {
  slug?: string;
  size?: string;
  onClick?: any;
  style?: any;
  image?: any;
};

function IconImage({ slug, size, onClick, style, image }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px",
        cursor: "pointer",
        width: "fit-content",
        height: "fit-content",
        background: `${gStyle.icon.bg.default}`,
        borderRadius: `${gStyle.icon.borderRadius}`,
        boxShadow: `${gStyle.icon.shadow.default}`,
        marginLeft: `${gStyle.margin[style?.marginLeft]}`,
        marginRight: `${gStyle.margin[style?.marginRight]}`,
        marginBottom: `${gStyle.margin[style?.marginBottom]}`,
        marginTop: `${gStyle.margin[style?.marginTop]}`,
      }}
      className={style?.className}
      onClick={onClick}
    >
      <Image
        src={image ? image : slug && GlobalIcons[slug]}
        style={{
          height: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
          width: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
        }}
        alt="slug"
      />
      <style jsx>{`
        .state_active {
          transform: scale(1.1);
          box-shadow: ${gStyle.icon.shadow.hover}!important;
        }
        .state_hover {
          background: ${gStyle.icon.bg.hover}!important;
        }
        .state_hover:hover {
          box-shadow: ${gStyle.icon.shadow.hover}!important;
        }
      `}</style>
    </div>
  );
}

export default IconImage;
