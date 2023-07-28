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

type Props = {
  metaInfo: any;
};

const ContractList = () => {
  const router = useRouter();
  const hookContractList = useContractList();

  let contractFilterOptions = [
    {
      value: "All Contracts",
      leftIcon: "icon-dashboard",
      onClick: () => {
        hookContractList.clearFilters();
      },
    },
  ];

  Object.keys(chains).forEach((key) => {
    contractFilterOptions.push({
      value: chains[key].chainName,
      leftIcon: chains[key].chainImage,
      onClick: () => {
        hookContractList.handleFilter(key);
      },
    });
  });

  const renderComponent = () => {
    return (
      <>
        <Box style={{ width: "70%", marginTop: `${style.margin.xxl}`, height: "fit-content", paddingTop: `${style.padding.md}`, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "start" }}>
          {/* <InputSearch
            size="lg"
            placeholder="Search Studio"
            icon={{ slug: "icon-search" }}
            onChange={(e: any) => hookContractList.handleSearch(e.target.value)}
          /> */}
          <ButtonMenu
            size={"lg"}
            text={"Filter Contracts"}
            marginLeft={style.margin.xxs}
            icon={{
              slug: "icon-chevron-down",
              style: "",
            }}
            options={contractFilterOptions}
          />
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
                console.log("Checking request ", item);
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
                        : "https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
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
        </FlexRow>
      </>
    );
  };

  return renderComponent();
};

export default ContractList;
