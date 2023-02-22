import React, { useContext, useDebugValue } from "react";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import usePortalChannel from "../../hooks/portal/usePortalChannel";
import {
  Avatar,
  Button,
  Text,
  Icon,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { Col, Row } from "@/styles/StyledComponents";
import LayoutCard from "@/layouts/LayoutCard";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";

const ChatEdit = (props: any) => {
  const hookPortalChannel = usePortalChannel(props.hookChannel?.channel);
  const modalAddMembers = useDisclosure();
  const data = [
    {
      label: "Name",
      value: hookPortalChannel?.channel?.name,
      onChangeText: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          name: text,
        });
      },
    },
    {
      label: "Description",
      value: hookPortalChannel?.channel?.description,
      onChangeText: (text: any) => {
        hookPortalChannel?.setChannel({
          ...hookPortalChannel?.channel,
          description: text,
        });
      },
    },
  ];
  return (
    <LayoutCardPannel
      header={
        <Row className="hr-between w-full">
          <Button size="sm" onClick={modalAddMembers.onClose}>
            Cancel
          </Button>
          <Text size={"sm"}>Edit Channel</Text>
          <Button
            variant="state_brand"
            size="sm"
            onClick={() => {
              hookPortalChannel?.update();
            }}
          >
            Save
          </Button>
        </Row>
      }
    >
      <Col className="hr-center w-full p-3">
        <Avatar
          size="2xl"
          className="m-v-1"
          name={hookPortalChannel?.channel?.name}
        />
        <Text fontSize={14} fontWeight={800}>
          Set New Profile Photo
        </Text>
      </Col>

      <Col className="hr-center w-full m-v-1">
        <Row>
          <Icon></Icon>
          <Text fontSize={16} fontWeight={800}>
            Select From Gallery
          </Text>
        </Row>
        <Row>
          <Icon></Icon>
          <Text fontSize={16} fontWeight={800}>
            Select From Wallet
          </Text>
        </Row>
      </Col>
      <LayoutInputs data={data} style={{ class: "m-b-1" }} />
      <Row>
        <Text>Allow Gating</Text>
        <Switch colorScheme="emerald" />
      </Row>
    </LayoutCardPannel>
  );
};

export default ChatEdit;
