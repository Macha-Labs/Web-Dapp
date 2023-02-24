import ModalSlider from "@/components/modal/ModalSlider";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { Col } from "@/styles/StyledComponents";
import { Heading, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import ChatEdit from "../ChatEdit";
import ChatMembers from "./ChatMembers";
import ChatMembersAdd from "./ChatMembersAdd";
import ChatPermissions from "./ChatPermissions";

function ChatSetting(props: any) {
  const toast = useToast();

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
        props.hookChat.handleSearch();
        props?.event?.onClose();
      },
    },
    {
      icon: "IconDarkMute.png",
      name: "Mute Chat",
      onPress: () => {
        hookPortalChannel?.muteChannel(props.chatContext.hookChannel.channel);
      },
    },
    {
      icon: "IconDarkUnMute.png",
      name: "UnMute Chat",
      onPress: () => {
        hookPortalChannel?.unMuteChannel(props.chatContext.hookChannel.channel);
      },
    },
    {
      icon: "IconDarkMultiselect.png",
      name: "Select Chat",
      onPress: () => {
        props.hookChat.handleMultiSelect();
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
          props.chatContext.hookChannel?.channel?.createdBy === props.authContext.address,
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
          props.chatContext.hookChannel?.channel?.createdBy === props.authContext.address,
      },
    },
    {
      icon: "IconDarkMembers.png",
      name: "Members",
      onPress: () => {
        modalChatMembers.onOpen();
      },
      condition: {
        enabled: true,
        check:
          props.chatContext.hookChannel?.channel?.createdBy === props.authContext.address,
      },
    },
  ];

  const chatOptions2 = [
    {
      icon: "IconDarkPhotos.png",
      name: "21 Photos",
      onPress: () => {},
    },
    {
      icon: "IconDarkVideos.png",
      name: "4 Videos",
      onPress: () => {},
    },
    {
      icon: "IconDarkFiles.png",
      name: "4 Files",
      onPress: () => {},
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
      icon: "IconRedDelete.png",
      onPress: () => {

      },
    },
    {
      //   icon: IconBrandClearChat,
      name: "Delete Channel",
      icon: "IconRedDelete.png",
      onPress: () => {
        hookPortalChannel?.deleteChannel(props.chatContext.hookChannel.channel);
      },
    },
  ];
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
    props.chatContext?.hookChannels?.fetchUserChannels();
    props.chatContext?.initiate(null);
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
    props.modalSettings.onClose();
  };

  /** 
    * @description
  **/
  const hookPortalChannel = usePortalChannel(props.chatContext.hookChannel.channel.id, {
    delete: callbackDelete,
    mute: callbackMute,
    unmute: callbackUnmute,
  });
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
          hookChannel={props.chatContext.hookChannel}
          modalAddMembers={modalAddMembers}
        />
      </ModalSlider>
    );
  };
  const TemplateMembersAdd = () => {
    return (
      <ModalSlider size={"md"} event={modalAddMembers}>
        <ChatMembersAdd
          hookChannel={props.chatContext.hookChannel}
          modalAddMembers={modalAddMembers}
          members={props.hookChannel.channel.raw.state.members}
        />
      </ModalSlider>
    );
  };
  const TemplateEditChannel = () => {
    return (
      <ModalSlider size={"lg"} event={modalChatEdit}>
        <ChatEdit hookChannel={props.chatContext.hookChannel} modal={modalChatEdit} />
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
            channelAdmin={props.chatContext.hookChannel.channel.createdBy}
            channelRawData={props.chatContext.hookChannel.channel.raw}
            userId={props.authContext.address}
          />
          <LayoutOptions
            options={chatOptions2}
            style={{ className: "m-b-1" }}
            channelAdmin={props.chatContext.hookChannel.channel.createdBy}
            channelRawData={props.chatContext.hookChannel.channel.raw}
            userId={props.authContext.address}
          />
          <LayoutOptions
            options={chatOptions3}
            channelAdmin={props.chatContext.hookChannel.channel.createdBy}
            channelRawData={props.chatContext.hookChannel.channel.raw}
            userId={props.authContext.address}
          />
        </Col>
      </div>
      <TemplatePermission />
      <TemplateMembers />
      <TemplateMembersAdd />
      <TemplateEditChannel />
    </>
  );
}

export default ChatSetting;
