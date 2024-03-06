import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import ProfilePtsScreen from "@/components/screens/ProfilePtsScreen";
import { style } from "@/styles/StyledConstants";
import { Box, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Profile = () => {
  const { colorMode } = useColorMode();
  return (
    <Box paddingTop={style.padding.sm}>
        <ProfilePtsScreen
          heading="Macha NFT"
          image={
            colorMode == "light"
            ? "/assets/NoNftClaimed-rightBanner.svg"
            : "/assets/No_NFT_Claimed_Right.png"
          }
        />
      </Box>
  );
};

export default Profile;
