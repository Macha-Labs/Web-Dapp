import MCard from "@/_sdk/MCard";
import CardNative from "@/_ui/cards/CardNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import InputSearch from "@/_ui/input/InputSearch";
import NavMeta from "@/_ui/nav/NavMeta";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import CopyableRow from "@/components/meta/CopyableRow";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Avatar, Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

const Meta = () => {
  const [tab, setTab] = useState<string>("Data");
  const options = [
    {
      href: "",
      value: "Data",
    },
    {
      href: "",
      value: "Sources",
    },
  ];

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
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width="28%">
          {/* <CardNative height="fit-content" width="100%"></CardNative> */}
          <MCard
            title="Meta"
            // image="https://bit.ly/dan-abramov"
            owner_name="Blacke"
            owner_heading="Gordan"
            owner_image="https://bit.ly/dan-abramov"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio ametculpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet"
            action_name="Click Here"
          />
        </Box>
        <Box width="68%">
          <Tabs
            options={options}
            onChange={setTab}
            value={tab}
            width="fit-content"
          />
          {tab == "Data" && (
            <>
              <CardNative
                height="fit-content"
                marginTop="sm"
                width="100%"
                header={
                  <>
                    <Heading fontSize={style.font.h4} mb="0px">
                      Ownership
                    </Heading>
                  </>
                }
              >
                <>
                  <FlexRow hrAlign="space-between">
                    <FlexRow hrAlign="flex-start" width="fit-content">
                      <Avatar size={"md"} marginRight={style.margin.sm} />
                      <FlexColumn
                        width="fit-content"
                        // hrAlign="flex-start"
                        vrAlign="flex-start"
                      >
                        <Text marginBottom={"0"} textAlign={"left"}>
                          Meta Name
                        </Text>
                        <Text marginBottom={"0"} textAlign={"left"}>
                          0x26...56
                        </Text>
                      </FlexColumn>
                    </FlexRow>
                    <TagNative value="owner" size="md" />
                  </FlexRow>
                </>
              </CardNative>
              <CardNative
                height="fit-content"
                marginTop="sm"
                width="100%"
                header={
                  <>
                    <FlexRow hrAlign="space-between">
                      <Heading fontSize={style.font.h4}>Hex Data</Heading>
                      <Text marginBottom={0}>Etherscan</Text>
                    </FlexRow>
                  </>
                }
              >
                <>
                  <CopyableRow
                    parameter="hex"
                    value="0xf27bf02ab288d71e7ab3c983dd0ed230306a7db55478f463f17dc0e1afa72eca"
                    // marginTop="sm"
                  />
                  <CopyableRow
                    parameter="decimal"
                    value="109678689116361077769472367543591223980917984273811490993130346748355335892682"
                    marginTop="sm"
                  />
                  <CopyableRow
                    parameter="wrapper"
                    value="wrapped, emancipated"
                    marginTop="sm"
                  />
                </>
              </CardNative>
            </>
          )}
          {tab == "Sources" && (
            <>
              <Text>Sources</Text>
            </>
          )}
        </Box>
      </Box>
    );
  };

  const renderBody = () => {
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
                width: "90%",
              }}
            >
              {/* <Heading>Meta Name</Heading> */}

              {renderMeta()}
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

export default Meta;
