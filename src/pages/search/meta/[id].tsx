import CardNative from "@/_ui/cards/CardNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import InputSearch from "@/_ui/input/InputSearch";
import NavMeta from "@/_ui/nav/NavMeta";
import Tabs from "@/_ui/tabs/Tabs";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

const index = () => {
  const $address = useAuthStore((state: any) => state.address);
  const [tab, setTab] = useState<string>("Meta");

  const renderNav = () => {
    return (
      <NavMeta
        // centerElem={<InputSearch onChange={() => {}} value="" />}
        rightElem={
          <FlexRow width="fit-content">
            {/* {$address && <NavButton />} */}
            {<ConnectWalletButton showBalance={false} height="2.2rem" />}
            <IconBase
              slug="icon-dark-search"
              size="2rem"
              style={{ marginLeft: "xxs" }}
            />
          </FlexRow>
        }
      />
    );
  };

  const renderMeta = () => {
    return (
      <>
        {tab == "Meta" && (
          <>
            <CardNative marginTop="lg" height="fit-content" width="100%">
              <Heading>Meta Name</Heading>
            </CardNative>
          </>
        )}
      </>
    );
  };
  const renderHex = () => {
    return (
      <>
        {tab == "Hex Data" && (
          <>
            <Text>Hex</Text>
          </>
        )}
      </>
    );
  };

  const renderBody = () => {
    const options = [
      {
        href: "",
        value: "Meta",
      },
      {
        href: "",
        value: "Hex Data",
      },
    ];

    return (
      <>
        <FlexBody>
          <Box
            style={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                marginTop: `${style.margin.xxl}`,
                height: "fit-content",
                paddingTop: `${style.padding.md}`,
                width: "50%",
              }}
            >
              {/* <Heading>Meta Name</Heading> */}
              <Tabs
                options={options}
                onChange={setTab}
                value={tab}
                width="fit-content"
              />
              {renderMeta()}
              {renderHex()}
            </Box>
          </Box>
        </FlexBody>
      </>
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

export default index;
