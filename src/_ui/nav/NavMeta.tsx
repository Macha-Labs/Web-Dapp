import Image from "next/image";
import Link from "next/link";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import { Box } from "@chakra-ui/react";

type Props = {
  rightElem?: any;
  centerElem?: any;
};

const NavMeta = ({ rightElem, centerElem }: Props) => {
  return (
    <>
      <Box
        padding={style.body.padding}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          // className="py-3"
          style={{
            background: `${style.nav.bg.meta}`,
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            borderBottom: `${style.nav.border.default}`,
            borderRadius: `${style.card.borderRadius.default}`,
            //   margin: "0% 6%",
            // marginTop: `${style.margin.sm}`,
            boxShadow: "0px 24px 64px 0px #000",
            width: "50%",
          }}
        >
          <FlexRow hrAlign="space-between" vrAlign="center">
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

            <FlexRow vrAlign="center" hrAlign="flex-end">
              {/* <IconImage slug="icon-bell" /> */}
              {rightElem}
            </FlexRow>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
