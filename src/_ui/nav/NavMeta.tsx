import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useSearch from "@/hooks/studio/useSearch";
import { Box } from "@chakra-ui/react";
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
            background: "#030c1a",
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            border: `${style.nav.border.default}`,
            borderRadius: `${style.card.borderRadius.default}`,

            boxShadow: "0px 24px 64px 0px #000",
            width: "100%",
          }}
        >
          <FlexRow vrAlign="space-between" hrAlign="space-between">
            <InputSearch
              width="30%"
              height="2.2rem"
              defaultValue={hookSearch.searchString}
              value={hookSearch.searchString}
              onChange={(e: any) => hookSearch.setSearchString(e.target.value)}
              onKeydown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  router.push(`/search?search=${hookSearch.searchString}`);
                }
              }}
            />
            <Box
              style={{ display: "flex", alignItems: "center" }}
              width={"fit-content"}
            >
              <ConnectWalletButton
                showBalance={false}
                // height="2.2rem"
                showStudio={true}
              />
            </Box>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
