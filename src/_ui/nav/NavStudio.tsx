import React from "react";
import InputSearch from "../input/InputSearch";
import NavTop from "./NavTop";
import FlexRow from "../flex/FlexRow";
import NavButton from "@/components/buttons/NavButton";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useAuthStore from "@/store/useAuthStore";
import useSearch from "@/hooks/studio/useSearch";
import { useRouter } from "next/router";

const NavStudio = () => {
  const $address = useAuthStore((state: any) => state.address);
  const hookSearch = useSearch();
  const router = useRouter();
  return (
    <NavTop
      centerElem={
        <InputSearch
          defaultValue={hookSearch.searchString}
          value={hookSearch.searchString}
          onChange={(e: any) => hookSearch.setSearchString(e.target.value)}
          onKeydown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
              router.push(`/search/${hookSearch.searchString}`);
            }
          }}
        />
      }
      rightElem={
        <FlexRow width="fit-content">
          {
            <ConnectWalletButton
              showBalance={true}
              showRegisterPublisher={true}
              showExplorer={true}
            />
          }
        </FlexRow>
      }
    />
  );
};

export default NavStudio;
