import { useColorMode } from "@chakra-ui/react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconBase from "../icons/IconsBase";
type Props = {
  children: any;
  back?: any;
  marginTop?: any;
};

export default function NavBlock({ children, back, marginTop }: Props) {

  const {colorMode} = useColorMode()

  return (
    <div
      className="nav-block"
      style={{
        background: `${colorMode == "light" ? "#ffff" : "#030c1a"}`,
        padding: `${style.nav.padding.default}`,
        width: `100%`,
        borderBottom: `${style.nav.border.default}`,
        position: "fixed",
        height: "60px",
        top: 0,
        zIndex: 1,
        marginTop: `${marginTop ? marginTop : "0px"}`,
      }}
    >
      <FlexRow>
        {back ? (
          <IconBase
            slug="icon-chevron"
            onClick={back}
            style={{ marginRight: "xs" }}
          />
        ) : (
          <></>
        )}
        {children}
      </FlexRow>
    </div>
  );
}
