import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useSearch from "@/hooks/studio/useSearch";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import InputSearch from "../input/InputSearch";

type Props = {
  rightElem?: any;
  centerElem?: any;
  search?: boolean;
};

const NavMeta = ({ rightElem, centerElem, search }: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(
    search ? search : false
  );
  const hookSearch = useSearch();
  const router = useRouter();

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          // className="py-3"
          style={{
            background: "#000511",
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
                src="/assets/MACHALogotext.svg"
                alt="logo"
                width={128}
                height={47}
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
                  // height="2.2rem"
                  showStudio={true}
                />
              ) : (
                <InputSearch
                  width="100%"
                  height="2.2rem"
                  defaultValue={hookSearch.searchString}
                  value={hookSearch.searchString}
                  onChange={(e: any) =>
                    hookSearch.setSearchString(e.target.value)
                  }
                  onKeydown={(e: any) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      router.push(`/search?search=${hookSearch.searchString}`);
                    }
                  }}
                />
              )}
              {/* <Image
                style={{ marginLeft: `${style.margin.xs}`, cursor: "pointer" }}
                src={
                  isSearchOpen
                    ? GlobalIcons["icon-dark-close"]
                    : GlobalIcons["icon-dark-search"]
                }
                height="2.2rem"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              /> */}
            </Box>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
