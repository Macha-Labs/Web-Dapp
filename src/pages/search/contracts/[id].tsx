import React, { useEffect } from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import { Box, Heading, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import NavBlock from "@/_ui/nav/NavBlock";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import useTransaction from "@/hooks/studio/useTransaction";
import ContractInfoCard from "@/components/studio/ContraceInfoCard";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractTxn from "@/hooks/studio/useContractTxn";

type Props = {
  metaInfo: any;
};

const Contract = () => {
  const router = useRouter();
  const slug = router.query.id;
  const hookContractTxn = useContractTxn(slug);
  const hookContract = useContract(slug)

  const renderComponent = () => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log(
      "contract details",
      hookContract?.contractDetails
    );
    return (
      <Box paddingTop={style.padding["xxxl"]}>
        {hookContract.contractDetails && <ContractInfoCard
          data={{
            name: hookContract.contractDetails[0]?.contract?.name,
            image: hookContract.contractDetails[0]?.contract?.image,
            state: { status: "Live" },
            address: hookContract.contractDetails[0]?.contract.address,
            owner: hookContract.contractDetails[0]?.contract.address,
            description:
              hookContract.contractDetails[0]?.contract.description,
            chain: hookContract.contractDetails[0]?.contract.chain_id,
          }}
        />}
        <TxnTable txnData={hookContractTxn?.contractTxnDetails} />
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
                {hookContract?.contractDetails && hookContract?.contractDetails[0]?.contract.name}
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
