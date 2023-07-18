import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import MetaCard from "@/components/cards/MetaCard";
import useContractList from "@/hooks/studio/useContractList";
import { useRouter } from "next/router";
import ContractCard from "../cards/ContractCard";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";
import { useDisclosure, Box } from "@chakra-ui/react";

type Props = {
  metaInfo: any;
};

const ContractList = () => {
  const router = useRouter();
  const hookContractList = useContractList();

  const renderComponent = () => {
    return (
      <>
        <FlexRow width="50%" paddingTop="2xl" marginTop={"subnav"}>
          <InputSearch
            size="lg"
            placeholder="Search Studio"
            icon={{ slug: "icon-search" }}
            marginRight={style.card.margin.default}
            onChange={(e: any) => hookContractList.handleFilter(e.target.value)}
          />
        </FlexRow>
        <FlexRow
          hrAlign="flex-start"
          width="100%"
          marginTop="md"
          flexWrap="wrap"
          // padding={style.body.padding}
          paddingTop="md"
        >
          {hookContractList.isLoading && (
            <FlexRow height="500px">
              <Loader size="lg" />
            </FlexRow>
          )}
            <Box width="100vw" display="flex" flexWrap="wrap">
              {!hookContractList.isLoading &&
                hookContractList?.filterData &&
                hookContractList?.filterData.map((item: any, index: number) => {
                  console.log("Checking request ", item);
                  return (
                    <ContractCard
                      key={index}
                      // cardView="horizontal"
                      height="8rem"
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
