import React, { useEffect } from "react";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { setDate, truncateAddress, truncateString } from "@/helpers";
import { Box, Heading, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import MetaCreateInfoCard from "@/components/studio/MetaCreateInfoCard";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import NavBlock from "@/_ui/nav/NavBlock";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import useTransaction from "@/hooks/studio/useTransaction";
import ContractInfoCard from "@/components/studio/ContraceInfoCard";
import TableNative from "@/_ui/table/TableNative";
import TxnTable from "@/components/studio/TxnTable";

type Props = {
  metaInfo: any;
};

const Contract = () => {
  const router = useRouter();
  const hookTransaction = useTransaction();

  const slug = router.query.id

  useEffect(() => {
    hookTransaction.fetchContractTransactionData(slug)
  }, [])

  const renderComponent = () => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (
      <Box paddingTop={style.padding["xxxl"]}>
        <ContractInfoCard
          data={{
            name: "Contract Name",
            state: { status: "Live" },
            address: "0xasdca211514",
            owner: "0x2132135442151351535",
            description: "sample desc",
            chain: "ethereum",
          }}
        />
          <TxnTable hookTransaction={hookTransaction} />
      </Box>
    );
  };
  const renderBody = () => {
    return (
      <>
        {" "}
        <NavBlock
          back={() => {
            router.back();
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow width="fit-content">
              <Heading fontSize={style.font.h5} className="m-b-0">
                Contract name
              </Heading>
            </FlexRow>
            {/* <Tabs
              width="40%"
              options={options}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.font.h5}` }}
            /> */}
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };
  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default Contract;
