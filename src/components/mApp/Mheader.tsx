import React from "react";
import { Box, Image } from "@chakra-ui/react";
import GlobalIcons from "@/styles/GlobalIcons";
import FlexRow from "@/_ui/flex/FlexRow";

type Props = {
  slug?: any;
  detailsModal?: any;
  walletModal?: any;
};

const Mheader = ({ slug, detailsModal, walletModal }: Props) => {
  return (
    <FlexRow
      hrAlign="space-between"
      paddingLeft="sm"
      paddingRight="sm"
      // padding={style.card.padding.default}
      height="10%"
      vrAlign="center"
    >
      <Image
          src="../../assets/Logo.png"
          height={"30px"}
          alt="logo"
          borderRadius={"2"}
          // borderRadius={style.card.borderRadius.button}
        />
      <Box
        onClick={() => {
          detailsModal.onOpen();
        }}
      >
      </Box>
      <Image
        src={GlobalIcons["icon-wallet"]}
        onClick={() => {
          walletModal.onOpen();
        }}
      />
    </FlexRow>
  );
};

export default Mheader;
