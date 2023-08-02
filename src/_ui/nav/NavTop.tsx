import Image from "next/image";
import Link from "next/link";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";

type Props = {
  rightElem?: any;
  centerElem?: any;
};

const NavTop = ({ rightElem, centerElem }: Props) => {
  return (
    <>
      <nav
        className="py-3"
        style={{
          background: `${style.input.bg.default}`,
          padding: `${style.nav.padding}`,
          width: `${style.nav.width}`,
          height: `${style.nav.height}`,
          borderBottom: `${style.nav.border.default}`,
        }}
      >
        <FlexRow width="100%" hrAlign="space-between" vrAlign="center">
          <FlexRow vrAlign="center" hrAlign="flex-start">
            <Link href="/">
              <Image
                className="headerLogo"
                src="/assets/Macha-logo-text.svg"
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
