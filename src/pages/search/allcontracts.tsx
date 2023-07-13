import React, { useEffect, useState } from "react";

import FlexRow from "@/_ui/flex/FlexRow";
import { setDate, truncateAddress, truncateString } from "@/helpers";
import { Box, Heading, Tabs, Text } from "@chakra-ui/react";
import MetaCreateInfoCard from "@/components/studio/MetaCreateInfoCard";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import NavBlock from "@/_ui/nav/NavBlock";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import useTransaction from "@/hooks/studio/useTransaction";
import ContractInfoCard from "@/components/studio/ContraceInfoCard";
import useContractStore from "@/store/useContractStore";
import Loader from "@/_ui/loader/Loader";
import MetaCard from "@/components/cards/MetaCard";

type Props = {
  metaInfo: any;
};

const AllContracts = () => {

  const router = useRouter();
  const hookTransaction = useTransaction()
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, [hookTransaction.allContractDetails]);

  useEffect(() => {
    hookTransaction.fetchAllContracts()
  }, [])

  const renderComponent = () => {
    return <FlexRow
      hrAlign="flex-start"
      width="100%"
      marginTop="xxl"
      flexWrap="wrap"
      // padding={style.body.padding}
      paddingTop="md"
    >
      {isLoading && (
        <FlexRow height="500px">
          <Loader size="lg" />
        </FlexRow>
      )}
      {!isLoading &&
        hookTransaction.allContractDetails &&
        hookTransaction.allContractDetails.map((item: any, index: number) => {
          console.log("Checking request ", item.request);
          return (
            <MetaCard
              key={index}
              cardView="horizontal"
              heading={item.transaction.contract_address}
              description={item.transaction.from}
              onCardClick={() => {
                router.push(
                  {
                    pathname: `/search/contract/[id]`,
                    query: {
                      id:item.transaction.contract_slug
                    },
                  },
                  `/search/contract/${item.transaction.contract_slug}`
                );
              }}
            />
          );
        })}
    </FlexRow>
  };

  const renderBody = () => {
    return (
      <>
        {" "}
        <NavBlock
          back={() => {
            router.push("/search");
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow width="fit-content">
              <Heading fontSize={style.font.h5} className="m-b-0">
                All Contracts
              </Heading>
            </FlexRow>
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };
  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default AllContracts;
