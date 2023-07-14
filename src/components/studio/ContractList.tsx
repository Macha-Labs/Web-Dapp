import React from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import {Heading} from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import NavBlock from "@/_ui/nav/NavBlock";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import MetaCard from "@/components/cards/MetaCard";
import useContractList from "@/hooks/studio/useContractList";

type Props = {
  metaInfo: any;
};

const ContractList = () => {
  const router = useRouter();
  const hookContractList = useContractList()

  const renderComponent = () => {
    return (
      <FlexRow
        hrAlign="flex-start"
        width="100%"
        marginTop="xxl"
        flexWrap="wrap"
        // padding={style.body.padding}
        paddingTop="md"
      >
        {hookContractList.isLoading && (
          <FlexRow height="500px">
            <Loader size="lg" />
          </FlexRow>
        )}
        {!hookContractList.isLoading &&
          hookContractList?.contractList &&
          hookContractList?.contractList.map(
            (item: any, index: number) => {
              console.log("Checking request ", item);
              return (
                <MetaCard
                  key={index}
                  cardView="horizontal"
                  heading={item?.contract?.name}
                  image={item?.contract?.image ? item?.contract?.image : "https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"}
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
            }
          )}
      </FlexRow>
    );
  };

  return renderComponent()
};

export default ContractList;
