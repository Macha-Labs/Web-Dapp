import IconEmoji from "@/_ui/icons/IconEmoji";
import IconImage from "@/_ui/icons/IconImage";
import InputAction from "@/_ui/input/InputAction";
import PopoverNative from "@/_ui/popover/PopoverNative";
import { truncateAddress } from "@/helpers";
import useOnScreen from "@/hooks/other/useOnScreen";
import LayoutFilePreview from "@/layouts/chat/LayoutFilePreview";
import LayoutImagePreview from "@/layouts/chat/LayoutImagePreview";
import LayoutLinkPreview from "@/layouts/chat/LayoutLinkPreview";
import { AuthContext } from "@/providers/AuthProvider";
import {
  StyledCol,
  StyledRow,
  StyledConversation,
  TextareaDiv,
} from "@/styles/StyledComponents";
import {
  Avatar,
  Button,
  Checkbox,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import emoji from "../../../data/emoji.json";

const ChatMessage = (props: any) => {
  const authContext = useContext(AuthContext);
  const min_textarea_height = 45;
  const toast = useToast();
  const date = new Date(props.message.created_at);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const chatRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(chatRef);

  const callbacks = {
    pin: () => {},
  };

  useEffect(() => {
    if (isIntersecting && props?.handleDateTag) {
      props?.handleDateTag(props?.message.created_at);
    }
  }, [isIntersecting]);

  const actionsData = [
    {
      name: "Edit Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage slug="IconDarkEdit.png" />,
      onClick: () => {
        props.hookChat.handleEdit(props.message);
      },
      condition: props.message?.user?.id == props?.authContext?.address,
    },
    {
      name: "Reply Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage slug="IconDarkReply.png" />,
      onClick: () => {
        props.hookChat.handleReply(props.message);
      },
      condition: true,
    },
    {
      name: "Copy Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage slug="IconDarkFiles.png" />,
      onClick: () => {
        navigator.clipboard.writeText(props.message?.text);
        toast({
          title: "Copied to clipboard",
          status: "success",
          duration: 3000,
          position: "bottom-right",
        });
      },
      condition: true,
    },
    {
      name: props?.message?.pinned ? "Unpin Message" : "Pin Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage slug="IconDarkPinned.png" />,
      onClick: () => {
        if (props.message?.pinned) {
          props.hookChat.unPinMessage(props.message);
        } else {
          props.hookChat.pinMessage(props.message);
        }
      },
      condition: true,
    },
    {
      name: "Delete Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage slug="IconRedDelete.png" />,
      onClick: () => {
        props.hookChat.deleteMessage(props.message);
      },
      condition: props.message?.user?.id == props?.authContext?.address,
    },
  ];

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

  const handleReplyToView = (id: any) => {
    props.executeScroll(id);
  };

  const templateMessageStream = () => {
    return (
      <>
        <Avatar
          onClick={() => props?.handleSelectedUser(props.message?.user)}
          src={props.message?.user?.lensImage}
          className="m-r-0-5"
          size="sm"
          name={
            props.message?.user?.lensUsername ||
            props.message?.user?.lensHandle ||
            truncateAddress(props.message?.createdBy)
          }
        ></Avatar>
        <StyledCol
          className={
            props.authContext?.address.toLowerCase() == props?.message?.user?.id
              ? "active message"
              : "message"
          }
          style={{
            color: "#ffffff",
            maxWidth: `${props.maxw == "100" ? "100%" : "50%"}`,
          }}
        >
          <TemplateReply />
          <StyledRow className="hr-between">
            {props?.channel?.source == "xmtp" ? (
              <Text fontSize="sm" className="heading">
                {props.message?.createdBy == authContext?.address
                  ? props?.channel?.name
                  : authContext?.user?.lens?.name}
              </Text>
            ) : (
              <Text fontSize="sm" className="heading">
                {props.message?.user?.lensName ||
                  props.message?.user?.lensUsername ||
                  props.message?.user?.lensHandle ||
                  truncateAddress(props.message?.createdBy)}
              </Text>
            )}
            <StyledRow className="vr-center">
              {props?.message.pinned && (
                <IconImage slug="IconDarkPinned.png" size="2xs" />
              )}
              <Text
                style={{ alignSelf: "flex-end" }}
                fontSize="12"
                className="m-l-0-5"
              >
                {time}
              </Text>
            </StyledRow>
          </StyledRow>

          {props?.hookChat?.actionMessage?.action == "EDIT" &&
          props?.hookChat?.actionMessage?.item?.id == props?.message?.id ? (
            <InputAction
              style={{ className: "w-100 vr-center m-t-0- 5" }}
              actions={[
                <Button
                  size="xs"
                  className="m-l-0-5"
                  variant="state_brand"
                  onClick={() => props.hookChat?.editMessage()}
                  key={`e-${props?.message?.id}`}
                >
                  Update
                </Button>,
                <Button
                  key={`e-${props?.message?.id}`}
                  size="xs"
                  className="m-l-0-5"
                  variant="state_default_hover"
                  onClick={props.hookChat?.handleEditClose}
                >
                  Cancel
                </Button>,
              ]}
            >
              <Textarea
                ref={props.hookChat?.editMessageRef}
                className="inputElement"
                defaultValue={props.message?.text}
                variant="unstyled"
                style={{ minHeight: min_textarea_height }}
                height="auto"
                rows={1}
              />
            </InputAction>
          ) : (
            // The text message is being set here. TextareaDiv is directly setting the html to the div.
            <TextareaDiv
              dangerouslySetInnerHTML={{ __html: props.message?.text }}
            />
          )}
          {props?.message?.attachments ? (
            props?.message?.attachments?.map((item: any, index: number) => {
              return templateAttachment(item);
            })
          ) : (
            <></>
          )}

          {props?.message?.reaction_scores && (
            <StyledRow className="vr-center">
              {Object.keys(props?.message.reaction_scores).length > 0 &&
                Object.keys(props.message.reaction_scores).map(
                  (item: any, i: any) => {
                    return (
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
                        key={`f-${props?.message?.id}-${i}`}
                      >
                        {emoji[item as keyof typeof emoji]}{" "}
                        {props?.message?.reaction_scores[item]}
                      </Button>
                    );
                  }
                )}
            </StyledRow>
          )}
        </StyledCol>
      </>
    );
  };

  const templateMessageXmtp = () => {
    return (
      <>
        <Avatar
          onClick={() => props?.handleSelectedUser(props.message?.user)}
          className="m-r-0-5"
          size="sm"
          name={
            props.message?.createdBy == authContext?.address
              ? authContext?.user?.lens?.name
              : props?.channel?.name
          }
          src={
            props.message?.createdBy == authContext?.address
              ? authContext?.user?.lens?.image
              : props?.channel?.image
          }
        ></Avatar>
        <StyledCol
          className={
            authContext?.address == props.message?.createdBy
              ? "message"
              : "message active"
          }
          style={{ color: "#ffffff" }}
        >
          <TemplateReply />
          <StyledRow className="hr-between">
            {props?.channel?.source == "xmtp" ? (
              <Text fontSize="sm" className="heading">
                {props.message?.createdBy == authContext?.address
                  ? authContext?.user?.lens?.name
                  : props?.channel?.name}
              </Text>
            ) : (
              <Text fontSize="sm" className="heading">
                {props.message?.user?.lensName ||
                  props.message?.user?.lensUsername ||
                  props.message?.user?.lensHandle ||
                  truncateAddress(props.message?.createdBy)}
              </Text>
            )}
            <StyledRow className="vr-center">
              {props?.message.pinned && (
                <IconImage slug="IconDarkPinned.png" size="2xs" />
              )}
              <Text
                style={{ alignSelf: "flex-end" }}
                fontSize="12"
                className="m-l-0-5"
              >
                {time}
              </Text>
            </StyledRow>
          </StyledRow>

          {props?.hookChat?.actionMessage?.action == "EDIT" &&
          props?.hookChat?.actionMessage?.item?.id == props?.message?.id ? (
            <InputAction
              style={{ className: "w-100 vr-center m-t-0- 5" }}
              actions={[
                <Button
                  size="xs"
                  className="m-l-0-5"
                  variant="state_brand"
                  onClick={() => props.hookChat?.editMessage()}
                  key={`e-${props?.message?.id}`}
                >
                  Update
                </Button>,
                <Button
                  key={`e-${props?.message?.id}`}
                  size="xs"
                  className="m-l-0-5"
                  variant="state_default_hover"
                  onClick={props.hookChat?.handleEditClose}
                >
                  Cancel
                </Button>,
              ]}
            >
              <Textarea
                ref={props.hookChat?.editMessageRef}
                className="inputElement"
                defaultValue={props.message?.text}
                variant="unstyled"
                style={{ minHeight: min_textarea_height }}
                height="auto"
                rows={1}
              />
            </InputAction>
          ) : (
            // The text message is being set here. TextareaDiv is directly setting the html to the div.
            <TextareaDiv
              dangerouslySetInnerHTML={{ __html: props.message?.text }}
            />
          )}
          {props?.message?.attachments ? (
            props?.message?.attachments?.map((item: any, index: number) => {
              return templateAttachment(item);
            })
          ) : (
            <></>
          )}

          {props?.message?.reaction_scores && (
            <StyledRow className="vr-center">
              {Object.keys(props?.message.reaction_scores).length > 0 &&
                Object.keys(props.message.reaction_scores).map(
                  (item: any, i: any) => {
                    return (
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
                        key={`f-${props?.message?.id}-${i}`}
                      >
                        {emoji[item as keyof typeof emoji]}{" "}
                        {props?.message?.reaction_scores[item]}
                      </Button>
                    );
                  }
                )}
            </StyledRow>
          )}
        </StyledCol>
      </>
    );
  };

  const TemplateReactions = () => {
    return (
      <PopoverNative
        placement={"left-start"}
        trigger={
          <IconImage
            slug="IconDarkEmoji.png"
            style={{ className: "m-r-0-5" }}
          />
        }
      >
        <StyledRow className="vr-center">
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
        </StyledRow>
      </PopoverNative>
    );
  };

  const TemplateActions = () => {
    return (
      <PopoverNative size="sm" trigger={<IconImage slug="IconDarkMenu.png" />}>
        <StyledCol className="text-start">
          {actionsData.map((item) => {
            return (
              <>
                {item.condition && (
                  <Button
                    variant="transparent"
                    size="sm"
                    className="text-start"
                    rightIcon={item.icon}
                    key={item.key}
                    onClick={item.onClick}
                  >
                    {item.name}
                  </Button>
                )}
              </>
            );
          })}
        </StyledCol>
      </PopoverNative>
    );
  };

  const TemplateReply = () => {
    return (
      <>
        {props?.message?.quoted_message && (
          <StyledCol
            onClick={() => handleReplyToView(props.message.quoted_message_id)}
            className="m-b-1 replyTo"
          >
            <StyledRow>
              <Text className="m-r-0-5" fontSize="sm">
                Replying
              </Text>
              <Avatar
                size="xs"
                src={props?.message?.quoted_message?.user?.lensImage}
                className="m-r-0-5"
              />
              <Text fontSize="sm">
                {props.message?.quoted_message?.user?.lensUsername ||
                  props.message?.quoted_message?.user?.lensHandle ||
                  truncateAddress(props.message?.quoted_message?.user?.id)}
              </Text>
            </StyledRow>
            <Text>{props?.message.quoted_message?.text}</Text>
          </StyledCol>
        )}
      </>
    );
  };

  return (
    <>
      <StyledConversation
        style={props.scrollToId == props.message.id ? { opacity: 1 } : {}}
        key={`b-${props?.message?.id}`}
        ref={chatRef}
      >
        <StyledRow className="w-100">
          <StyledCol>
            <StyledRow>
              {props.hookChat?.actionMessage?.action === "MULTISELECT" && (
                <Checkbox
                  defaultChecked={props?.hookChat?.selectedMessages?.includes(
                    props?.message?.id
                  )}
                  isChecked={props?.hookChat?.selectedMessages?.includes(
                    props?.message?.id
                  )}
                  onChange={() => {
                    props?.hookChat?.handleSelect(props?.message);
                  }}
                  className="m-r-0-5"
                />
              )}
            </StyledRow>
          </StyledCol>

          {props?.channel?.source == "xmtp"
            ? templateMessageXmtp()
            : templateMessageStream()}

          <StyledRow
            className={`positionPop ${
              props.scrollToId == props.message.id ? "" : "action"
            }`}
          >
            {props?.channel?.source == "getstream" && <TemplateReactions />}
            {props?.channel?.source == "getstream" && <TemplateActions />}
          </StyledRow>
        </StyledRow>
      </StyledConversation>
    </>
  );
};

export default ChatMessage;
