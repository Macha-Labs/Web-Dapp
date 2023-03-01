import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCard from "@/layouts/LayoutCard";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { ChatContext } from "@/providers/ChatProvider";
import { Channel$ } from "@/schema/channel";
import { Col, Row } from "@/styles/StyledComponents";
import { Avatar, Button, Text, useToast, Checkbox, Tag } from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";

const ChatNew = (props: any) => {
  const chatContext = useContext(ChatContext);
  const [tab, setTab] = useState('members')

  
  /**
   *
   **/
  const toast = useToast();
  const callbackNew = () => {
    toast({
      title: "Channel Created Successfully",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
    chatContext?.streamContext?.reloadChannelList();
    props.modal.onClose();
  };

  const callbackPrompt = (message: any) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "bottom-right",
    });
  };

  /**
   *
   **/
  const hookPortalChannel = usePortalChannel(Channel$({}), {
    new: callbackNew,
    prompt: callbackPrompt,
  });

  /**
   *
   **/

  const hookPortalChannelMembership = usePortalChannelMembership(Channel$({}));
  
  /**
   *
   **/
  const handleTabs = () => {
    if (tab == 'members') {
        if (hookPortalChannelMembership?.users?.length) {
          setTab('details');
        } else {
          toast(
            {
            title: 'Add atleast one member',
            status: "error",
            duration: 3000,
            position: "bottom-right",
            }
          )
        }
    }
    else {
      setTab('members');
    }
  }

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
        <LayoutCardPannel
          header={
            <Row className="hr-between v-center">
              <Button
                onClick={handleTabs}
                variant="state_default_hover"
                size="sm"
              >Back</Button>
              <Text>New Channel</Text>
              <Button
                onClick={() => {
                  hookPortalChannel?.update(hookPortalChannelMembership?.userIds);
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
              <Avatar size="2xl" name={data[0].value} />
            </Row>
            <LayoutInputs data={data} style={{ class: "m-b-1" }} />
            <Row className="flex-wrap">
              {
                hookPortalChannelMembership?.users?.map((item: any) => { return (
                  <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                            <Row className="vr-center">
                    <Avatar
                      src={helperIPFS(item?.lens?.image)}
                      className="m-r-0-5"
                      size="sm"
                    />
                    <Text>
                      {item?.lens?.name
                        ? item?.lens?.name
                        : item?.lens?.handle
                        ? item?.lens?.handle
                        : truncateAddress(item?.lens?.ownedBy)}
                    </Text>
                  </Row>
                   </Tag> 
                )})
              }
            </Row>
          </Col>
        </LayoutCardPannel>
      </>
    );
  };

  const TemplateMembers = () => {
    return (
      <>
        <LayoutCardPannel
          header={
            <Row className="hr-between v-center">
              <Text>New Channel</Text>
              <Button
                onClick={handleTabs}
                variant="state-brand"
                size="sm"
              >
                Next
              </Button>
            </Row>
          }
        >
          {hookPortalChannelMembership?.followers?.map(
            (item: any, index: any) => {
              return (
                <Row key={`key-${item?.id}`} className="hr-between p-1">
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
                    isChecked={hookPortalChannelMembership?.userIds?.includes(
                      String(item?.lens?.ownedBy?.toLowerCase())
                    )}
                    onChange={() =>
                      hookPortalChannelMembership.handleCheckedUsers(item)
                    }
                  />
                </Row>
              );
            }
          )}
        </LayoutCardPannel>
      </>
    );
  };

  return (
<>{tab == 'members'? <TemplateMembers/> : <TemplateDetails/>}
</>
     
  );
};
export default ChatNew;
