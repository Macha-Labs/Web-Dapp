import Nav from "@/components/nav/Nav";
import UserCard from "@/components/user/UserCard";
import UserProfile from "@/components/user/UserProfile";
import UserEdit from "@/components/user/UserEdit";
import { helperIPFS } from "@/helpers";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import {
  StyledPageContainer,
  StyledPageList,
  StyledWindow,
} from "@/styles/StyledComponents";
import { Avatar, Input, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ModalWindow from "@/components/modal/ModalWindow";
import AuthCard from "@/components/auth/AuthCard";

const User = () => {
  const authContext = useContext(AuthContext);
  const [window, setWindow] = useState("UserProfile");
  const modalAuth = useDisclosure();

  const userSettings = [
    {
      icon: "IconDarkEdit.png",
      name: "Edit Profile",
      onPress: () => {
        setWindow("UserEdit");
      },
    },
    {
      icon: "IconDarkPrivacy.png",
      name: "Privacy and Security",
      route: "",
    },
    {
      icon: "IconDarkNotification.png",
      name: "Notifications and Sounds",
      route: "",
    },
    {
      icon: "IconDarkCall.png",
      name: "Call and Video",
      route: "",
    },
    {
      icon: "IconDarkWallet.png",
      name: "Wallet and Payments",
      route: "",
    },
    {
      icon: "IconDarkDatabase.png",
      name: "Storage and Data",
      route: "",
    },
    {
      icon: "IconDarkLinkedDevices.png",
      name: "Linked Devices",
      route: "",
    },
    {
      icon: "IconDarkLanguages.png",
      name: "Languages",
      route: "",
    },
    {
      icon: "IconDarkAppearance.png",
      name: "Appearance",
      route: "",
    },
  ];

  useEffect(() => {
    if (!authContext?.address || !authContext?.user?.lens?.id) modalAuth.onOpen(); else {modalAuth.onClose()}
  }, [modalAuth.isOpen])

  const TemplateRight = () => {
    return (
      <>
        {window == "UserProfile" ? (
          <UserProfile user={authContext?.user} />
        ) : (
          <UserEdit />
        )}
      </>
    );
  };

  const TemplateAuth = () => {
    return (
      <>
        <ModalWindow event={modalAuth} style={{className: 'm-t-2'}}>
          <AuthCard/>
        </ModalWindow>
      </>
    )
  }

  const Template = () => {
    return (
      <>
        <StyledPageList>
          <div className="header vr-center">
            <Input />
          </div>
          <div className="body">            
            <UserCard
              user={authContext?.user}
              onClick={setWindow("UserProfile")}
            />
            <LayoutOptions
              options={userSettings}
              style={{ className: "m-t-1" }}
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
            <TemplateRight />
          </div>
        </StyledPageContainer>
      </>
    );
  };

  return (
    <>
      <StyledWindow>
        <div className="left">
          <Nav />
        </div>
        <div className="right">
          <Template />
        </div>
      </StyledWindow>
      <TemplateAuth />
    </>
  );
};

export default User;
