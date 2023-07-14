import GlobalIcons from "@/styles/GlobalIcons";
import { IKImage } from "imagekitio-react";
import { style as gStyle } from "../../styles/StyledConstants";

type Props = {
  slug: string;
  size?: string;
  onClick?: any;
  style?: any;
};

function IconBase({ slug, size, onClick, style }: Props) {
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
        // background: `${gStyle.icon.bg.default}`,
        // borderRadius: `${gStyle.icon.borderRadius}`,
        // boxShadow: `${gStyle.icon.shadow.default}`,
        marginLeft: `${gStyle.margin[style?.marginLeft]}`,
        marginRight: `${gStyle.margin[style?.marginRight]}`,
        marginBottom: `${gStyle.margin[style?.marginBottom]}`,
        marginTop: `${gStyle.margin[style?.marginTop]}`,
      }}
      className={style?.className}
      onClick={onClick}
    >
      <IKImage
        path={GlobalIcons[slug]}
        style={{
          height: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
          width: size ? gStyle.icon.sizes[size] : gStyle?.icon.sizes.default,
        }}
      />
    </div>
  );
}

export default IconBase;
