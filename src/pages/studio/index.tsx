import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import HomeDev from "@/components/studio/HomeDev";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Text, useDisclosure } from "@chakra-ui/react";

const Home = () => {
  const hookMacha = useMacha();
  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);

  const dashboardNav: any = [
    {
      value: "Home",
      href: "/",
    },
    {
      value: "Contracts",
      href: "/contracts",
    },
    // {
    //   value: "Functions",
    //   href: "",
    // },
  ];

  const $address = useAuthStore((state: any) => state.address);

  const renderHome = () => {
    return <>{<HomeDev />}</>;
  };

  const renderBody = () => {
    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow hrAlign="flex-start" vrAlign="center">
              <Tabs
                width="fit-content"
                options={dashboardNav}
                gstyle={{ fontSize: `${style.font.h5}` }}
                value={"Home"}
                onChange={() => {}}
              />
              <Box
                cursor={"not-allowed"}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text
                  className="mb-0"
                  fontSize={style.font.h5}
                  color="#C6C6C6"
                  marginRight={style.margin.xxs}
                >
                  Functions
                </Text>
                <TagNative value="soon" lineHeight="0.8rem" size="sm" />
              </Box>
            </FlexRow>

            {$address != null && hookMacha.publisherExists && (
              <ButtonNative
                size="sm"
                text="Create Contract"
                variant="state_brand"
                marginRight="0px"
                paddingLeft="sm"
                paddingRight="sm"
                height="2rem"
                marginBottom="0px"
                onClick={() => {
                  contractModal.onOpen();
                }}
              />
            )}

            {/* {selectedNavTab == "Functions" && (
                  <ButtonNative
                    size="sm"
                    text="Create Function"
                    variant="state_brand"
                    marginRight="0px"
                    paddingLeft="sm"
                    paddingRight="sm"
                    onClick={() => {
                      metaModal.onOpen();
                    }}
                  />
                )} */}
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>{renderHome()}</Box>
        </FlexBody>
        <ContractCreateModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
        />
        <ApiCreateModal modal={metaModal} />
      </>
    );
  };

  const renderNav = () => {
    return <NavStudio />;
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
export default Home;
