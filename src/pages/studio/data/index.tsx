import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import ApiList from "@/components/studio/ApiList";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import ContractList from "@/components/studio/ContractList";
import CreatePublisherModal from "@/components/studio/PublisherModal";
import useContractCreate from "@/hooks/studio/useContractCreate";
import { fetchAllMetas } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const $address = useAuthStore((state: any) => state.address);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Contracts");
  const [exploreMeta, setExploreMeta] = useState<any>([]);

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();

    setExploreMeta(allMetas.data);
  };
  const contractModal = useDisclosure();

  const hookContractCreate = useContractCreate(contractModal);

  useEffect(() => {
    fetchmetas();
  }, []);

  const dashboardNav: any = [
    {
      value: "Contracts",
      href: "",
    },
    // {
    //   value: "APIs",
    //   href: "",
    // },
  ];

  const renderAPIs = () => {
    return <>{selectedNavTab == "APIs" && <ApiList />}</>;
  };

  const renderContracts = () => {
    return <>{selectedNavTab == "Contracts" && <ContractList />}</>;
  };

  const renderBody = () => {
    if (!$address) return null;

    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Box cursor={"not-allowed"}>
              <FlexRow hrAlign="flex-start" vrAlign="center">
                <Tabs
                  width="fit-content"
                  options={dashboardNav}
                  gstyle={{ fontSize: `${style.font.h5}` }}
                  value={selectedNavTab}
                  onChange={setSelectedNavTab}
                />
                <Text className="mb-0" color="#C6C6C6" marginRight="3px">
                  Functions
                </Text>
                <TagNative value="soon" size="sm" variant="grey" />
              </FlexRow>
            </Box>
            {selectedNavTab == "Contracts" && (
              <ButtonNative
                size="sm"
                text="Create Contract"
                variant="state_brand"
                marginRight="0px"
                paddingLeft="sm"
                paddingRight="sm"
                onClick={() => {
                  contractModal.onOpen();
                }}
              />
            )}
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>
            {renderContracts()}
            {renderAPIs()}
          </Box>
        </FlexBody>
        <ContractCreateModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
        />
      </>
    );
  };

  const renderNav = () => {
    return (
      <NavTop
        rightElem={
          <FlexRow width="fit-content">
            {$address && (
              <NavButton
                marginRight={style.margin["sm"]}
                marginLeft={style.margin["sm"]}
              />
            )}
            {<ConnectWalletButton />}
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

export default DashBoard;
