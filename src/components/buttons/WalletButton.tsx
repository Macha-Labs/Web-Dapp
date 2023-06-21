import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import { truncateAddress } from "@/helpers";
import useAuthStore from "@/store/useAuthStore";

const WalletButton = () => {
  const $address = useAuthStore((state: any) => state.address);

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
      onClick: () => {},
    },
    {
      value: "Register as Publisher",
      leftIcon: "icon-user",
      onClick: () => {},
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
