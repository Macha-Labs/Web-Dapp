import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import chains from "@/data/network";
import { truncateAddress } from "@/helpers";
import useMacha from "@/hooks/studio/useMacha";
import usePublisherCreate from "@/hooks/studio/usePublisherCreate";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { fetchBalance } from "@wagmi/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDisconnect, useNetwork } from "wagmi";
import CreatePublisherModal from "./studio/PublisherModal";

export const ConnectWalletButton = (props: any) => {
  const publisherModal = useDisclosure();
  const $address = useAuthStore((state: any) => state.address);
  const hookMacha = useMacha();
  const hookPublisherCreate = usePublisherCreate(publisherModal);
  const toast = useToast();
  const { disconnect } = useDisconnect();
  const $unload = useAuthStore((state: any) => state.unload);
  // console.log("mobile device detection", window.navigator.userAgent);
  const router = useRouter();
  const [balance, setBalance] = useState<any>(0.0);
  const { chain } = useNetwork();
  const chainId = chain?.id;

  const checkBalance = async () => {
    try {
      const balance = await fetchBalance({
        address: $address,
      });
      setBalance(Number(balance.formatted).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  const { colorMode } = useColorMode();

  useEffect(() => {
    if ($address) {
      checkBalance();
    }
  }, [$address, chainId]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    width="11rem"
                    height={props.height ? props.height : "3rem"}
                    size={props.size}
                    variant="state_brand"
                    onClick={openConnectModal}
                    borderRadius={style.button.borderRadius.default}
                    marginLeft={style.margin.xxs}
                  >
                    <Text
                      paddingBottom={"0px"}
                      marginBottom="0px"
                      fontSize={props?.font}
                      style={{ marginBottom: "0px", paddingBottom: "0px" }}
                    >
                      Connect Wallet
                    </Text>
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <ButtonNative
                    onClick={openChainModal}
                    variant="state_default_warning"
                    height="2.5rem"
                    marginLeft="xxs"
                  >
                    Wrong Network
                  </ButtonNative>
                );
              }
              return (
                <div
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  className="w-100"
                >
                  <Menu>
                    <MenuButton
                      width="11rem"
                      height={props.height ? props.height : "3rem"}
                      variant={
                        colorMode == "light"
                          ? "state_light"
                          : "state_default_hover"
                      }
                      as={Button}
                      style={{
                        borderRadius: `${style.card.borderRadius.button}`,
                        marginLeft: `${style.margin.sm}`,
                      }}
                      leftIcon={
                        <Image
                          src={
                            chainId && GlobalIcons[chains[chainId].chainImage]
                          }
                          alt="txn-icon"
                          height={props.height ? "1.5rem" : "1.75rem"}
                          width={props.height ? "1.5rem" : "1.75rem"}
                        />
                      }
                      rightIcon={
                        <IconBase
                          slug="icon-chevron-down"
                          size="sm"
                          style={` marginLeft: "10px" `}
                        />
                      }
                    >
                      <FlexColumn>
                        {/* <Image src={"../assets/Avatar.svg"} alt="avatar" /> */}
                        {props?.showBalance && (
                          <Text
                            fontSize={"sm"}
                            className="mb-0"
                            align="left"
                            fontWeight="700"
                            width="80%"
                          >
                            {balance} TFIL
                          </Text>
                        )}
                        <Text
                          fontSize={"xs"}
                          className="mb-0"
                          color="#8f8f8f"
                          fontWeight="500"
                          width="80%"
                        >
                          {truncateAddress($address)}
                        </Text>
                      </FlexColumn>
                    </MenuButton>
                    <MenuList
                      style={{
                        background: `${colorMode == "light" ? "#ffff" : ""}`,
                      }}
                    >
                      <MenuItem
                        style={{
                          background: `${colorMode == "light" ? "#ffff" : ""}`,
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText($address);
                          toast({
                            title: "Copied To Clipboard",
                            status: "success",
                            duration: 3000,
                          });
                        }}
                      >
                        <FlexRow hrAlign="space-between">
                          <Image
                            style={{ height: "25px", width: "25px" }}
                            src={GlobalIcons["avatar-default"]}
                            alt=""
                          />
                          {/* <IconImage slug="icon-switchWallet" /> */}
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            <Text
                              color={colorMode == "light" ? "#000" : ""}
                              mb={0}
                            >
                              {truncateAddress($address)}
                            </Text>
                            {/* <IconImage slug="icon-switchWallet" /> */}
                          </FlexRow>
                        </FlexRow>
                      </MenuItem>
                      {/* <MenuItem onClick={openAccountModal}>
                        <FlexRow hrAlign="space-between">
                          <IconImage slug="icon-switchWallet" />
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            {"Switch Wallet"}
                          </FlexRow>
                        </FlexRow>
                      </MenuItem> */}
                      {props?.showStudio && (
                        <MenuItem
                          style={{
                            background: `${
                              colorMode == "light" ? "#ffff" : ""
                            }`,
                          }}
                          onClick={async () => {
                            router.push("/studio");
                          }}
                        >
                          <FlexRow hrAlign="space-between">
                            <IconBase slug="icon-dark-deploy" size="xl" />
                            <FlexRow
                              hrAlign="flex-start"
                              width="90%"
                              marginLeft={"sm"}
                            >
                              <Text
                                color={colorMode == "light" ? "#000" : ""}
                                mb={0}
                              >
                                Visit Studio
                              </Text>
                            </FlexRow>
                          </FlexRow>
                        </MenuItem>
                      )}
                      {props?.showContracts && (
                        <MenuItem
                          style={{
                            background: `${
                              colorMode == "light" ? "#ffff" : ""
                            }`,
                          }}
                          onClick={async () => {
                            router.push("/mycontracts");
                          }}
                        >
                          <FlexRow hrAlign="space-between">
                            <IconBase slug="icon-dark-deploy" size="xl" />
                            <FlexRow
                              hrAlign="flex-start"
                              width="90%"
                              marginLeft={"sm"}
                            >
                              My Contracts
                            </FlexRow>
                          </FlexRow>
                        </MenuItem>
                      )}
                      {props?.showExplorer && (
                        <MenuItem
                          style={{
                            background: `${
                              colorMode == "light" ? "#ffff" : ""
                            }`,
                          }}
                          onClick={async () => {
                            router.push("/");
                          }}
                        >
                          <FlexRow hrAlign="space-between">
                            <IconBase slug="icon-dark-globe" size="xl" />
                            <FlexRow
                              hrAlign="flex-start"
                              width="90%"
                              marginLeft={"sm"}
                            >
                              Visit Explorer
                            </FlexRow>
                          </FlexRow>
                        </MenuItem>
                      )}
                      {!hookMacha.publisherExists &&
                        props?.showRegisterPublisher && (
                          <MenuItem
                            style={{
                              background: `${
                                colorMode == "light" ? "#ffff" : ""
                              }`,
                            }}
                            onClick={async () => {
                              await checkBalance();
                              if (balance <= 1) {
                                toast({
                                  title: "You don't have enough TFIL balance",
                                  status: "warning",
                                  duration: 10000,
                                  position: "top-right",
                                });
                              }
                              publisherModal.onOpen();
                            }}
                          >
                            <FlexRow hrAlign="space-between">
                              <IconBase slug="icon-dark-user" size="xl" />
                              <FlexRow
                                hrAlign="flex-start"
                                width="90%"
                                marginLeft={"sm"}
                              >
                                {"Register as Publisher"}
                              </FlexRow>
                            </FlexRow>
                          </MenuItem>
                        )}
                      <MenuItem
                        style={{
                          background: `${colorMode == "light" ? "#ffff" : ""}`,
                        }}
                        onClick={() => {
                          $unload();
                          disconnect();
                          if (window !== undefined) {
                            const res = window.sessionStorage.setItem(
                              "macha.connected",
                              "false"
                            );
                          }
                        }}
                      >
                        <FlexRow hrAlign="space-between">
                          <IconBase
                            slug="icon-dark-disconnectWallet"
                            size="xl"
                          />
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            <Text
                              mb={0}
                              color={colorMode == "light" ? "#000" : ""}
                            >
                              {"Disconnect Wallet"}
                            </Text>
                          </FlexRow>
                        </FlexRow>
                      </MenuItem>
                      <CreatePublisherModal
                        modal={publisherModal}
                        hookPublisherCreate={hookPublisherCreate}
                      />
                    </MenuList>
                  </Menu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
