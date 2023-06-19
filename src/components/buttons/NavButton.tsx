import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import { truncateAddress } from "@/helpers";
import Search from "@/pages/studio/search";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
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
        router.push("/studio/search");
      },
    },
    {
      value: "Ads Network",
      leftIcon: "icon-adsNetwork",
      onClick: () => {
        router.push("/studio/ads");
      },
    },
    {
      value: "Data Network",
      leftIcon: "icon-dataNetwork",
      onClick: () => {
        router.push("/studio/dashboard");
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
