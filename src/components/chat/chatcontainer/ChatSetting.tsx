import ModalSlider from "@/components/modal/ModalSlider";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { Col } from "@/styles/StyledComponents";
import { Heading, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import ChatEdit from "../ChatEdit";
import ChatMembers from "./ChatMembers";
import ChatPermissions from "./ChatPermissions";

function ChatSetting(props: any) {
  const toast = useToast();
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
        hookPortalChannel?.muteChannel(props.hookChannel.channel);
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
          props.hookChannel?.channel?.createdBy === props.authProvider.address,
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
          props.hookChannel?.channel?.createdBy === props.authProvider.address,
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
          props.hookChannel?.channel?.createdBy === props.authProvider.address,
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
        // console.log(props);
        hookPortalChannel?.deleteChannel(props.hookChannel.channel);
      },
    },
  ];
  const remove = () => {
    toast({
      title: "Channel Deleted",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    props.modalSettings.onClose();
  };
  const mute = () => {
    toast({
      title: "Channel Muted",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    props.modalSettings.onClose();
  };

  const hookPortalChannel = usePortalChannel(
    props.hookChannel.channel.id,
    {delete:remove, mute:mute}
  );
  const modalChatPermission = useDisclosure();
  const modalChatMembers = useDisclosure();
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
        <ChatMembers hookChannel={props.hookChannel} />
      </ModalSlider>
    );
  };
  const TemplateEditChannel = () => {
    return (
      <ModalSlider size={"lg"} event={modalChatEdit}>
        <ChatEdit hookChannel={props.hookChannel} modal={modalChatEdit} />
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
            channelAdmin={props.hookChannel.channel.createdBy}
            userId={props.authProvider.address}
          />
          <LayoutOptions
            options={chatOptions2}
            style={{ className: "m-b-1" }}
            channelAdmin={props.hookChannel.channel.createdBy}
            userId={props.authProvider.address}
          />
          <LayoutOptions
            options={chatOptions3}
            channelAdmin={props.hookChannel.channel.createdBy}
            userId={props.authProvider.address}
          />
        </Col>
      </div>
      <TemplatePermission />
      <TemplateMembers />
      <TemplateEditChannel />
    </>
  );
}

export default ChatSetting;
