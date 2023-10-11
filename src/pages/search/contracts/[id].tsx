import Header from "@/_ui/Head/Header";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavHeader from "@/_ui/nav/NavHeader";
import NavStudio from "@/_ui/nav/NavStudio";
import ContractCreateEditModal from "@/components/studio/ContractCreateEditModal";
import ContractInfoCard from "@/components/studio/ContractInfoCard";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractTxn from "@/hooks/studio/useContractTxn";
import { style } from "@/styles/StyledConstants";
import { Box, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  metaInfo: any;
};

// export async function getServerSideProps(context: any) {
//   let contractSlug = context.params.id
//   let contract: any = {}

//   const resContract = await contractDataBySlug(contractSlug)
//   if (resContract.data) {
//     console.log(resContract.data, "contract");
//     contract = resContract.data
//   } else {
//     console.log("Couldnt fetch contract");
//   }

//   return {
//     props: {
//       contract_data: contract
//     }
//   }
// }

const Contract = () => {
  const router = useRouter();
  const isReady = router.isReady;
  const hookContractTxn = useContractTxn();
  const hookContract = useContract();
  const editModal = useDisclosure();
  const hookContractCreate = useContractCreate(editModal);
  const {colorMode} = useColorMode()

  useEffect(() => {
    if (isReady) {
      hookContract._fetch(router.query.id);
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

    return (
      <Box paddingBottom={style.margin.xxxl}>
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
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
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
                  textColor={colorMode=="light" ? "#3d3d3d" : ""}
                  text="Prev"
                  disabled={hookContractTxn.page <= 1}
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                />
                <Text color={colorMode == "light" ? "#3d3d3d" : ""} marginRight={style.margin.sm} marginBottom="0.25rem">
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
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
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
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                />
              </Box>
              <Box>
                <Text color={colorMode == "light" ? "#3d3d3d" : ""}>
                  Total Txns:{" "}
                  {hookContractTxn.totalTxns.toLocaleString("en-US")}
                </Text>
              </Box>
            </Box>
            <Box
              marginTop="1rem"
              border={colorMode == "light" ? "1px solid #e2e2e2" : style.table.border.thead}
              borderRadius="20px"
            >
              <TxnTable txnData={hookContractTxn?.filteredData} />
            </Box>
          </>
        ) : (
          <Text
            mt={style.margin.xl}
            color={colorMode == "light" ? "#3d3d3d" : ""}
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
        title={hookContract.contractDetails?.contract?.name
          ? `Macha | ${hookContract.contractDetails?.contract?.name}`
          : "Macha"
          }
      />
      <FlexWindow
        view="col"
        bodyElem={renderBody()}
        navTop={<NavHeader />}
        // navLeft={<NavLeft />}
      ></FlexWindow>
    </>
  );
};

export default Contract;
