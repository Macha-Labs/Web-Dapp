import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ContractCreateEditModal from "@/components/studio/ContractCreateEditModal";
import ContractList from "@/components/studio/ContractList";
import chains from "@/data/network";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractList from "@/hooks/studio/useContractList";
import useMacha from "@/hooks/studio/useMacha";
import { fetchAllMetas } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [isPublisher, setIsPublisher] = useState<any>(false);
  const [filterValue, setFilterValue] = useState<any>("All Contracts");
  const [avatar, setAvatar] = useState<any>("icon-dashboard");

  const $isConnected = useAuthStore((state: any) => state.isConnected);
  const editContractsModal = useDisclosure();

  const $address = useAuthStore((state: any) => state.address);
  const hookContractList = useContractList();
  const hookContract = useContract();
  const hookMacha = useMacha();

  useEffect(() => {
    if ($address) {
      hookContract._fetchUserContracts($address);
    }
  }, [$address, $isConnected]);

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

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };
  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);

  useEffect(() => {
    fetchmetas();
  }, []);

  const dashboardNav: any = [
    {
      value: "Home",
      href: "/studio",
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

  const renderContracts = () => {
    Object.keys(chains).forEach((key) => {
      contractFilterOptions.push({
        value: chains[key].chainName,

        leftIcon: chains[key].chainImage,
        onClick: () => {
          hookContractList.handleFilter(key);
          setFilterValue(chains[key].chainName);
          setAvatar(chains[key].chainImage);
        },
      });
    });
    return (
      <>
        <FlexRow hrAlign="space-between" marginTop="4xl" marginBottom={"xl"}>
          <Box
            width={"48%"}
            background={style.card.bg.brand}
            borderRadius={style.card.borderRadius.button}
            padding={style.padding.xs}
          >
            <Heading
              fontSize={style.font.h5}
              p={0}
              marginBottom={"0px"}
              lineHeight={style.font.h3}
            >
              {!$address || hookContract.isUserContractsLoading
                ? "Your Contracts"
                : hookContract.userContracts
                ? `Contracts created: ${hookContract.userContracts.length}`
                : "You haven't created any contracts yet."}
            </Heading>
            {$address ? (
              <Box display={"flex"}>
                {hookContract.userContracts && (
                  <ButtonNative
                    textColorHover="#004ad9"
                    boxShadowHover="4px 4px 24px rgba(0,0,0,0.35)"
                    backgroundColorHover="#A0CDFF"
                    border="1px solid #fff"
                    marginTop="xs"
                    onClick={() => {
                      hookContract._fetchUserContracts($address).then(() => {
                        editContractsModal.onOpen();
                      });
                    }}
                    text="Edit Contracts"
                  />
                )}
              </Box>
            ) : (
              <Box display={"flex"}>
                <Text
                  style={{
                    marginTop: `${style.margin.xs}`,
                    marginBottom: "0px",
                    fontSize: `${style.font.h5}`,
                    fontWeight: `${style.fontWeight.dark}`,
                  }}
                >
                  Please connect your wallet to create or edit contracts
                </Text>
              </Box>
            )}
          </Box>
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

        <ContractList openInNewTab={true} />
      </>
    );
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
                value={"Contracts"}
                onChange={() => {}}
              />
            </FlexRow>
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>{renderContracts()}</Box>
        </FlexBody>
        <ContractCreateEditModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
          isEdit={false}
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
