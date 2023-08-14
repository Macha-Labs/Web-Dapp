import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import chains from "@/data/network";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractList from "@/hooks/studio/useContractList";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContractCard from "../cards/ContractCard";
import ContractCreateEditModal from "./ContractCreateEditModal";
import EditContractsModal from "./EditContractsModal";
import useContract from "@/hooks/studio/useContract";

type Props = {
  metaInfo: any;
};

const ContractList = () => {
  const router = useRouter();
  const hookContractList = useContractList();
  const [filterValue, setFilterValue] = useState<any>("All Contracts");
  const [avatar, setAvatar] = useState<any>("icon-dashboard");
  const $address = useAuthStore((state: any) => state.address);
  const $isConnected = useAuthStore((state: any) => state.isConnected);
  const hookMacha = useMacha();
  const contractModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);
  const hookContract = useContract();
  const editContractsModal = useDisclosure()

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

  useEffect(() => {
    if ($address) {
      hookContract._fetchUserContracts($address)
    }
  }, [$address, $isConnected])

  const renderComponent = () => {
    return (
      <>
        <Box
          style={{
            width: "100%",
            marginTop: `${style.margin.xxl}`,
            height: "fit-content",
            paddingTop: `${style.padding.md}`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonMenu
            width="fit-content"
            size={"lg"}
            text={filterValue}
            marginLeft={style.margin.xxs}
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
              paddingRight="sm"
              height="3rem"
              marginBottom="0px"
              onClick={() => {
                contractModal.onOpen();
              }}
            />
          )}
        </Box>

        {<Box
          background={style.card.bg.brand}
          marginTop={style.margin.lg}
          marginLeft={style.margin.xxs}
          borderRadius={style.card.borderRadius.default}
          padding={style.padding.lg}
        >
          <Heading fontSize={style.font.h3} p={0} lineHeight={style.font.h3}>
            {(!$address || hookContract.isUserContractsLoading) ? "Your Contracts" : (hookContract.userContracts ? `Contracts created: ${hookContract.userContracts.length}` : "You haven't created any contracts yet.")}
          </Heading>
          {$address ? (
            <Box display={"flex"}>
              {hookContract.userContracts && <ButtonNative
                textColorHover="#004ad9"
                boxShadowHover="4px 4px 24px rgba(0,0,0,0.35)"
                backgroundColorHover="#A0CDFF"
                border="1px solid #fff"
                marginTop="xs"
                onClick={() => {
                  hookContract._fetchUserContracts($address).then(() => {
                    editContractsModal.onOpen()
                  })
                }}
                text="Edit Contracts"
              />}
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
        }
        <FlexRow
          hrAlign="flex-start"
          width="100%"
          flexWrap="wrap"
          paddingTop="lg"
        >
          {(hookContractList.isLoading) && (
            <FlexRow height="500px">
              <Loader size="lg" />
            </FlexRow>
          )}
          <Box width="100vw" display="flex" flexWrap="wrap" paddingLeft={1}>
            {!hookContractList.isLoading &&
              hookContractList?.filterData &&
              hookContractList?.filterData.map((item: any, index: number) => {
                return (
                  <ContractCard
                    key={index}
                    createdAt={item?.createdAt}
                    height="8rem"
                    chainId={item?.contract?.chain_id}
                    address={item?.contract?.address}
                    heading={item?.contract?.name}
                    image={
                      item?.contract?.image
                        ? item?.contract?.image
                        : GlobalIcons["avatar-default"]
                    }
                    description={item?.contract?.description}
                    onCardClick={() => {
                      router.push(
                        {
                          pathname: `/search/contracts/[id]`,
                          query: {
                            id: item?.contract?.slug,
                          },
                        },
                        `/search/contracts/${item?.contract?.slug}`
                      );
                    }}
                  />
                );
              })}
          </Box>
          <ContractCreateEditModal
            modal={contractModal}
            hookContractCreate={hookContractCreate}
            isEdit={false}
          />
          <EditContractsModal hookContractCreate={hookContractCreate} modal={editContractsModal} hookContract={hookContract} />
        </FlexRow>
      </>
    );
  };

  return renderComponent();
};

export default ContractList;
