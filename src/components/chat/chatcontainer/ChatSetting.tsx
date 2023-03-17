import ModalSlider from "@/components/modal/ModalSlider";
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
  console.log('Rendering >>>>> ChatSetting');
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const chatContext = useContext(ChatContext);
  const toast = useToast();
  const modalPinned = useDisclosure();

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
    props?.hookChatChannels.load();
    // props?.hookChatChannel.remove();
    // props.modalSettings.onClose();
  };
  const callbackClear = () => {
    toast({
      title: "Chat Cleared",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    props?.hookChatChannel.reload();
    props?.hookChatChannels.load();
    // props.modalSettings.onClose();
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
    props?.hookChatChannels.load();
    props?.hookChatChannel.reload();
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
    props?.hookChatChannels.load();
    props?.hookChatChannel.reload();
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
    props?.props?.hookChatChannels.load();
    props?.hookChatChannel.remove();
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
      <ChatPermissions modalChatPermission={modalChatPermission} />
    );
  };
  const TemplateMembers = () => {
    return (
      <ChatMembers
          modalChatMembers={modalChatMembers}
          modalAddMembers={modalAddMembers}
        />
    );
  };
  const TemplateMembersAdd = () => {
    return (
      <ChatMembersAdd
          modalAddMembers={modalAddMembers}
          modalChatMembers={modalChatMembers}
        />
    );
  };
  const TemplateEditChannel = () => {
    return (
        <ChatEdit modal={modalChatEdit} />
    );
  };
  const TemplatePinnedMessages = () => {
    return (
      <ChatMessageList
        modal={modalPinned}
        pinnedMessageList={dataContext?.channel?.pinnedMessages}
        hookChat={chatContext.hookChat}
      />
    );
  };
  return (
    <>
      <ModalSlider size="sm" 
      event={props.modalSettings}
      header={<Heading as="h6" size="sm">
      Channel Settings
    </Heading>}
    
    >
      <div>
        <Col>
          <LayoutOptions
            options={chatOptions}
            style={{ className: "m-b-1 p-2" }}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            options={chatOptions2}
            style={{ className: "m-b-1 p-2" }}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            style={{ className: "m-b-1 p-2" }}
            options={chatOptions3}
            channelAdmin={dataContext?.channel.createdBy}
            channelRawData={dataContext?.channel.raw}
            userId={authContext.address}
          />
        </Col>
      </div>
      
    </ModalSlider>
     {modalChatPermission.isOpen &&  <TemplatePermission />}
    {modalChatMembers.isOpen && <TemplateMembers />}
    {modalAddMembers.isOpen && <TemplateMembersAdd />}
    {modalChatEdit.isOpen && <TemplateEditChannel />}
    {modalPinned.isOpen && <TemplatePinnedMessages />}
    </>
  )
}

export default ChatSetting;
