import ProfileSettings from "@/components/screens/ProfileSettings";
import { style } from "@/styles/StyledConstants";
import { Box, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Profile = () => {
  const { colorMode } = useColorMode();
  return (
    <Box paddingTop={style.padding.sm}>
        <ProfileSettings/>
    </Box>
  );
};

export default Profile;
