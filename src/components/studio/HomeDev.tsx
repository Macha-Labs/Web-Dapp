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
        The ultimate place for developers to explore smart contracts and it's real time transactions from different blockchain protocols  — all deployable with one click
        </Text>
        {(!hookMacha.isLoading && !hookMacha.publisherExists) && <Box display={"flex"}>
          <ButtonNative onClick={() => {
            const checkBalance = async () => {
              const balance = await fetchBalance({
                address: $address,
              });
              if (parseInt(balance.formatted) <= 1) {
                toast({
                  title: "You don't have enough balance",
                  status: "warning",
                  duration: 10000,
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
          image="https://ik.imagekit.io/macha/studio/push%20contracts-image.svg?updatedAt=1690613051466"
          title="Start Indexing Contracts"
          description="Publish your smart contract to accelerate the growth of your protocol and gain exposure to thriving developer community."
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
          image="https://ik.imagekit.io/macha/studio/create%20functions-imageV1.svg?updatedAt=1690615070963"
          description="Make blazingly fast function calls on contracts to integrate functions in your app with Macha’s SDK."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Abstract Metas"
          image="https://ik.imagekit.io/macha/studio/abstract%20metas-imagev1.svg?updatedAt=1690615302145"
          description="Enable users to easily discover your metas, such as Lens profiles, ENS, Nfts, and more, through our multi-chain search protocol."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Graph Playground"
          image="https://ik.imagekit.io/macha/studio/Graph%20playground.svg?updatedAt=1690616243533"
          description="Developers can use Macha’s content graph APIs to access and fetch essential user data related to specific contracts."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Explore Documentation"
          image="https://ik.imagekit.io/macha/studio/explore%20doc-image.svg?updatedAt=1690613051406"
          description="Check out our doc repository and sign up today to access the fastest API for all developers."
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
          description="Provides to aggregated user profile data."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha Meta SDK"
          description="Integrate to enable users to abstract your metas."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha Graph SDK"
          description="Enables graphQl APIs to fetch macha's indexed data."
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
