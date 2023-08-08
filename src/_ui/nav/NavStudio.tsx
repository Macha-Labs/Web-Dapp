import React from "react";
import InputSearch from "../input/InputSearch";
import NavTop from "./NavTop";
import FlexRow from "../flex/FlexRow";
import NavButton from "@/components/buttons/NavButton";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useAuthStore from "@/store/useAuthStore";

const NavStudio = () => {
  const $address = useAuthStore((state: any) => state.address);
  return (
    <NavTop
      centerElem={<InputSearch onChange={() => { }} value="" />}
      rightElem={
        <FlexRow width="fit-content">
          {$address && <NavButton />}
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
