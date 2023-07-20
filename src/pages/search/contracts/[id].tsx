import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import ContractInfoCard from "@/components/studio/ContraceInfoCard";
import ContractDeleteModal from "@/components/studio/ContractDeleteModal";
import ContractEditModal from "@/components/studio/ContractEditModal";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractTxn from "@/hooks/studio/useContractTxn";
import useAuthStore from '@/store/useAuthStore';
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  metaInfo: any;
};

const Contract = () => {
  const $address = useAuthStore((state: any) => state.address);
  const router = useRouter();
  const isReady = router.isReady;
  const hookContractTxn = useContractTxn();
  const hookContract = useContract()
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();
  const hookContractCreate = useContractCreate(editModal);

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
          modal={editModal}
          hookContractCreate={hookContractCreate}
          hookContract={hookContract}
        />
        <ContractDeleteModal
          modal={deleteModal}
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
        {!hookContract.isLoading ? (<>
          {" "}
          <NavBlock
            back={() => {
              router.back();
            }}
          >
            <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading fontSize={style.font.h5} className="m-b-0">
                  {hookContract?.contractDetails && hookContract?.contractDetails[0]?.contract.name}
                </Heading>
                <Box style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                  {$address && hookContract?.contractDetails && hookContract?.contractDetails[0]?.contract?.admins?.includes($address) && <ButtonNative
                    size="sm"
                    text="Edit Contract"
                    variant="state_brand"
                    onClick={() => {
                      editModal.onOpen();
                    }}
                  />}
                  {$address && hookContract?.contractDetails && hookContract?.contractDetails[0]?.contract?.admins?.includes($address) && <ButtonNative
                    size="sm"
                    text="Delete Contract"
                    variant="state_brand"
                    marginLeft="md"
                    onClick={() => {
                      deleteModal.onOpen();
                    }}
                  />}
                </Box>
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
