import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  marginLeft?: any;
  marginRight?: any;
  width?: any;
};

const NavButton = ({ marginLeft, marginRight, width }: Props) => {
  const $address = useAuthStore((state: any) => state.address);
  const router = useRouter();
  const { asPath } = useRouter();

  const options = [
    {
      value: "Search",
      leftIcon: "icon-search24",
      onClick: () => {
        router.push("/");
      },
    },
    {
      value: "Data Studio",
      leftIcon: "icon-dataNetwork",
      onClick: () => {
        router.push("/studio/data");
      },
    },
    {
      value: "Nft Studio",
      leftIcon: "icon-adsNetwork",
      onClick: () => {
        router.push("/studio/nft");
      },
    },
  ];

  return (
    // <ButtonMenu
    //   marginLeft={marginLeft}
    //   marginRight={marginRight}
    //   width={width ? width : "100%"}
    //   text={
    //     asPath == "/"
    //       ? "Search"
    //       : asPath == "/studio/nft"
    //       ? "NFT Studio"
    //       : "Data Studio"
    //   }
    //   icon={{
    //     slug: "icon-chevron-down",
    //     style: ` marginLeft: "10px" `,
    //   }}
    //   options={options}
    // />
    <Box width={"8rem"}>
      <Text className="mb-0" fontSize={style.font.h6}>
        Data Studio
      </Text>
    </Box>
  );
};
export default NavButton;
