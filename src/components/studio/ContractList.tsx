import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import MetaCard from "@/components/cards/MetaCard";
import useContractList from "@/hooks/studio/useContractList";
import { useRouter } from "next/router";
import ContractCard from "../cards/ContractCard";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";
import { useDisclosure, Box } from "@chakra-ui/react";
import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import chains from "@/data/network";
import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import useMacha from "@/hooks/studio/useMacha";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import useContractCreate from "@/hooks/studio/useContractCreate";
import GlobalIcons from "@/styles/GlobalIcons";

type Props = {
  metaInfo: any;
};

const ContractList = () => {
  const router = useRouter();
  const hookContractList = useContractList();
  const [filterValue, setFilterValue] = useState<any>("All Contracts");
  const [avatar, setAvatar] = useState<any>("icon-dashboard");
  const $address = useAuthStore((state: any) => state.address);
  const hookMacha = useMacha();
  const contractModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);

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
        <FlexRow
          hrAlign="flex-start"
          width="100%"
          // marginTop="md"
          flexWrap="wrap"
          // padding={style.body.padding}
          paddingTop="lg"
        >
          {hookContractList.isLoading && (
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
          <ContractCreateModal
            modal={contractModal}
            hookContractCreate={hookContractCreate}
          />
        </FlexRow>
      </>
    );
  };

  return renderComponent();
};

export default ContractList;
