import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ContractCreateEditModal from "@/components/studio/ContractCreateEditModal";
import ContractList from "@/components/studio/ContractList";
import EditContractsModal from "@/components/studio/EditContractsModal";
import chains from "@/data/network";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractList from "@/hooks/studio/useContractList";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

const DashBoard = () => {
  const [filterValue, setFilterValue] = useState<any>("All Contracts");
  const [avatar, setAvatar] = useState<any>("icon-dashboard");

  const $isConnected = useAuthStore((state: any) => state.isConnected);
  const editContractsModal = useDisclosure();
  const $address = useAuthStore((state: any) => state.address);
  const hookContractList = useContractList();
  const hookContract = useContract();
  const hookMacha = useMacha();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if ($address) {
      hookContract._fetchUserContracts($address);
    }
  }, [$address, $isConnected]);

  useEffect(() => {
    const network = async () => {
      switchNetwork?.(314159);
    };
    chain?.name == "Filecoin Calibration chaindata" ? () => {} : network();
  }, [chain]);

  let contractFilterOptions = [
    {
      value: "All Contracts",
      leftIcon: "icon-dashboard",
      onClick: () => {
        hookContractList.clearFilters();
        setFilterValue("All Contracts");
        setAvatar("icon-dashboard");
      },
    },
  ];

  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);

  const dashboardNav: any = [
    {
      value: "Home",
      href: "/studio",
    },
    {
      value: "Indexers",
      href: "/studio/indexers",
    },
    // {
    //   value: "Functions",
    //   href: "",
    // },
  ];

  const renderContracts = () => {
    Object.keys(chains).forEach((key) => {
      contractFilterOptions.push({
        value: chains[key].chainName,

        leftIcon: chains[key].chainImage,
        onClick: () => {
          // console.log(key, "clicked");
          hookContractList.handleFilter(key);
          setFilterValue(chains[key].chainName);
          setAvatar(chains[key].chainImage);
        },
      });
    });
    return (
      <>
        <FlexRow hrAlign="space-between" marginTop="3.5xl" marginBottom={"xl"}>
          {$address ? (
            <Box>
              <ButtonGroup
                marginLeft="5px"
                _hover={{
                  background: `${style.card.bg.hover}`,
                  border: `${
                    colorMode == "light" ? "" : style.card.border.hover
                  }`,
                  shadow: `${style.card.shadow.hover}`,
                }}
                style={{
                  background: `${
                    colorMode == "light" ? "#ffff" : style.card.bg.default
                  }`,
                  // border: `${style.card.border.default}`,
                  boxShadow: `${
                    colorMode == "light" ? "" : style.card.shadow.default
                  }`,
                  borderRadius: `${style.card.borderRadius.button}`,
                }}
                size="sm"
                isAttached
                variant="outline"
                colorScheme="white"
              >
                <Button
                  color={colorMode == "light" ? "#3d3d3d" : ""}
                  borderColor={colorMode == "light" ? "#e2e2e2" : "#0a1020"}
                  borderRadius={`${style.card.borderRadius.button}`}
                  _hover={
                    {
                      // border: `${style.card.border.hover}`,
                    }
                  }
                >
                  Contracts created:{" "}
                  {hookContract.userContracts
                    ? hookContract.userContracts.length
                    : 0}
                </Button>
                <IconButton
                  isLoading={hookContract.isUserContractsLoading}
                  borderRadius={`${style.card.borderRadius.button}`}
                  borderColor={colorMode == "light" ? "#e2e2e2" : "#0a1020"}
                  aria-label="Add to friends"
                  // _hover={{ border: `${style.card.border.hover}` }}
                  icon={
                    <Image
                      height="1.5rem"
                      src={
                        colorMode == "light"
                          ? GlobalIcons["icon-base-edit-light"]
                          : GlobalIcons["icon-base-edit"]
                      }
                      alt="edit-contracts"
                      onClick={() => {
                        hookContract._fetchUserContracts($address).then(() => {
                          editContractsModal.onOpen();
                        });
                      }}
                    />
                  }
                />
              </ButtonGroup>
            </Box>
          ) : (
            <Box></Box>
          )}
          <Box
            style={{
              width: "48%",
              height: "fit-content",

              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ButtonMenu
              width="fit-content"
              size={"lg"}
              text={filterValue}
              icon={{
                slug: "icon-chevron-down",
                style: "",
              }}
              options={contractFilterOptions}
              avatar={avatar}
            />
            {$address != null && hookMacha.publisherExists && (
              <ButtonNative
                size="sm"
                text="Create Contract"
                variant="state_brand"
                marginRight="0px"
                paddingLeft="sm"
                marginLeft={"xxs"}
                paddingRight="sm"
                height="3rem"
                marginBottom="0px"
                onClick={() => {
                  contractModal.onOpen();
                }}
              />
            )}
          </Box>
        </FlexRow>
        {hookContractList?.filterData && (
          <ContractList
            openInNewTab={true}
            data={hookContractList.filterData}
          />
        )}
      </>
    );
  };

  const renderBody = () => {
    return (
      <>
        {/* <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow hrAlign="flex-start" vrAlign="center">
              <Tabs
                width="fit-content"
                options={dashboardNav}
                gstyle={{ fontSize: `${style.font.h5}` }}
                value={"Indexers"}
                onChange={() => {}}
              />
            </FlexRow>
          </FlexRow>
        </NavBlock> */}

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>{renderContracts()}</Box>
        </FlexBody>
        <ContractCreateEditModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
          isEdit={false}
        />
        <EditContractsModal
          modal={editContractsModal}
          hookContract={hookContract}
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
      navTop={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default DashBoard;
