import ButtonNative from "@/_ui/buttons/ButtonNative";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useMacha from "@/hooks/studio/useMacha";
import usePublisherCreate from "@/hooks/studio/usePublisherCreate";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { fetchBalance } from "@wagmi/core";
import ContractCreateEditModal from "./ContractCreateEditModal";
import GetStartedCards from "./GetStartedCards";
import CreatePublisherModal from "./PublisherModal";
import { useRouter } from "next/router";

const HomeDev = () => {
  const publisherModal = useDisclosure();
  const $address = useAuthStore((state: any) => state.address);
  const hookMacha = useMacha();
  const hookPublisherCreate = usePublisherCreate(publisherModal);
  const toast = useToast();
  const contractModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);
  const router = useRouter();

  return (
    <Box
      style={{
        marginTop: `${style.margin["4xl"]}`,
        height: "fit-content",
      }}
    >
      {$address && (
        <Box
          background={style.card.bg.brand}
          borderRadius={style.card.borderRadius.default}
          padding={style.padding.lg}
        >
          <Heading fontSize={style.font.h3} p={0} lineHeight={style.font.h3}>
            Developer Dashboard
          </Heading>
          <Text fontSize={style.font.h5}>
            The ultimate place for developers to explore smart contracts and
            it&#39;s real time transactions from different blockchain protocols
          </Text>

          {!hookMacha.isLoading && !hookMacha.publisherExists ? (
            <Box display={"flex"}>
              <ButtonNative
                textColorHover="#004ad9"
                boxShadowHover="4px 4px 24px rgba(0,0,0,0.35)"
                backgroundColorHover="#A0CDFF"
                border="1px solid #fff"
                marginTop="xs"
                onClick={() => {
                  const checkBalance = async () => {
                    try {
                      const balance = await fetchBalance({
                        address: $address,
                      });
                      if (parseInt(balance.formatted) <= 1) {
                        toast({
                          title: "You don't have enough TFIL balance",
                          status: "warning",
                          duration: 10000,
                          position: "top-right",
                        });
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  };
                  if ($address == null) {
                    toast({
                      title: "Please connect your wallet.",
                      status: "info",
                      duration: 3000,
                      position: "top-right",
                    });
                    return;
                  }
                  checkBalance();
                  publisherModal.onOpen();
                }}
                text="Set a Publisher Account"
              />
            </Box>
          ) : (
            <Box display={"flex"}>
              <Text
                style={{
                  marginTop: `${style.margin.xs}`,
                  marginBottom: "0px",
                  fontSize: `${style.font.h5}`,
                  fontWeight: `${style.fontWeight.dark}`,
                }}
              >
                You are a publisher
              </Text>
            </Box>
          )}
        </Box>
      )}

      <Flex flexWrap="wrap" paddingLeft={2} marginTop={style.margin.xl}>
        <GetStartedCards
          image="/assets/homeDev/push%20contracts-imagev4.svg"
          title="Indexers"
          description="Publish your smart contract for growth and developer community exposure."
          onClick={() => {
            router.push("/indexers");
          }}
        />
        <GetStartedCards
          title="Functions"
          image="/assets/homeDev/create%20functions-imagev4.svg"
          description=" Make fast function calls on contracts to integrate functions in your app"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Metas"
          image="/assets/homeDev/abstract%20metas-imagev4.svg"
          description="Enable users to discover your metas, like Lens profiles, ENS, Nfts, and more"
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha Graph SDK"
          image="/assets/homeDev/Graph%20playgroundv4.svg"
          description="Use Macha’s content graph APIs to access user data related to specific contracts."
          tag="soon"
          disabled={true}
        />
        <GetStartedCards
          title="Macha ID SDK"
          description="User identity solution build on top of existing wallet infrastructure."
          tag="soon"
          image="/assets/homeDev/Macha%20ID%20SDK.svg"
          disabled={true}
        />
      </Flex>

      {/* <Box marginTop={style.margin.xl}>
        <Text fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>
          Upcoming SDKs
        </Text>
      </Box>

      <Flex flexWrap="wrap" paddingLeft={2}>
        <GetStartedCards
          title="Macha Graph SDK"
          description="Enables graphQl APIs to fetch macha&#39;s indexed data."
          tag="soon"
          disabled={true}
        />
      </Flex> */}
      <CreatePublisherModal
        modal={publisherModal}
        hookPublisherCreate={hookPublisherCreate}
      />
      <ContractCreateEditModal
        modal={contractModal}
        hookContractCreate={hookContractCreate}
        isEdit={false}
      />
    </Box>
  );
};

export default HomeDev;
