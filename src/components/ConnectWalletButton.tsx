import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import IconBase from "@/_ui/icons/IconsBase";
import { truncateAddress } from "@/helpers";
import useMachaAuth from "@/hooks/studio/useMachaAuth";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CreatePublisherModal from "./studio/PublisherModal";
import usePublisherCreate from "@/hooks/studio/usePublisherCreate";
import useMacha from "@/hooks/studio/useMacha";

export const ConnectWalletButton = (props: any) => {
  const publisherModal = useDisclosure();
  const $address = useAuthStore((state: any) => state.address);
  const $loadAddress = useAuthStore((state: any) => state.loadAddress);
  const hookMachaAuth = useMachaAuth();
  const hookMacha = useMacha();
  const hookPublisherCreate = usePublisherCreate(publisherModal);
  // console.log("mobile device detection", window.navigator.userAgent);
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
            className="w-100"
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
                    className="w-100"
                    size={props.size}
                    variant="state_brand"
                    onClick={openConnectModal}
                    borderRadius={style.button.borderRadius.default}
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
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  className="w-100"
                >
                  {/* <button
                    className="w-100"
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  {/* <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button> */}
                  <Menu>
                    <MenuButton
                      variant={"state_default_hover"}
                      as={Button}
                      style={{
                        borderRadius: `${style.card.borderRadius.button}`,
                      }}
                      rightIcon={
                        <IconBase
                          slug="icon-chevron-down"
                          size="sm"
                          style={` marginLeft: "10px" `}
                        />
                      }
                      height={"2rem"}
                      
                    >
                      <FlexRow>
                        {/* <Image src={"../assets/Avatar.svg"} alt="avatar" /> */}
                        <Text
                          marginLeft={style.button.margin.default}
                          fontSize={"sm"}
                          className="mb-0"
                        >
                          {truncateAddress($address)}
                        </Text>
                      </FlexRow>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => { }}>
                        <FlexRow hrAlign="space-between">
                          <Image
                            style={{ height: "25px", width: "25px" }}
                            src="../assets/Avatar.svg"
                            alt=""
                          />
                          {/* <IconImage slug="icon-switchWallet" /> */}
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            {truncateAddress($address)}
                            {/* <IconImage slug="icon-switchWallet" /> */}
                          </FlexRow>
                        </FlexRow>
                      </MenuItem>
                      <MenuItem onClick={openConnectModal}>
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
                      </MenuItem>
                      <MenuItem onClick={openAccountModal}>
                        <FlexRow hrAlign="space-between">
                          <IconImage slug="icon-disconnectWallet" />
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            {"Disconnect Wallet"}
                          </FlexRow>
                        </FlexRow>
                      </MenuItem>
                      {!hookMacha.publisherExists && <MenuItem
                        onClick={() => {
                          publisherModal.onOpen();
                        }}
                      >
                        <FlexRow hrAlign="space-between">
                          <IconImage slug="icon-user" size="sm" />
                          <FlexRow
                            hrAlign="flex-start"
                            width="90%"
                            marginLeft={"sm"}
                          >
                            {"Register as Publisher"}
                          </FlexRow>
                        </FlexRow>
                      </MenuItem>}
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
