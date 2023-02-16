import Nav from "@/components/nav/Nav";
import UserCard from "@/components/user/UserCard";
import UserProfile from "@/components/user/UserProfile";
import UserEdit from "@/components/user/UserEdit"
import { helperIPFS } from "@/helpers";
import { useUserSettings } from "@/hooks/user/useUserSetting";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import theme from "@/styles/StyledChakraTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Row,
  StyledCard,
  StyledChat,
  StyledChatList,
  StyledPageContainer,
  StyledPageList,
  StyledWindow,
} from "@/styles/StyledComponents";
import { Avatar, ChakraProvider, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";

const User = () => {
  const authContext = useContext(AuthContext);
  const hookUserSetting = useUserSettings();

  const TempalteRight = () => {
    return (
      <UserProfile user={authContext?.user} />
        // <UserEdit/>
    );
  };

  const Template = () => {
    return (
      <Row>
        <StyledPageList>
          <div className="header vr-center">
            <Input />
          </div>
          <div className="body">
            {!authContext.isConnected && <ConnectButton />}
            <UserCard user={authContext?.user} />
            <LayoutOptions
              options={hookUserSetting.userSettings}
              style={{ class: "m-t-1" }}
            />
          </div>
        </StyledPageList>
        <StyledPageContainer>
          <div className="header">
            <Avatar
              src={helperIPFS(authContext?.user?.lens?.image)}
              className="m-r-0-5"
              size="sm"
            />
            <Text fontSize="sm">{authContext?.user?.lens?.name}</Text>
          </div>
          <div className="body">
            <TempalteRight />
          </div>
        </StyledPageContainer>
      </Row>
    );
  }

  return (
    <ChakraProvider theme={theme}>
        <StyledWindow>
            <div className="left">
                <Nav />
            </div>

            <div className="right">
                <Template />
            </div>
        </StyledWindow>
    </ChakraProvider> 
  );
};

export default User;
