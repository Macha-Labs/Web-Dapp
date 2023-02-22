import IconEmoji from "@/components/icons/IconEmoji";
import IconImage from "@/components/icons/IconImage";
import InputAction from "@/components/input/InputAction";
import Pop from "@/components/pop/Pop";
import { truncateAddress } from "@/helpers";
import LayoutFilePreview from "@/layouts/chat/LayoutFilePreview";
import LayoutImagePreview from "@/layouts/chat/LayoutImagePreview";
import LayoutLinkPreview from "@/layouts/chat/LayoutLinkPreview";
import {
  Col,
  Row,
  StyledConversation,
  TextareaDiv,
} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import emoji from "../../../data/emoji.json";

const ChatMessage = (props: any) => {
  const min_textarea_height = 45;
  const toast = useToast();

  const templateAttachment = (attachment: any) => {
    if (attachment?.og_scrape_url) {
      return <LayoutLinkPreview key={attachment?.id} attachment={attachment} />;
    } else if (attachment?.type == "image") {
      return (
        <LayoutImagePreview key={attachment?.id} attachment={attachment} />
      );
    } else if (
      attachment?.type == "text" ||
      attachment?.type == "application"
    ) {
      return <LayoutFilePreview key={attachment?.id} attachment={attachment} />;
    }
  };

  const TemplateReactions = () => {
    return (
      <Pop
        placement={"left-start"}
        trigger={
          <IconImage
            path="IconDarkEmoji.png"
            style={{ className: "m-r-0-5" }}
          />
        }
      >
        <Row className="vr-center">
          <IconEmoji
            style={{ className: "m-r-0-5" }}
            onClick={() => {
              props?.hookChat?.handleReaction(
                { type: "smile" },
                props?.message
              );
            }}
          >
            😀
          </IconEmoji>
          <IconEmoji
            style={{ className: "m-r-0-5" }}
            onClick={() => {
              props?.hookChat?.handleReaction({ type: "wave" }, props?.message);
            }}
          >
            👋
          </IconEmoji>
          <IconEmoji
            style={{ className: "m-r-0-5" }}
            onClick={() => {
              props?.hookChat?.handleReaction({ type: "good" }, props?.message);
            }}
          >
            👌
          </IconEmoji>
          <IconEmoji
            style={{ className: "m-r-0-5" }}
            onClick={() => {
              props?.hookChat?.handleReaction({ type: "like" }, props?.message);
            }}
          >
            👍
          </IconEmoji>
        </Row>
      </Pop>
    );
  };

  const TemplateActions = () => {
    return (
      <Pop
        placement={"top-end"}
        trigger={<IconImage path="IconDarkMenu.png" />}
      >
        <Col className="text-start">
          {props.message?.user?.id == props?.authContext?.address && (
            <Button
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
          )}

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
                navigator.clipboard.writeText(props.message?.text);
                toast({
                  title: "Copied to clipboard",
                  status: "success",
                  duration: 3000,
                  position: "bottom-right",
                });
              }}
            >
              Copy
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
      </Pop>
    );
  };

  const TemplateReply = () => {
    return (
      <>
        {props?.message?.quoted_message && (
          <Col className="m-b-1 m-l-1">
            <Heading as="h6" size="xs" className="m-b-0-5">
              Reply To
            </Heading>
            <Row>
              <Avatar
                size="sm"
                src={props?.message?.quoted_message?.user?.lensImage}
                className="m-r-0-5"
              />
              <Text fontSize="sm">
                {props.message?.quoted_message?.user?.lensUsername ||
                  props.message?.quoted_message?.user?.lensHandle ||
                  truncateAddress(props.message?.quoted_message?.user?.id)}
              </Text>
            </Row>
            <Text>{props?.message.quoted_message?.text}</Text>
          </Col>
        )}
      </>
    );
  };

  return (
    <StyledConversation>
      <TemplateReply />
      <Row className="w-100">
        <Col>
          <Row>
            {props.hookChat?.actionMessage?.action === "MULTISELECT" && (
              <Checkbox defaultChecked className="m-r-0-5" />
            )}

            <Avatar
              src={props.message?.user?.lensImage}
              className="m-r-0-5"
            ></Avatar>
          </Row>
        </Col>
        <Col
          className={
            props.authContext?.address == props?.message?.user?.id
              ? "active message w-100"
              : "message w-100"
          }
          style={{ color: "#ffffff" }}
        >
          <Text fontSize="sm" className="heading">
            {props.message?.user?.lensUsername ||
              props.message?.user?.lensHandle ||
              truncateAddress(props.message?.user?.id)}
          </Text>

          {props?.hookChat?.actionMessage?.action == "EDIT" &&
          props?.hookChat?.actionMessage?.item?.id == props?.message?.id ? (
            <InputAction
              style={{ className: "w-100 vr-center m-t-0-5" }}
              actions={[
                <Button
                  key={props?.message?.id}
                  size="xs"
                  className="m-l-0-5"
                  variant="state_brand"
                  onClick={props.hookChat?.editMessage}
                >
                  Update
                </Button>,
                <Button
                  key={props?.message?.id}
                  size="xs"
                  className="m-l-0-5"
                  variant="state_brand"
                  onClick={props.hookChat?.handleEditClose}
                >
                  Cancel
                </Button>,
              ]}
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
          ) : (
            <TextareaDiv
              dangerouslySetInnerHTML={{ __html: props.message?.html }}
            />
          )}

          {props?.message?.attachments ? (props?.message?.attachments?.map((item: any, index: number) => {
            return templateAttachment(item);
          })) : (<></>)}

          {props?.message?.reaction_scores && (
            <Row className="vr-center">
              {Object.keys(props?.message.reaction_scores).length > 0 &&
                Object.keys(props.message.reaction_scores).map((item: any) => {
                  return (
                    <>
                      <Button
                        className="w-content m-r-0-5"
                        size="xs"
                        variant="state_brand"
                        onClick={() => {
                          props?.hookChat?.handleReaction(
                            { type: item },
                            props?.message
                          );
                        }}
                      >
                        {emoji[item as keyof typeof emoji]}{" "}
                        {props?.message?.reaction_scores[item]}
                      </Button>
                    </>
                  );
                })}
            </Row>
          )}
        </Col>
        <Row className="w-100 action">
          <TemplateReactions />

          <TemplateActions />
        </Row>
      </Row>
    </StyledConversation>
  );
};

export default ChatMessage;
