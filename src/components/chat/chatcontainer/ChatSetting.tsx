import ModalSlider from "@/components/modal/ModalSlider";
import useChatChannel from "@/hooks/chat/useChatChannel";
import useChatChannelsReload from "@/hooks/chat/useChatChannelsReload";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { DataContext } from "@/providers/DataProvider";
import { Col } from "@/styles/StyledComponents";
import { Heading, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import ChatEdit from "../ChatEdit";
import ChatMembers from "./ChatMembers";
import ChatMembersAdd from "./ChatMembersAdd";
import ChatMessageList from "./ChatMessageList";
import ChatPermissions from "./ChatPermissions";

function ChatSetting(props: any) {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const chatContext = useContext(ChatContext);
  const toast = useToast();
  const modalPinned = useDisclosure();
  const hookChatChannels = useChatChannelsReload();
  const hookChatChannel = useChatChannel();
  /**
   * @description
   **/
   const callbackDelete = () => {
    toast({
      title: "Channel Deleted",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    hookChatChannels.load();
    hookChatChannel.remove();
    props.modalSettings.onClose();
  };
  const callbackClear = () => {
    toast({
      title: "Chat Cleared",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    hookChatChannel.reload();
    props.modalSettings.onClose();
  };

  /**
   * @description
   **/
  const callbackMute = () => {
    toast({
      title: "Channel Muted",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    hookChatChannels.load();
    hookChatChannel.reload();
    props.modalSettings.onClose();
  };

  /**
   * @description
   **/
  const callbackUnmute = () => {
    toast({
      title: "Channel Unmuted",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    hookChatChannels.load();
    hookChatChannel.reload();
    props.modalSettings.onClose();
  };
  /**
   * @description
   **/
  const callbackLeave = () => {
    toast({
      title: "Channel Left",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    hookChatChannels.load();
    hookChatChannel.remove();
    props.modalSettings.onClose();
  };

  /**
   * @description
   **/
  const hookPortalChannel = usePortalChannel(
    dataContext?.channel,
    {
      delete: callbackDelete,
      mute: callbackMute,
      unmute: callbackUnmute,
      leave: callbackLeave,
      clear:callbackClear,
    }
  );
  /**
   * @description Setting options
   *
   *
   **/
  const chatOptions = [
    {
      icon: "IconDarkSearch.png",
      name: "Search Chat",
      onPress: () => {
        chatContext.hookChat.handleSearch();
        props?.event?.onClose();
      },
    },
    {
      icon: "IconDarkMute.png",
      name: "Mute Chat",
      onPress: () => {
        hookPortalChannel?.muteChannel(dataContext?.channel);
      },
    },
    {
      icon: "IconDarkUnMute.png",
      name: "UnMute Chat",
      onPress: () => {
        hookPortalChannel?.unMuteChannel(dataContext?.channel);
      },
    },
    {
      icon: "IconDarkMultiselect.png",
      name: "Select Chat",
      onPress: () => {
        chatContext.hookChat.handleMultiSelect();
        props?.event?.onClose();
      },
    },
    {
      icon: "IconDarkEdit.png",
      name: "Edit Channel",
      onPress: () => {
        modalChatEdit.onOpen();
      },
      condition: {
        enabled: true,
        check:
          dataContext?.channel?.createdBy ===
          authContext.address,
      },
    },
    {
      icon: "IconDarkPermissions.png",
      name: "Permissions",
      onPress: () => {
        modalChatPermission.onOpen();
      },
      condition: {
        enabled: true,
        check:
          dataContext?.channel?.createdBy ===
          authContext.address,
      },
    },
    {
      icon: "IconDarkMembers.png",
      name: "Manage Members",
      onPress: () => {
        modalChatMembers.onOpen();
      },
      condition: {
        enabled: true,
        check:
          dataContext?.channel?.createdBy ===
          authContext.address,
      },
    },
  ];

  const chatOptions2 = [
    {
      icon: "IconDarkPhotos.png",
      name: "Photos",
      onPress: () => {},
    },
    {
      icon: "IconDarkVideos.png",
      name: "Videos",
      onPress: () => {},
    },
    {
      icon: "IconDarkFiles.png",
      name: "Files",
      onPress: () => {},
    },
    {
      icon: "IconDarkPinned.png",
      name: "Pinned Messages",
      onPress: () => {
        modalPinned.onOpen();
      },
    },
  ];

  const chatOptions3 = [
    {
      //   icon: IconBrandClearChat,
      name: "Copy Invite Link",
      icon: "IconDarkFiles.png",
      onPress: () => {
        const inviteLink = `${window.location.origin}/invite/c/${dataContext?.channel.id}`
        navigator.clipboard.writeText(inviteLink);
        toast({
          title: "Copied to clipboard",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Clear Chat",
      icon: "IconRedDelete.png",
      onPress: () => {
        hookPortalChannel?.clearChat(dataContext?.channel);
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Delete Channel",
      icon: "IconRedDelete.png",
      onPress: () => {
        hookPortalChannel?.deleteChannel(dataContext?.channel);
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Leave Channel",
      icon: "IconDarkLeave.png",
      onPress: () => {
        hookPortalChannel?.leaveChannel(dataContext?.channel);
      },
    },
  ];



  const modalChatPermission = useDisclosure();
  const modalChatMembers = useDisclosure();
  const modalAddMembers = useDisclosure();
  const modalChatEdit = useDisclosure();

  const TemplatePermission = () => {
    return (
      <ModalSlider size={"md"} event={modalChatPermission}>
        <ChatPermissions />
      </ModalSlider>
    );
  };
  const TemplateMembers = () => {
    return (
      <ModalSlider size={"md"} event={modalChatMembers}>
        <ChatMembers
          modalChatMembers={modalChatMembers}
          modalAddMembers={modalAddMembers}
        />
      </ModalSlider>
    );
  };
  const TemplateMembersAdd = () => {
    return (
      <ModalSlider size={"md"} event={modalAddMembers}>
        <ChatMembersAdd
          modalAddMembers={modalAddMembers}
          modalChatMembers={modalChatMembers}
        />
      </ModalSlider>
    );
  };
  const TemplateEditChannel = () => {
    return (
      <ModalSlider size={"lg"} event={modalChatEdit}>
        <ChatEdit modal={modalChatEdit} />
      </ModalSlider>
    );
  };

  const TemplatePinnedMessages = () => {
    return (
      <ModalSlider event={modalPinned} size="md">
        <ChatMessageList
          pinnedMessageList={dataContext?.channel?.pinnedMessages}
          hookChat={chatContext.hookChat}
        />
      </ModalSlider>
    );
  };
  return (
    <>
      <div>
        <Heading as="h4" size="md" className="m-b-1">
          Channel Settings
        </Heading>
        <Col>
          <LayoutOptions
            options={chatOptions}
            style={{ className: "m-b-1" }}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            options={chatOptions2}
            style={{ className: "m-b-1" }}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            options={chatOptions3}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
        </Col>
      </div>
      <TemplatePermission />
      <TemplateMembers />
      <TemplateMembersAdd />
      <TemplateEditChannel />
      <TemplatePinnedMessages />
    </>
  );
}

export default ChatSetting;
