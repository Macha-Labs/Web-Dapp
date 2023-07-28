import ButtonNative from "@/_ui/buttons/ButtonNative";
import { style } from "@/styles/StyledConstants";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import GetStartedCards from "./GetStartedCards";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import CreatePublisherModal from "./PublisherModal";
import usePublisherCreate from "@/hooks/studio/usePublisherCreate";
import useMacha from "@/hooks/studio/useMacha";
import { fetchBalance } from "@wagmi/core";
import useAuthStore from "@/store/useAuthStore";
import useContractCreate from "@/hooks/studio/useContractCreate";

const HomeDev = () => {

  const publisherModal = useDisclosure();
  const $address = useAuthStore((state: any) => state.address);
  const hookMacha = useMacha();
  const hookPublisherCreate = usePublisherCreate(publisherModal);
  const toast = useToast();
  const contractModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);

  return (
    <Box
      style={{
        marginTop: `${style.margin.xxl}`,
        height: "fit-content",
        paddingTop: `${style.padding.md}`,
      }}
    >
      <Box
        background={style.card.bg.brand}
        borderRadius={style.card.borderRadius.default}
        padding={style.padding.sm}
      >
        <Heading>Developer Dashboard</Heading>
        <Text>
          Macha services enable developers to interact seamlessly with blockchain data through its search protocol
        </Text>
        {!hookMacha.publisherExists && <Box display={"flex"}>
          <ButtonNative onClick={() => {
            const checkBalance = async () => {
              const balance = await fetchBalance({
                address: $address,
              });
              if (parseInt(balance.formatted) <= 1) {
                toast({
                  title: "You don't have enough balance",
                  status: "warning",
                  duration: 5000,
                  position: "top-right",
                });
              }
            };
            checkBalance();
            publisherModal.onOpen()
          }} text="Set a Publisher Account" />
        </Box>}
      </Box>

      <Box marginTop={style.margin.xl}>
        <Text fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>
          Get started quickly
        </Text>
      </Box>

      <Flex flexWrap="wrap">
        <GetStartedCards
          title="Start Indexing Contracts"
          description="View smart contract that you added or deployed to your dashboard"
          onClick={() => {
            if (hookMacha.publisherExists) {
              contractModal.onOpen()
            }
            else {
              toast({
                title: "Please register as a publisher",
                status: "warning",
                duration: 5000,
                position: "top-right",
              });
            }
          }}

        />
        <GetStartedCards
          title="Create Functions"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Abstract Metas"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Graph Playground"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Explore Documentation"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
      </Flex>

      <Box marginTop={style.margin.xl}>
        <Text fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>
          Upcoming SDKs
        </Text>
      </Box>

      <Flex flexWrap="wrap">
        <GetStartedCards
          title="Macha Account SDK"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha Meta SDK"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha Graph SDK"
          description="View smart contract that you added or deployed to your dashboard"
          tag="soon"
          disabled={true}
        />
      </Flex>
      <CreatePublisherModal
        modal={publisherModal}
        hookPublisherCreate={hookPublisherCreate}
      />
      <ContractCreateModal
        modal={contractModal}
        hookContractCreate={hookContractCreate}
      />
    </Box>
  );
};

export default HomeDev;
