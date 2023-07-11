import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/router";

type Props = {
  marginLeft?: any;
  marginRight?: any;
};

const NavButton = ({ marginLeft, marginRight }: Props) => {
  const $address = useAuthStore((state: any) => state.address);
  const router = useRouter();
  const { asPath } = useRouter();

  const options = [
    {
      value: "Search",
      leftIcon: "icon-search24",
      onClick: () => {
        router.push("/search");
      },
    },
    {
      value: "Nft Studio",
      leftIcon: "icon-adsNetwork",
      onClick: () => {
        router.push("/studio/nft");
      },
    },
    {
      value: "Data Studio",
      leftIcon: "icon-dataNetwork",
      onClick: () => {
        router.push("/studio/data");
      },
    },
  ];

  return (
    <ButtonMenu
      marginLeft={marginLeft}
      marginRight={marginRight}
      text={
        asPath == "/studio/search"
          ? "Search"
          : asPath == "/studio/ads"
          ? "Ads Network"
          : "Data Network"
      }
      icon={{
        slug: "icon-chevron-down",
        style: ` marginLeft: "10px" `,
      }}
      options={options}
    />
  );
};
export default NavButton;
