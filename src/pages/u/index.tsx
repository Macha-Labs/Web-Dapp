import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import { AuthContext } from "@/providers/AuthProvider";
import { Box } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

const Search = () => {
  useEffect(() => {}, []);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader />;
  };
  const authContext = useContext(AuthContext);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();

  const renderBody = () => {
    return (
      <FlexColumn
        hrAlign="flex-start"
        vrAlign="flex-start"
        padding="1rem 0rem"
        height="100vh"
      >
        {/* <ConnectWalletButton/>
       {!authContext.address && <ConnectWalletButton />}
       {!authContext.address && <Box>sadasad</Box>} */}
        <Box
          cursor={"pointer"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => {
            if (address) {
              router.push(`/u/${address}`);
            } else {
              if (openConnectModal) {
                openConnectModal();
              }
            }
            //   router.push(`/u/${address}`);
          }}
        >
          <FlexRow>
            <ButtonNative
                onClick={router.pathname === `/u/${address}`}
            //   onClick={router.push(`/u/${address}`)}
              text="Connect Wallet"
              variant="state_brand"
              height="2.5rem"
              width="100%"
            />
          </FlexRow>
        </Box>
      </FlexColumn>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      // navTop={renderNavTop()}
      padding="0% 1%"
      bodyElem={renderBody()}
      noPaddingTop={true}
    ></FlexWindow>
  );
};

export default Search;
