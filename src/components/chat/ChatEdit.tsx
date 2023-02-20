import React, { useContext } from "react";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import usePortalChannel from "../../hooks/portal/usePortalChannel";
import { Avatar, Button, Text, Icon, Switch } from "@chakra-ui/react";
import { Col, Row } from "@/styles/StyledComponents";

const ChatEdit = (props: any) => {
  const hookPortalChannel = usePortalChannel(props.route.params?.channel);

  return (
    <>
      <Row>
        <Text fontSize={18} fontWeight={800} color={"white"}>
          Edit Channel
        </Text>

        <Button
          onClick={() => {
            hookPortalChannel?.update();
          }}
        >
          Save
        </Button>
      </Row>
      <Avatar size="2xl" />
      <Text fontSize={14} fontWeight={800} mt={2}>
        Set New Profile Photo
      </Text>

      <Col>
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
      <LayoutInputs
        data={[
          {
            placeholder: "Name",
            value: hookPortalChannel?.channel?.name,
            onChangeText: (text: any) => {
              hookPortalChannel?.setChannel({
                ...hookPortalChannel?.channel,
                name: text,
              });
            },
          },
          {
            placeholder: "Description",
            value: hookPortalChannel?.channel?.description,
            onChangeText: (text: any) => {
              hookPortalChannel?.setChannel({
                ...hookPortalChannel?.channel,
                description: text,
              });
            },
          },
        ]}
      />
      <Row>
        <Text>Allow Gating</Text>
        <Switch colorScheme="emerald" />
      </Row>
    </>
  );
};

export default ChatEdit;
