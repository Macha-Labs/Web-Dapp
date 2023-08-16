import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import IconBase from "../icons/IconsBase";
import { useState } from "react";
import InputSearch from "../input/InputSearch";
import GlobalIcons from "@/styles/GlobalIcons";
import NavLeft from "./NavLeft";

type Props = {
  rightElem?: any;
  centerElem?: any;
};

const NavMeta = ({ rightElem, centerElem }: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          // className="py-3"
          style={{
            background: `${style.nav.bg.meta}`,
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            borderBottom: `${style.nav.border.default}`,
            borderRadius: `${style.card.borderRadius.default}`,

            boxShadow: "0px 24px 64px 0px #000",
            width: "100%",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between">
            <Link href="/" style={{ paddingRight: `${style.margin.sm}` }}>
              <Image
                className="headerLogo"
                src="/assets/Macha-logo-text.svg"
                alt="logo"
                width={170}
                height={62}
                // width={246}
              />
            </Link>
            <Box
              style={{ display: "flex", alignItems: "center" }}
              width={isSearchOpen ? "80%" : "fit-content"}
            >
              {!isSearchOpen ? (
                <ConnectWalletButton
                  showBalance={false}
                  height="2.2rem"
                  showStudio={true}
                />
              ) : (
                <InputSearch width="100%" height="2.2rem" />
              )}
              <Image
                style={{ marginLeft: `${style.margin.xs}`, cursor: "pointer" }}
                src={
                  isSearchOpen
                    ? GlobalIcons["icon-dark-close"]
                    : GlobalIcons["icon-dark-search"]
                }
                height="2.2rem"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
            </Box>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
