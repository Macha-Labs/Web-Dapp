import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavTop from "@/_ui/nav/NavTop";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";

const NftStudio = () => {
  const $address = useAuthStore((state: any) => state.address);

  const renderBody = () => {
    return <></>;
  };

  const renderNav = () => {
    return (
      <NavTop
        rightElem={
          <FlexRow width="fit-content">
            <NavButton
              marginRight={style.margin["sm"]}
              marginLeft={style.margin["sm"]}
            />
            {$address ? <WalletButton /> : <ConnectWalletButton />}
          </FlexRow>
        }
      />
    );
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default NftStudio;
