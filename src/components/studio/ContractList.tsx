import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import chains from "@/data/network";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractList from "@/hooks/studio/useContractList";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContractCard from "../cards/ContractCard";
import ContractCreateEditModal from "./ContractCreateEditModal";
import EditContractsModal from "./EditContractsModal";
import useContract from "@/hooks/studio/useContract";

type Props = {
  metaInfo?: any;
  openInNewTab?: any;
  data?: any;
};

const ContractList = ({ openInNewTab, data }: Props) => {
  const router = useRouter();

  const contractModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);
  const hookContract = useContract();
  const hookContractList = useContractList();
  const editContractsModal = useDisclosure();

  const renderComponent = () => {
    return (
      <>
        <FlexRow hrAlign="flex-start" width="100%" flexWrap="wrap">
          {hookContractList.isLoading && (
            <FlexRow height="500px">
              <Loader size="lg" />
            </FlexRow>
          )}
          <Grid templateColumns="repeat(4,1fr)" gap="10px" width="100%" paddingLeft={1}>
            {/* <Box width="100vw" display="flex" flexWrap="wrap" paddingLeft={1}> */}
            {!hookContractList.isLoading &&
              data &&
              data.map((item: any, index: number) => {
                // console.log(hookContractList?.filterData, "filered data");
                return (
                  <GridItem key={index} colSpan={1}>
                    <ContractCard
                      key={index}
                      createdAt={item?.createdAt}
                      height="8rem"
                      chainId={item?.contract?.chain_id}
                      address={item?.contract?.address}
                      heading={item?.contract?.name}
                      image={
                        item?.contract?.image
                          ? item?.contract?.image
                          : GlobalIcons["avatar-default"]
                      }
                      description={item?.contract?.description}
                      onCardClick={() => {
                        window.open(
                          `/search/contracts/${item?.contract?.slug}`,
                          `${openInNewTab ? "_blank" : "_self"}`
                        );
                        console.log(router.basePath, "url");
                      }}
                    />
                  </GridItem>
                );
              })}
          </Grid>
          <ContractCreateEditModal
            modal={contractModal}
            hookContractCreate={hookContractCreate}
            isEdit={false}
          />
          <EditContractsModal
            hookContractCreate={hookContractCreate}
            modal={editContractsModal}
            hookContract={hookContract}
          />
        </FlexRow>
      </>
    );
  };

  return renderComponent();
};

export default ContractList;
