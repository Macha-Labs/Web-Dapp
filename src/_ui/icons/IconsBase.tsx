import GlobalIcons from "@/styles/GlobalIcons";
import { style as gStyle } from "../../styles/StyledConstants";
import { Image } from "@chakra-ui/react";

type Props = {
  slug: string;
  size?: string;
  onClick?: any;
  style?: any;
  variant?: any;
};

function IconBase({ slug, size, onClick, style, variant }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "5px",
        cursor: "pointer",
        width: "fit-content",
        height: "fit-content",
        background: `${variant == 'solid' ?  gStyle.icon.bg.default : ''}`,
        borderRadius: `${variant == 'solid' ?  gStyle.icon.borderRadius : ''}`,
        boxShadow: `${variant == 'solid' ? gStyle.icon.shadow.default : ''}`,
        marginLeft: `${gStyle.margin[style?.marginLeft]}`,
        marginRight: `${gStyle.margin[style?.marginRight]}`,
        marginBottom: `${gStyle.margin[style?.marginBottom]}`,
        marginTop: `${gStyle.margin[style?.marginTop]}`,
      }}
      className={style?.className}
      onClick={onClick}
    >
      <Image
        src={GlobalIcons[slug]}
        alt={slug}
        style={{
          height: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
          width: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
        }}
      />
    </div>
  );
}

export default IconBase;
