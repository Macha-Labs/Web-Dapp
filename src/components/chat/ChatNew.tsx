import { helperIPFS, truncateAddress } from "@/helpers";
import usePortalChannel from "@/hooks/portal/usePortalChannel";
import usePortalChannelMembership from "@/hooks/portal/usePortalChannelMembership";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { Channel$} from "@/schema/channel";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Text,
  useToast,
  Checkbox,
  Tag,
  TagCloseButton,
  Heading,
  Switch,
  Input,
  Image,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import ModalSlider from "../modal/ModalSlider";
import IconImage from "../icons/IconImage";

const ChatNew = (props: any) => {
  const [tab, setTab] = useState("details");
  const [inputFocus, setInputFocus] = useState(0);;
  const [access, setAccess] = useState("Public");
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
    props?.hookChatChannel.remove();
    props?.hookChatChannels.load();
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
  const hookPortalChannel = usePortalChannel(null, {
    new: callbackNew,
    prompt: callbackPrompt,
  });

  /**
   *
   **/

  const hookPortalChannelMembership = usePortalChannelMembership(new Channel$('db', {}));

  /**
   *
   **/
  const handleTabs = () => {
    if (tab == "details" && access == "Public") {
      setTab("share");
      hookPortalChannel?.update(hookPortalChannelMembership?.userIds);
    } else if (tab == "details" && access == "Private") {
      setTab("private");
    }

    // if (tab == "members") {
    //   if (hookPortalChannelMembership?.users?.length) {
    //     setTab("details");
    //   } else {
    //     toast({
    //       title: "Add atleast one member",
    //       status: "error",
    //       duration: 3000,
    //       position: "bottom-right",
    //     });
    //   }
    // } else {
    //   setTab("members");
    // }
  };

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
  const templateDetails = () => {
     
        const header =        
          <Row className="hr-between v-center">
            {/* <Button
                onClick={handleTabs}
                variant="state_default_hover"
                size="sm"
              >
                Back
              </Button> */}
            <Text>Create New Channel</Text>
            {/* <Button variant="state_default_hover" size="sm"> */}
            <IconImage
              onClick={handleTabs}
              path="IconDarkCross.png"
              // styled={{ className: "m-l-1" }}
            />
            {/* </Button> */}
            {/* <Button
                onClick={() => {
                  hookPortalChannel?.update(
                    hookPortalChannelMembership?.userIds
                  );
                }}
                variant="state-brand"
                size="sm"
                isLoading={hookPortalChannel?.isLoading}
              >
                Create New
              </Button> */}
          </Row>      
        const body = 
          <Col className="p-2">
            <Row className="hr-center w-100 m-b-1">
              <Avatar size="2xl" name={data[0].value} />
            </Row>
            <Input
              ref={inputFocus == 0 ? (input) => input && input.focus() : null}
              onFocus={() => setInputFocus(0)}
              placeholder={data[0].label}
              value={data[0].value}
              onChange={(e) => data[0].onChange(e.target.value)}
              className="m-b-0-5"
            />
            <Input
              ref={inputFocus == 1 ? (input) => input && input.focus() : null}
              onFocus={() => setInputFocus(1)}
              placeholder={data[1].label}
              value={data[1].value}
              onChange={(e) => data[1].onChange(e.target.value)}
              className="m-b-0-5"
            />
            {hookPortalChannelMembership?.users?.length ? (
              <Col className="flex-wrap m-b-1">
                <Heading as="h6" fontSize="md" className="m-b-0-5">
                  Add Members
                </Heading>
                <Row className="flex-wrap">
                  {hookPortalChannelMembership?.users?.map((item: any) => {
                    return (
                      <Tag className="m-r-0-5 m-b-0-5" key={`label-${item}`}>
                        <Row className="vr-center p-0-5">
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
                        <TagCloseButton
                          onClick={() => {
                            hookPortalChannelMembership.handleCheckedUsers(
                              item
                            );
                          }}
                        />
                      </Tag>
                    );
                  })}
                </Row>
              </Col>
            ) : (
              <></>
            )}
            <Col>
              <Heading as="h6" fontSize="md" className="m-b-0-5">
                Channel Access
              </Heading>
              <RadioGroup onChange={setAccess} value={access}>
                <Stack direction="column">
                  <Radio value="Public">Public</Radio>
                  <Radio value="Private">Private</Radio>
                </Stack>
              </RadioGroup>
              <Button onClick={handleTabs}>Next</Button>
            </Col>
            {/* <Col>
              <Heading as="h6" fontSize="md" className="m-b-0-5">
                Public
              </Heading>
              <Row>
                <Text>
                  Allow channel to be joined and discoverable by anyone on
                  platform irrespective of your network
                </Text>
                <Switch></Switch>
              </Row>
            </Col> */}
          </Col>        
    return ({header:header , body:body});
  };
  const TemplateShare = () => {
    return (
      <>
        <LayoutCardPannel
          header={
            <Row className="d-flex justify-content-center align-items-center">
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "m-r-1" }}
              />
              <Text>Channel Created </Text>
            </Row>
          }
        >
          <Col className="d-flex align-items-center flex-column">
            <Text>Share Channel</Text>
            <Row>
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "m-r-1" }}
              />
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "m-r-1" }}
              />
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "m-r-1" }}
              />
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "" }}
              />
            </Row>
            <Text>or</Text>
            <Text>Copy and share link to invite people</Text>            
          </Col>
        </LayoutCardPannel>
      </>
    );
  };
  const templateAccess = () => {
    const header=
            <Row className="d-flex justify-content-between align-items-center">
              <Text>Manage Access </Text>
              <IconImage
                onClick={handleTabs}
                path="IconDarkCross.png"
                style={{ className: "" }}
              />
            </Row>
          
          const body = (
            <>
              <Text>Who can join the channel?</Text>
              <CheckboxGroup colorScheme="blue">
                <Stack spacing={[5]} direction={"column"} className=" mt-2">
                  <Box
                    className="d-flex justify-content-between p-2"
                    border="1px"
                    borderRadius="md"
                    borderColor="gray.700"
                  >
                    <label htmlFor="checkbox1">
                      <Row className="align-items-center">
                        <IconImage
                          onClick={handleTabs}
                          path="IconDarkCross.png"
                          style={{ className: "m-r-1" }}
                        />
                        <Text>Only my followers</Text>
                      </Row>
                    </label>
                    <Checkbox id="checkbox1" value="" />
                  </Box>
                  <Box
                    className="d-flex justify-content-between p-2"
                    border="1px"
                    borderRadius="md"
                    borderColor="gray.700"
                  >
                    <label htmlFor="checkbox2">
                      <Row className="align-items-center">
                        <IconImage
                          onClick={handleTabs}
                          path="IconDarkCross.png"
                          style={{ className: "m-r-1" }}
                        />
                        <Text>Address I will add</Text>
                      </Row>
                    </label>
                    <Checkbox id="checkbox2" value="" />
                  </Box>
                  <Box
                    className="d-flex justify-content-between p-2"
                    border="1px"
                    borderRadius="md"
                    borderColor="gray.700"
                  >
                    <label htmlFor="checkbox3">
                      <Row className="align-items-center">
                        <IconImage
                          onClick={handleTabs}
                          path="IconDarkCross.png"
                          style={{ className: "m-r-1" }}
                        />
                        <Text>Lens Profile I will add</Text>
                      </Row>
                    </label>
                    <Checkbox id="checkbox3" value="" />
                  </Box>
                  <Box
                    className="d-flex justify-content-between p-2"
                    border="1px"
                    borderRadius="md"
                    borderColor="gray.700"
                  >
                    <label htmlFor="checkbox4">
                      <Row className="align-items-center">
                        <IconImage
                          onClick={handleTabs}
                          path="IconDarkCross.png"
                          style={{ className: "m-r-1" }}
                        />
                        <Text>Who own an NFT</Text>
                      </Row>
                    </label>
                    <Checkbox id="checkbox4" value="" />
                  </Box>
                </Stack>
              </CheckboxGroup>
              <Row className="mt-3">
                <Text>
                  Do you want all these conditions to be satisfied to join the
                  channel
                </Text>
                <Switch />
              </Row>
              <Row className="justify-content-around">
                <Button width="150px" size="lg">
                  Skip
                </Button>
                <Button width="150px" size="lg" variant="state_brand">
                  Continue
                </Button>
              </Row>
            </>
          );
            
    return ({header:header,body:body}
    );
  };
  const templateMembers = () => {
     const header=
            <Row className="hr-between v-center">
              <Text>New Channel</Text>
              <Button onClick={handleTabs} variant="state-brand" size="sm">
               Next
              </Button>
            </Row>
    const body=
          hookPortalChannelMembership?.followers.length ? (
            hookPortalChannelMembership?.followers?.map(
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
                // </StyledCard>
            //   );
            // }
            //         <Checkbox
            //           isChecked={hookPortalChannelMembership?.userIds?.includes(
            //             String(item?.lens?.ownedBy?.toLowerCase())
            //           )}
            //           onChange={() =>
            //             hookPortalChannelMembership.handleCheckedUsers(item)
            //           }
            //         />
                  // </Row>
                );
              }
            )
          ) : (
            <Col className="flex-hr-vr-center h-100">
              <Image src="/assets/nopost.png" className="w-40" />
              <Heading className="" size="xs">
                You do not have any followers to add
              </Heading>
            </Col>
          )

    return {body: body, header: header}
  };


  return (
    <>
      <ModalSlider event={props.modal} size="sm" header={tab == 'members' ? templateMembers().header : templateDetails().header}>
      {tab == 'members' ? templateMembers().body : templateDetails().body}
    </ModalSlider>
    </>
  );
};
export default ChatNew;
