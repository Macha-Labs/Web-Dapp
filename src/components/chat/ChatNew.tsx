import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { ChatContext } from "@/providers/ChatProvider";
import { Channel$ } from "@/schema/channel";
import { Col, Row } from "@/styles/StyledComponents";
import { Avatar, Button, Text, useToast, Checkbox } from "@chakra-ui/react";
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
    Channel$({}),
    {new:callbackNew, prompt: callbackPrompt}
  );

  /**
   * 
   **/

   const hookPortalChannelMembership = usePortalChannelMembership(
    Channel$({})
  );

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
   * 
   **/
  const TemplateDetails = () => {
    return (
      <>
            <Col className="p-2">
        <Row className="hr-center w-100 m-b-1">
          <Avatar size="2xl" name={data[0].value}/>
        </Row>
        <LayoutInputs data={data} style={{ class: "m-b-1" }} />
      </Col>
      </>
    )
  }

  const TemplateMembers = () => {
    return (
      <>
      {hookPortalChannelMembership?.followers?.map((item: any, index: any) => {
        return (
          <Row key={item?.id} className="hr-between p-1">
            <Row className="vr-center">
              <Avatar
                src={helperIPFS(item?.lens?.image)}
                className="m-r-0-5"
              />
              <Text>
                {item?.lens?.name
                  ? item?.lens?.name
                  : item?.lens?.handle
                  ? item?.lens?.handle
                  : truncateAddress(item?.lens?.ownedBy)}
              </Text>
            </Row>

            <Checkbox
              value=""
              onChange={() =>
                {hookPortalChannelMembership.handleCheckedUsers(item)}
              }
            />
          </Row>
        );
      })}
      </>
    )
  }

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
    {/* <TemplateDetails /> */}
    <TemplateMembers/>
    </LayoutCardPannel>
  );
};
export default ChatNew; 
