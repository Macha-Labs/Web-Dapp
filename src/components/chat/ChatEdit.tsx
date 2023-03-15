import React, { useContext, useState } from "react";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import usePortalChannel from "../../hooks/portal/usePortalChannel";
import {
  Avatar,
  Button,
  Text,
  Icon,
  Switch,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { Col, Row } from "@/styles/StyledComponents";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { ChatContext } from "@/providers/ChatProvider";

const ChatEdit = (props: any) => {
  /**
   * @description
   *
   *
   **/
  const toast = useToast();
  const chatContext = useContext(ChatContext);
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

    chatContext?.streamContext?.reloadChannel();
    // chatContext?.streamContext?.reloadChannelList();
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
    chatContext?.hookChannel?.channel,
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
    <LayoutCardPannel
      header={
        <Row className="hr-between w-full">
          <Button
            size="sm"
            onClick={props.modal.onClose}
            variant="state_default_hover"
          >
            Cancel
          </Button>
          <Text size={"sm"}>Edit Channel</Text>
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
        </Row>
      }
    >
      <Col className="p-3">
        <Col className="hr-center w-full">
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
        </Col>

        <LayoutInputs data={data} style={{ class: "m-b-1" }} />
        <Row className="hr-between">
          <Col>
            <Heading size="sm">Allow channel to be public</Heading>
            <Text>
              Please note public channels can be joined by anyone with the link
              and should not be used for a small group conversation.
            </Text>
          </Col>
          <Switch
            colorScheme="emerald"
            className="m-l-1"
            isChecked={hookPortalChannel?.channel?.private}
            onChange={handleToggle}
          />
        </Row>
      </Col>
    </LayoutCardPannel>
  );
};

export default ChatEdit;
