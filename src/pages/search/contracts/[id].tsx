import Header from "@/_ui/Head/Header";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import ContractCreateEditModal from "@/components/studio/ContractCreateEditModal";
import ContractInfoCard from "@/components/studio/ContractInfoCard";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractTxn from "@/hooks/studio/useContractTxn";
import useAuthStore from "@/store/useAuthStore";
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
  const hookContract = useContract();
  const editModal = useDisclosure();
  const hookContractCreate = useContractCreate(editModal);

  useEffect(() => {
    if (isReady) {
      hookContract._fetch(router.query.id),
        hookContractTxn._fetch(router.query.id);
    }
  }, [router.query.id, hookContractTxn.page]);

  const renderNav = () => {
    return <NavStudio />;
  };

  const renderComponent = () => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log("contract details", hookContract?.contractDetails);
    return (
      <Box>
        {hookContract.contractDetails && (
          <ContractInfoCard
            data={{
              name: hookContract.contractDetails?.contract?.name,
              image: hookContract.contractDetails?.contract?.image,
              state: { status: "Live" },
              address: hookContract.contractDetails?.contract.address,
              owner: hookContract.contractDetails?.contract.address,
              description: hookContract.contractDetails?.contract.description,
              chain_id: hookContract.contractDetails?.contract.chain_id,
            }}
          />
        )}
        <ContractCreateEditModal
          modal={editModal}
          hookContractCreate={hookContractCreate}
          hookContract={hookContract}
          isEdit={true}
        />
        {hookContractTxn.isLoading ? (
          <FlexRow height="100px">
            <Loader size="lg" />
          </FlexRow>
        ) : hookContractTxn?.filteredData[0] ? (
          <>
            <Box
              style={{
                display: "flex",
                alignItems: "",
                justifyContent: "space-between",
                marginBottom: `${style.margin.md}`,
                marginTop: `${style.margin.sm}`,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ButtonNative
                  marginRight="sm"
                  size="xs"
                  height="2rem"
                  onClick={() => {
                    if (hookContractTxn.page != 1) {
                      hookContractTxn.setIsLoading(true);
                      hookContractTxn.setPage(1);
                    }
                  }}
                  text="Newest"
                  disabled={hookContractTxn.page == 1}
                  variant="state_default_hover"
                />
                <ButtonNative
                  marginRight="sm"
                  size="xs"
                  height="2rem"
                  onClick={() => {
                    if (hookContractTxn.page > 1) {
                      hookContractTxn.setIsLoading(true);
                      hookContractTxn.setPage(hookContractTxn.page - 1);
                    }
                  }}
                  text="Prev"
                  disabled={hookContractTxn.page <= 1}
                  variant="state_default_hover"
                />
                <Text marginRight={style.margin.sm} marginBottom="0.25rem">
                  Page {hookContractTxn?.page} of{" "}
                  {hookContractTxn.totalPages.toLocaleString("en-US")}
                </Text>
                <ButtonNative
                  marginRight="sm"
                  size="xs"
                  height="2rem"
                  onClick={() => {
                    if (hookContractTxn.page < hookContractTxn.totalPages) {
                      hookContractTxn.setIsLoading(true);
                      hookContractTxn.setPage(hookContractTxn.page + 1);
                    }
                  }}
                  disabled={hookContractTxn.page >= hookContractTxn.totalPages}
                  text="Next"
                  variant="state_default_hover"
                />
                <ButtonNative
                  marginRight="sm"
                  size="xs"
                  height="2rem"
                  onClick={() => {
                    if (hookContractTxn.page != hookContractTxn.totalPages) {
                      hookContractTxn.setIsLoading(true);
                      hookContractTxn.setPage(hookContractTxn.totalPages);
                    }
                  }}
                  text="Oldest"
                  disabled={hookContractTxn.page == hookContractTxn.totalPages}
                  variant="state_default_hover"
                />
              </Box>
              <Box>
                <Text>
                  Total Txns:{" "}
                  {hookContractTxn.totalTxns.toLocaleString("en-US")}
                </Text>
              </Box>
            </Box>
            <Box
              marginTop="1rem"
              border={style.table.border.thead}
              borderRadius="20px"
              marginBottom={style.margin.xxxl}
            >
              <TxnTable txnData={hookContractTxn?.filteredData} />
            </Box>
          </>
        ) : (
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
            No Transactions to Display
          </Text>
        )}
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <>
        {!hookContract.isLoading ? (
          <> {renderComponent()}</>
        ) : (
          <FlexRow height="500px">
            <Loader size="lg" />
          </FlexRow>
        )}
      </>
    );
  };
  return (
    <>
      <Header
        title={`Macha | ${
          hookContract.contractDetails?.contract?.name
            ? hookContract.contractDetails?.contract?.name
            : ""
        }`}
      />
      <FlexWindow
        view="both"
        bodyElem={renderBody()}
        navTop={<NavMeta />}
        navLeft={<NavLeft />}
      ></FlexWindow>
    </>
  );
};

export default Contract;
