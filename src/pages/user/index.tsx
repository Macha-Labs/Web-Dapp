import NavLeft from "@/_ui/nav/NavLeft";
import UserCard from "@/components/user/UserCard";
import UserProfile from "@/components/user/UserProfile";
import UserEdit from "@/components/user/UserEdit";
import { helperIPFS } from "@/helpers";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import { StyledPageContainer, StyledPageList } from "@/styles/StyledComponents";
import { Avatar, Input, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ModalWindow from "@/_ui/modal/ModalWindow";
import AuthCard from "@/components/auth/AuthCard";
import { disconnect } from "@wagmi/core";
import { FlexWindow } from "@/_ui/flex/FlexWindow";

const User = () => {
  const authContext = useContext(AuthContext);
  const [tabwindow, setTabwindow] = useState<string>("UserProfile");
  const modalAuth = useDisclosure();
  const modalEdit = useDisclosure();
  const userSettings = [
    {
      icon: "IconDarkEdit.png",
      name: "Edit Profile",
      onPress: () => {
        setTabwindow("UserEdit");
        console.log("Edit Profile");
      },
    },
    {
      icon: "IconDarkPrivacy.png",
      name: "Privacy and Security",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkNotification.png",
      name: "Notifications and Sounds",
      route: "",
      size: "lg",
    },
    {
      icon: "IconDarkCall.png",
      name: "Call and Video",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkWallet.png",
      name: "Wallet and Payments",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkDatabase.png",
      name: "Storage and Data",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkLinkedDevices.png",
      name: "Linked Devices",
      route: "",
      size: "lg",
    },
    {
      icon: "IconDarkLanguages.png",
      name: "Languages",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkAppearance.png",
      name: "Appearance",
      route: "",
      size: "md",
    },
    {
      icon: "IconDarkEdit.png",
      name: "Disconnect Wallet",
      onPress: async () => {
        await disconnect();
        window.location.href = "https://metaworkhq.com";
      },
    },
  ];

  useEffect(() => {
    if (!authContext?.address || !authContext?.user?.lens?.id)
      modalAuth.onOpen();
    else {
      modalAuth.onClose();
    }
  }, [authContext?.isConnected, modalAuth.isOpen]);

  const TemplateRight = () => {
    console.log(tabwindow, "WINDOW");
    return (
      <>
        {tabwindow == "UserProfile" ? (
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
        <ModalWindow event={modalAuth} style={{ className: "m-t-2" }}>
          <AuthCard />
        </ModalWindow>
      </>
    );
  };

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
              // onClick={setTabwindow("UserProfile")}
            />
            <LayoutOptions
              options={userSettings}
              style={{ className: "m-t-1 p-2" }}
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
      {authContext?.user?.lens?.id && (
        <FlexWindow>
          <div className="left">
            <NavLeft />
          </div>
          <div className="right">
            <Template />
          </div>
        </FlexWindow>
      )}

      <TemplateAuth />
    </>
  );
};

export default User;
