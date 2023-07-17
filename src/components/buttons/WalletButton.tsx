import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import { truncateAddress } from "@/helpers";
import useMachaAuth from "@/hooks/studio/useMachaAuth";
import useAuthStore from "@/store/useAuthStore";
import { useDisconnect } from "wagmi";

const WalletButton = () => {
  const $address = useAuthStore((state: any) => state.address);
  const hookMachaAuth = useMachaAuth();

  const walletOptions = [
    {
      value: truncateAddress($address),
      img: "../assets/Avatar.svg",
      // rightIcon: "icon-notification",
      onClick: () => {},
    },
    {
      value: "Switch Wallet",
      leftIcon: "icon-switchWallet",
      onClick: () => {},
    },
    {
      value: "Disconnect Wallet",
      leftIcon: "icon-disconnectWallet",
      onClick: async () => {
        
      },
    },
    {
      value: "Register as Publisher",
      leftIcon: "icon-user",
      onClick: () => {
        hookMachaAuth.registerPublisher();
      },
    },
  ];

  return (
    <ButtonMenu
      size={"md"}
      avatar="../assets/Avatar.svg"
      text={truncateAddress($address)}
      icon={{
        slug: "icon-chevron-down",
        style: ` marginLeft: "10px" `,
      }}
      options={walletOptions}
    />
  );
};
export default WalletButton;
