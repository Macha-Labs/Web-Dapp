import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import ContractInfoCard from "@/components/studio/ContractInfoCard";
import ContractDeleteModal from "@/components/studio/ContractDeleteModal";
import ContractEditModal from "@/components/studio/ContractEditModal";
import TxnTable from "@/components/studio/TxnTable";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractTxn from "@/hooks/studio/useContractTxn";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavButton from "@/components/buttons/NavButton";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavTop from "@/_ui/nav/NavTop";

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
  const deleteModal = useDisclosure();
  const hookContractCreate = useContractCreate(editModal);

  useEffect(() => {
    if (isReady) {
      hookContract._fetch(router.query.id),
        hookContractTxn._fetch(router.query.id);
    }
  }, [router.query.id]);

  const renderNav = () => {
    return (
      <NavTop
        centerElem={<InputSearch />}
        rightElem={
          <FlexRow width="fit-content">
            {$address && <NavButton />}
            {<ConnectWalletButton/>}
          </FlexRow>
        }
      />
    );
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
      <Box paddingTop={style.padding["xxxl"]} marginTop={style.margin["xxxl"]}>
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
        <ContractEditModal
          modal={editModal}
          hookContractCreate={hookContractCreate}
          hookContract={hookContract}
        />
        <ContractDeleteModal modal={deleteModal} hookContract={hookContract} />
        {hookContractTxn.isLoading ? (
          <FlexRow height="100px">
            <Loader size="lg" />
          </FlexRow>
        ) : hookContractTxn?.filteredData[0] ? (
          <>
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
            <Box
              style={{
                display: "flex",
                alignItems: "end",
                marginBottom: `${style.margin.md}`,
                marginTop: `${style.margin.sm}`,
              }}
            >
              <ButtonNative
                marginRight="sm"
                onClick={() => {}}
                text="first"
                variant="state_default_hover"
              />
              <ButtonNative
                marginRight="sm"
                onClick={() => {}}
                text="Prev"
                disabled={true}
                variant="state_default_hover"
              />
              <Text marginRight={style.margin.sm}>Page 1 of 45</Text>
              <ButtonNative
                marginRight="sm"
                onClick={() => {}}
                disabled={true}
                text="Next"
                variant="state_default_hover"
              />
              <ButtonNative
                marginRight="sm"
                onClick={() => {}}
                text="last"
                variant="state_default_hover"
              />
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
          <>
            {" "}
            <NavBlock
              back={() => {
                router.back();
              }}
              marginTop={style.margin["nav"]}
            >
              <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
                <FlexRow width="100%" hrAlign="space-between">
                  <Heading fontSize={style.font.h7} className="m-b-0">
                    {hookContract?.contractDetails &&
                      hookContract?.contractDetails?.contract.name}
                  </Heading>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    {$address &&
                      hookContract?.contractDetails &&
                      hookContract?.contractDetails?.contract?.admins?.includes(
                        $address
                      ) && (
                        <ButtonNative
                          size="sm"
                          text="Edit Contract"
                          variant="state_brand"
                          onClick={() => {
                            editModal.onOpen();
                          }}
                        />
                      )}
                    {$address &&
                      hookContract?.contractDetails &&
                      hookContract?.contractDetails?.contract?.admins?.includes(
                        $address
                      ) && (
                        <ButtonNative
                          size="sm"
                          text="Delete Contract"
                          variant="state_brand"
                          marginLeft="md"
                          onClick={() => {
                            deleteModal.onOpen();
                          }}
                        />
                      )}
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
  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navElem={renderNav()}
    ></FlexWindow>
  );
};

export default Contract;
