import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ChatContext } from "../providers/ChatProvider";
import IconImage from "@/components/icons/IconImage";

export const useChannelSettings = () => {
  const chatProvider = useContext(ChatContext);
  const authProvider = useContext(AuthContext);

  const chatOptions = [
    {
      icon: "IconDarkSearch.png",
      name: "Search Chat",
      onPress: () => {
        chatProvider.hookChat.handleSearch();
      },
    },
    {
      icon: "IconDarkMute.png",
      name: "Mute Chat",
      onPress: () => {
        console.log("Mute Chat");
      },
    },
    {
      icon: "IconDarkMultiselect.png",
      name: "Select Chat",
      onPress: () => {
        chatProvider.hookChat.handleMultiSelect();
      },
    },
    {
      icon: "IconDarkEdit.png",
      name: "Edit Channel",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
          chatProvider.hookChannel?.channel?.createdBy === authProvider.address,
      },
    },
    {
      icon: "IconDarkPermissions.png",
      name: "Permissions",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
          chatProvider.hookChannel?.channel?.createdBy === authProvider.address,
      },
    },
    {
      icon: "IconDarkMembers.png",
      name: "Members",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
          chatProvider.hookChannel?.channel?.createdBy === authProvider.address,
      },
    },
  ];

  const chatOptions2 = [
    {
      icon: "IconDarkPhotos.png",
      name: "21 Photos",
      onPress: () => {
        console.log("Search Chat");
      },
    },
    {
      icon: "IconDarkVideos.png",
      name: "4 Videos",
      onPress: () => {
        console.log("Mute Chat");
      },
    },
    {
      icon: "IconDarkFiles.png",
      name: "4 Files",
      onPress: () => {
        console.log("Select Chat");
      },
    },
    {
      icon: "IconDarkPinned.png",
      name: "21 Pinned Messages",
      onPress: () => {},
    },
  ];

  const chatOptions3 = [
    {
      //   icon: IconBrandClearChat,
      name: "Clear Chat",
      onPress: () => {
        console.log("Search Chat");
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Delete Channel",
      onPress: () => {
        console.log("Mute Chat");
      },
    },
  ];

  return {
    chatOptions,
    chatOptions2,
    chatOptions3,
  };
};
