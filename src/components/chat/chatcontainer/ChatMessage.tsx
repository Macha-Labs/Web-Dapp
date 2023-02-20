import IconImage from "@/components/icons/IconImage";
import InputAction from "@/components/input/InputAction";
import { truncateAddress } from "@/helpers";
import LayoutFilePreview from "@/layouts/chat/LayoutFilePreview";
import LayoutImagePreview from "@/layouts/chat/LayoutImagePreview";
import LayoutLinkPreview from "@/layouts/chat/LayoutLinkPreview";
import {
  Col,
  Row,
  StyledConversation,
  StyledIcon,
  TextareaDiv,
} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";

const ChatMessage = (props: any) => {
  const min_textarea_height = 45;

  const templateAttachment = (attachment: any) => {
    if (attachment?.og_scrape_url) {
      return <LayoutLinkPreview attachment={attachment} />;
    } else if (attachment?.type == "image") {
      return <LayoutImagePreview attachment={attachment} />;
    } else if (
      attachment?.type == "text" ||
      attachment?.type == "application"
    ) {
      return <LayoutFilePreview attachment={attachment} />;
    }
  };

  const TemplateActions = () => {
    
    return (
      <Popover placement="top-start">
        <PopoverTrigger>
          <IconImage path="IconDarkMenu.png" />
        </PopoverTrigger>
        <PopoverContent className="m-b-1">
          <PopoverBody>
            <Col className="text-start">
              {props.message?.user?.id == props?.authContext?.address && <Button
                variant="transparent"
                size="md"
                className="text-start"
                rightIcon={<IconImage path="IconDarkFiles.png" />}
              >
                <Row
                  className="hr-between w-100"
                  onClick={() => {
                    props.hookChat.handleEdit(props.message);
                  }}
                >
                  Edit
                </Row>
              </Button>
              }
              
              <Button
                variant="transparent"
                size="md"
                className="text-start"
                rightIcon={<IconImage path="IconDarkFiles.png" />}
              >
                <Row
                  className="hr-between w-100"
                  onClick={() => {
                    props.hookChat.handleReply(props.message);
                  }}
                >
                  Reply
                </Row>
              </Button>
              <Button
                variant="transparent"
                size="md"
                className="text-start"
                rightIcon={<IconImage path="IconDarkFiles.png" />}
              >
                <Row
                  className="hr-between w-100"
                  onClick={() => {
                    if (props.message?.pinned) {
                      props.hookChat.unPinMessage(props.message);
                    } else {
                      props.hookChat.pinMessage(props.message);
                    }
                  }}
                >
                  {props.message?.pinned ? "Unpin Message" : "Pin Message"}
                </Row>
              </Button>
              {props.message?.user?.id == props?.authContext?.address && (
                <Button
                  variant="transparent"
                  size="md"
                  className="text-start"
                  rightIcon={<IconImage path="IconDarkFiles.png" />}
                  onClick={() => {
                    props.hookChat.deleteMessage(props.message);
                  }}
                >
                  <Row className="hr-between w-100">Delete Message</Row>
                </Button>
              )}
            </Col>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  const TemplateReply = () => {
    return (
      <>
        {
        props?.message?.quoted_message && <Col className="m-b-1 m-l-1">
        <Heading as="h6" size="xs" className="m-b-0-5">Reply To</Heading>
        <Row>
          <Avatar size="sm" src={props?.message?.quoted_message?.user?.lensImage} className="m-r-0-5"/>
          <Text fontSize="sm">
            {props.message?.quoted_message?.user?.lensUsername ||
              props.message?.quoted_message?.user?.lensHandle ||
              truncateAddress(props.message?.quoted_message?.user?.id)}
          </Text>
        </Row>
        <Text>{props?.message.quoted_message?.text}</Text>
      </Col>
      }
      </>
    )
  }

  return (
    <StyledConversation>
      <TemplateReply />
      <Row className="w-100">
        <Col>
          <Row>
            {props.hookChat?.actionMessage?.action === "MULTISELECT" && (
              <Checkbox defaultChecked className="m-r-0-5"></Checkbox>
            )}

            <Avatar
              src={props.message?.user?.lensImage}
              className="m-r-0-5"
            ></Avatar>
          </Row>
        </Col>
        <Col className={(props.authContext?.address == props?.message?.user?.id )? "active message w-100": "message w-100"} style={{ color: "#ffffff" }}>
          <Text fontSize="sm">
            {props.message?.user?.lensUsername ||
              props.message?.user?.lensHandle ||
              truncateAddress(props.message?.user?.id)}
          </Text>
          

          {(props?.hookChat?.actionMessage?.action == 'EDIT' && props?.hookChat?.actionMessage?.item?.id == props?.message?.id) ?
          (
            <InputAction style={{className: "w-100 vr-center m-t-0-5"}}
              actions={
              [
                <Button size="xs" className="m-l-0-5" variant="state_brand" onClick={props.hookChat?.editMessage}>Update</Button>,
                <Button size="xs" className="m-l-0-5" variant="state_brand" onClick={props.hookChat?.handleEditClose}>Cancel</Button>
              ]
            }
              >
              <Textarea
                  ref={props.hookChat?.editMessageRef}
                  className="inputElement"
                  variant="unstyled"
                  style={{ minHeight: min_textarea_height }}
                  placeholder={props.message?.text}
                  height="auto"
                  rows={1}
              />
          </InputAction>
          ): 
          (
            <TextareaDiv dangerouslySetInnerHTML={{ __html: props.message?.html }} />
          )}

          {props?.message?.attachments.map((item: any, index: number) => {
            return templateAttachment(item);
          })}
        </Col>
        <Row className="w-100 action">
          <IconImage
            path="IconDarkEmoji.png"
            style={{ className: "m-r-0-5" }}
          />

          <TemplateActions />
        </Row>
      </Row>
    </StyledConversation>
  );
};

export default ChatMessage;
