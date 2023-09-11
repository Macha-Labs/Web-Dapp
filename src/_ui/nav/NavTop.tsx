import Image from "next/image";
import Link from "next/link";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import { useColorMode } from "@chakra-ui/react";

type Props = {
  rightElem?: any;
  centerElem?: any;
};

const NavTop = ({ rightElem, centerElem }: Props) => {

  const {colorMode} = useColorMode()

  return (
    <>
      <nav
        className="py-3"
        style={{
          background: `${colorMode == "light" ? "#ffff"  : "#030c1a"}`,
          padding: `${style.nav.padding.default}`,
          width: `${style.nav.width}`,
          height: `${style.nav.height}`,
        }}
      >
        <FlexRow width="100%" hrAlign="space-between" vrAlign="center">
          <FlexRow vrAlign="center" hrAlign="flex-start">
            <Link href="/studio">
              <Image
                className="headerLogo"
                src={colorMode == "light" ? "/assets/Macha-logo-text-light.svg" : "/assets/Macha-logo-text.svg"}
                alt="logo"
                width={170}
                height={62}
                // width={246}
              />
            </Link>
          </FlexRow>

          <FlexRow vrAlign="center" hrAlign="center">
            {centerElem}
          </FlexRow>

          <FlexRow vrAlign="center" hrAlign="flex-end">
            {/* <IconImage slug="icon-bell" /> */}
            {rightElem}
          </FlexRow>
        </FlexRow>
      </nav>
    </>
  );
};

export default NavTop;
