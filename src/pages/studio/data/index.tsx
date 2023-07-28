import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ApiList from "@/components/studio/ApiList";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import ContractList from "@/components/studio/ContractList";
import HomeDev from "@/components/studio/HomeDev";
import CreatePublisherModal from "@/components/studio/PublisherModal";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useMacha from "@/hooks/studio/useMacha";
import { fetchAllMetas } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const $address = useAuthStore((state: any) => state.address);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Contracts");
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [isPublisher, setIsPublisher] = useState<any>(false);

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };
  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);
  const hookMacha = useMacha();

  useEffect(() => {
    fetchmetas();
  }, []);

  const dashboardNav: any = [
    {
      value: "Home",
      href: "",
    },
    {
      value: "Contracts",
      href: "",
    },
    // {
    //   value: "Functions",
    //   href: "",
    // },
  ];

  const renderAPIs = () => {
    return <>{selectedNavTab == "Functions" && <ApiList />}</>;
  };

  const renderContracts = () => {
    return <>{selectedNavTab == "Contracts" && <ContractList />}</>;
  };

  const renderHome = () => {
    return <>{selectedNavTab == "Home" && <HomeDev />}</>;
  };

  const renderBody = () => {
    if (!$address) return null;

    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow hrAlign="flex-start" vrAlign="center">
              <Tabs
                width="fit-content"
                options={dashboardNav}
                gstyle={{ fontSize: `${style.font.h5}` }}
                value={selectedNavTab}
                onChange={setSelectedNavTab}
              />
              <Box
                cursor={"not-allowed"}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text className="mb-0" color="#C6C6C6" marginRight="2px">
                  Functions
                </Text>
                <TagNative value="soon" size="sm" variant="grey" />
              </Box>
            </FlexRow>

            {hookMacha.publisherExists && (
              <ButtonNative
                size="sm"
                text="Create Contract"
                variant="state_brand"
                marginRight="0px"
                paddingLeft="sm"
                paddingRight="sm"
                height="2.5rem"
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
          <Box style={{ overflow: "hidden" }}>
            {renderContracts()}
            {renderAPIs()}
            {renderHome()}
          </Box>
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
    return (
      <NavTop
        centerElem={<InputSearch />}
        rightElem={
          <FlexRow width="fit-content">
            {$address && <NavButton />}
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
