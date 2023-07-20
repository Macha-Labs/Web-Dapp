import React, { useEffect } from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";
import ContractEditModal from "@/components/studio/ContractEditModal";
import { useRouter } from "next/router";
import NavBlock from "@/_ui/nav/NavBlock";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import useTransaction from "@/hooks/studio/useTransaction";
import ContractInfoCard from "@/components/studio/ContraceInfoCard";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractTxn from "@/hooks/studio/useContractTxn";
import InputSearch from "@/_ui/input/InputSearch";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import Loader from "@/_ui/loader/Loader";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useAuthStore from "@/store/useAuthStore";

type Props = {
  metaInfo: any;
};

const Contract = () => {
  const $address = useAuthStore((state: any) => state.address);
  const router = useRouter();
  const isReady = router.isReady;
  const slug = router.query.id;
  const hookContractTxn = useContractTxn();
  const hookContract = useContract();
  const modal = useDisclosure();
  const hookContractCreate = useContractCreate(modal);

  useEffect(() => {
    if (isReady) {
      hookContract._fetch(router.query.id),
        hookContractTxn._fetch(router.query.id);
    }
  }, [router.query.id]);

  const renderComponent = () => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log("contract details", hookContract?.contractDetails);
    return (
      <Box paddingTop={style.padding["xxxl"]}>
        {hookContract.contractDetails && (
          <ContractInfoCard
            data={{
              name: hookContract.contractDetails[0]?.contract?.name,
              image: hookContract.contractDetails[0]?.contract?.image,
              state: { status: "Live" },
              address: hookContract.contractDetails[0]?.contract.address,
              owner: hookContract.contractDetails[0]?.contract.address,
              description:
                hookContract.contractDetails[0]?.contract.description,
              chain_id: hookContract.contractDetails[0]?.contract.chain_id,
            }}
          />
        )}
        <FlexRow hrAlign="flex-start" vrAlign="center" marginTop="xl">
          <Box width="40%">
            <InputSearch
              width="100%"
              size="lg"
              placeholder="Search Studio"
              icon={{ slug: "icon-search" }}
              onChange={(e: any) =>
                hookContractTxn.setSearchVal(e.target.value)
              }
              onKeydown={(e: any) => {
                if (e.key === "Enter") {
                  hookContractTxn.handleFilter(hookContractTxn.searchVal);
                }
              }}
            />
          </Box>
          {/* <ButtonNative marginLeft="lg" variant="state_brand" text="Search" marginRight="0px" onClick={() => hookContractTxn.handleFilter(hookContractTxn.searchVal)} /> */}
        </FlexRow>
        <ContractEditModal
          modal={modal}
          hookContractCreate={hookContractCreate}
          hookContract={hookContract}
        />
        <Text
          mt={style.margin.xl}
          mb={0}
          style={{
            background: `-webkit-linear-gradient(
              270deg,
              rgb(25, 124, 236),
              rgb(0, 74, 217)
            )`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Transactions in the last 12 hours{" "}
        </Text>
        {hookContractTxn.isLoading ? (
          <FlexRow height="100px">
            <Loader size="lg" />
          </FlexRow>
        ) : (
          <TxnTable txnData={hookContractTxn?.filteredData} />
        )}
      </Box>
    );
  };
  const renderBody = () => {
    return (
      <>
        {!hookContract.isLoading ? (
          <>
            {" "}
            <NavBlock
              back={() => {
                router.back();
              }}
            >
              <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
                <FlexRow width="100%" hrAlign="space-between">
                  <Heading fontSize={style.font.h5} className="m-b-0">
                    {hookContract?.contractDetails &&
                      hookContract?.contractDetails[0]?.contract.name}
                  </Heading>
                  {$address &&
                    hookContract?.contractDetails &&
                    hookContract?.contractDetails[0]?.contract?.admins?.includes(
                      $address
                    ) && (
                      <ButtonNative
                        size="sm"
                        text="Edit Contract"
                        variant="state_brand"
                        onClick={() => {
                          modal.onOpen();
                        }}
                      />
                    )}
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
        ) : (
          <FlexRow height="500px">
            <Loader size="lg" />
          </FlexRow>
        )}
      </>
    );
  };
  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default Contract;
