import usePortalChannel from "@/hooks/portal/usePortalChannel";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { ChatContext } from "@/providers/ChatProvider";
import { Col, Row } from "@/styles/StyledComponents";
import { Avatar, Button, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";

const ChatNew = (props: any) => {
  const chatContext = useContext(ChatContext);

  /**
   * 
   **/
  const toast = useToast();
  const callbackNew = ()=>{
    toast({
      title: "Channel Created Successfully",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.hookChannels?.fetchUserChannels();
    props.modal.onClose();
  }

  const callbackPrompt = (message: any) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "bottom-right",
    });
  }
  
  /**
   * 
   **/
  const hookPortalChannel = usePortalChannel(
    props?.hookChannel?.channel,
    {new:callbackNew, prompt: callbackPrompt}
  );

  /**
   * 
   **/
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

  /**
   * 
   **/
  

  return (
    <LayoutCardPannel
      header={
        <Row className="hr-between v-center">
          <Text>New Channel</Text>
          <Button
            onClick={() => {
              hookPortalChannel?.update();
            }}
            variant="state-brand"
            size="sm"
            isLoading={hookPortalChannel?.isLoading}
          >
            Create New
          </Button>
        </Row>
      }
    >
      <Col className="p-2">
        <Row className="hr-center w-100 m-b-1">
          <Avatar size="2xl" name={data[0].value}/>
        </Row>
        <LayoutInputs data={data} style={{ class: "m-b-1" }} />
      </Col>
    </LayoutCardPannel>
  );
};
export default ChatNew; 
