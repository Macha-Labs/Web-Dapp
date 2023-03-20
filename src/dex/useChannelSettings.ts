import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ChatContext } from "../providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";

export const useChannelSettings = () => {
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const $channel = useChatChannelStore((state: any) => state.channel);

  const chatOptions = [
    {
      icon: "IconDarkSearch.png",
      name: "Search Chat",
      onPress: () => {
        chatContext.hookChat.handleSearch();
      },
    },
    {
      icon: "IconDarkMute.png",
      name: "Mute Chat",
      onPress: () => {
      },
    },
    {
      icon: "IconDarkMultiselect.png",
      name: "Select Chat",
      onPress: () => {
        chatContext.hookChat.handleMultiSelect();
      },
    },
    {
      icon: "IconDarkEdit.png",
      name: "Edit Channel",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
        $channel?.createdBy === authContext.address,
      },
    },
    {
      icon: "IconDarkPermissions.png",
      name: "Permissions",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
        $channel?.createdBy === authContext.address,
      },
    },
    {
      icon: "IconDarkMembers.png",
      name: "Members",
      onPress: () => {},
      condition: {
        enabled: true,
        check:
        $channel?.createdBy === authContext.address,
      },
    },
  ];

  const chatOptions2 = [
    {
      icon: "IconDarkPhotos.png",
      name: "21 Photos",
      onPress: () => {
      },
    },
    {
      icon: "IconDarkVideos.png",
      name: "4 Videos",
      onPress: () => {
      },
    },
    {
      icon: "IconDarkFiles.png",
      name: "4 Files",
      onPress: () => {
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
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Delete Channel",
      onPress: () => {
      },
    },
  ];

  return {
    chatOptions,
    chatOptions2,
    chatOptions3,
  };
};
