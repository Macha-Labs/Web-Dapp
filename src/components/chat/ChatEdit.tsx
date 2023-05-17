import React, { useContext, useState } from "react";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import usePortalChannel from "../../hooks/portal/usePortalChannel";
import {
  Avatar,
  Button,
  Text,
  Switch,
  useDisclosure,
  useToast,
  Heading,
  Radio,
} from "@chakra-ui/react";
import { StyledCol, StyledRow, StyledCard } from "@/styles/StyledComponents";
import ModalSlider from "../modal/ModalSlider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { ChatContext } from "@/providers/ChatProvider";

const ChatEdit = (props: any) => {
  /**
   * @description
   *
   *
   **/
  const chatContext = useContext(ChatContext)
  const $channel = useChatChannelStore((state: any) => state.channel);
  const toast = useToast();

  const handleToggle = () => {
    hookPortalChannel?.setChannel({
      ...hookPortalChannel?.channel,
      private: !hookPortalChannel?.channel?.private,
    });
  };
  /**
   * @description callbacks
   *
   *
   **/
  const callBack = () => {
    toast({
      title: "Channel Details updated successfully",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });

    chatContext?.hookChannel?.reload();
    chatContext?.hookChannelList?.load();
    props.modal.onClose();
  };

  const callBackPrompt = (message: any) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "bottom-right",
    });
  };

  /**
   * @description
   *
   *
   **/
  const [profileImage, setProfileImage] = useState(null);

  /**
   * @description
   *
   *
   **/
  const hookPortalChannel = usePortalChannel(
    $channel,
    { edit: callBack, prompt: callBackPrompt }
  );

  /**
   * @description
   *
   *
   **/
  const handleSelectClick = () => {};
  const modalAddMembers = useDisclosure();

  /**
   * @description
   *
   *
   **/
  const data = [
    {
      label: "Name",
      value: hookPortalChannel?.channel?.name,
      onChange: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          name: text,
        });
      },
    },
    {
      label: "Description",
      value: hookPortalChannel?.channel?.description,
      onChange: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          description: text,
        });
      },
    },
  ];

  /**
   * @description
   *
   *
   **/
  return (
    <ModalSlider size="sm" event={props.modal}
    header={
      <StyledRow className="hr-between vr-center w-full">
        <Button
          size="sm"
          onClick={props.modal.onClose}
          variant="state_default_hover"
        >
          Cancel
        </Button>
        <Heading as="h6" size="sm">Edit Channel</Heading>
        <Button
          variant="state_brand"
          size="sm"
          onClick={() => {
            hookPortalChannel?.update();
          }}
          isLoading={hookPortalChannel?.isLoading}
        >
          Save
        </Button>
      </StyledRow>
    }
    >
      <>
      <StyledCol className="">
        <StyledCol className="hr-center w-full mb-2">
          {profileImage ? (
            <Avatar
              size="2xl"
              className="m-v-1"
              name={hookPortalChannel?.channel?.name}
              src={URL.createObjectURL(profileImage)}
            />
          ) : (
            <Avatar
              size="2xl"
              className="m-v-1"
              name={hookPortalChannel?.channel?.name}
            />
          )}
          <input
            type="file"
            id="galleryInput"
            accept="image/*"
            onChange={(e) => {}}
            style={{ display: "none" }}
          />
          {/* <Text fontSize={14} fontWeight={800} onClick={handleSelectClick}>
            Set New Profile Photo
          </Text> */}
        </StyledCol>
        <StyledCol>
          <Heading as="h6" size="sm" className="m-b-1">Channel Details</Heading>
          <StyledCard className="m-b-1">
            <LayoutInputs data={data} style={{ class: "m-b-1" }} />
          </StyledCard>
        </StyledCol>
        <StyledCol>
          <Heading as="h6" size="sm" className="m-b-1">Channel Access</Heading>
          <StyledCard>
          <StyledRow className="hr-between">
            <StyledCol>
              <Heading size="sm">Private</Heading>
              <Text fontSize={14}>
                Can only be accessed by members added.
              </Text>
            </StyledCol>
            <StyledCol>
              <Switch
                isChecked={hookPortalChannel?.channel?.private}                
                onChange={handleToggle}
              />
            </StyledCol>
          </StyledRow>
        </StyledCard>
        </StyledCol>
      </StyledCol>
    </>
    </ModalSlider>
  );
};

export default ChatEdit;
