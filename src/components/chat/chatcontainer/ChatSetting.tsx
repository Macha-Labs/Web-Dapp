import ModalSlider from "@/components/modal/ModalSlider";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { StyledCol } from "@/styles/StyledComponents";
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
  const chatContext = useContext(ChatContext);
  const $channel = useChatChannelStore((state: any) => state.channel);
  // const $channel = {id: 'hi', createdBy: '', raw: '', pinnedMessages: []}
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
    chatContext?.hookChannel?.remove();
    chatContext?.hookChannelList?.load();
    props.modalSettings.onClose();
  };
  const callbackClear = () => {
    toast({
      title: "Chat Cleared",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.hookChannelList?.load();
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
    chatContext?.hookChannelList?.load();
    props?.modalSettings.onClose();
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
    chatContext?.hookChannelList?.load();
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
    chatContext?.hookChannel?.remove();
    chatContext?.hookChannelList?.load();
    props.modalSettings.onClose();
  };

  /**
   * @description
   **/
  const hookPortalChannel = usePortalChannel(
    $channel,
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
        props?.modalSettings?.onClose();
      },
    },
    {
      icon: "IconDarkMute.png",
      name: "Mute Chat",
      onPress: () => {
        hookPortalChannel?.muteChannel($channel);
      },
    },
    {
      icon: "IconDarkUnMute.png",
      name: "UnMute Chat",
      onPress: () => {
        hookPortalChannel?.unMuteChannel($channel);
      },
    },
    {
      icon: "IconDarkMultiselect.png",
      name: "Select Chat",
      onPress: () => {
        chatContext.hookChat.handleMultiSelect();
        props?.modalSettings?.onClose();
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
          $channel?.createdBy ===
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
          $channel?.createdBy ===
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
          $channel?.createdBy ===
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
      name: "Clear Chat History",
      icon: "IconRedDelete.png",
      onPress: () => {
        hookPortalChannel?.clearChat($channel);
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Delete Channel",
      icon: "IconRedDelete.png",
      onPress: () => {
        hookPortalChannel?.deleteChannel($channel);
      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Leave Channel",
      icon: "IconDarkLeave.png",
      onPress: () => {
        hookPortalChannel?.leaveChannel($channel);
      },
    },
  ];

  const chatOptions4 = [
    {
      //   icon: IconBrandClearChat,
      name: "Copy Invite Link",
      icon: "IconDarkFiles.png",
      onPress: () => {
        const inviteLink = `${window.location.origin}/invite/c/${$channel.id}`
        navigator.clipboard.writeText(inviteLink);
        toast({
          title: "Copied to clipboard",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
      },
    },
  ]



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
          modalSettings={props.modalSettings}
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
        modalSettings={props.modalSettings}
        pinnedMessageList={$channel?.pinnedMessages}
        hookChat={chatContext.hookChat}
      />
    );
  };
  return (
    <>
      {props.modalSettings && <ModalSlider size="sm" 
      event={props.modalSettings}
      header={<Heading as="h6" size="sm">
      Channel Settings
    </Heading>}
    
    >
      <div>
        <StyledCol>
          <LayoutOptions
            options={chatOptions4}
            style={{ className: "m-b-1 p-2" }}
            channelAdmin={$channel.createdBy}
            channelRawData={$channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            options={chatOptions}
            style={{ className: "m-b-1 p-2" }}
            channelAdmin={$channel.createdBy}
            channelRawData={$channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            options={chatOptions2}
            style={{ className: "m-b-1 p-2" }}
            channelAdmin={$channel.createdBy}
            channelRawData={$channel.raw}
            userId={authContext.address}
          />
          <LayoutOptions
            style={{ className: "m-b-1 p-2" }}
            options={chatOptions3}
            channelAdmin={$channel.createdBy}
            channelRawData={$channel.raw}
            userId={authContext.address}
          />
        </StyledCol>
      </div>
      
    </ModalSlider>}
    
     {modalChatPermission.isOpen &&  <TemplatePermission />}
    {modalChatMembers.isOpen && <TemplateMembers />}
    {modalAddMembers.isOpen && <TemplateMembersAdd />}
    {modalChatEdit.isOpen && <TemplateEditChannel />}
    {modalPinned.isOpen && <TemplatePinnedMessages />}
    </>
  )
}

export default ChatSetting;
