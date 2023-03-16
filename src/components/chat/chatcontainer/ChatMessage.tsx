import IconEmoji from "@/components/icons/IconEmoji";
import IconImage from "@/components/icons/IconImage";
import InputAction from "@/components/input/InputAction";
import ModalSlider from "@/components/modal/ModalSlider";
import Pop from "@/components/pop/Pop";
import UserProfile from "@/components/user/UserProfile";
import { truncateAddress } from "@/helpers";
import useOnScreen from "@/hooks/other/useOnScreen";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import emoji from "../../../data/emoji.json";

const ChatMessage = (props: any) => {
  const min_textarea_height = 45;
  const modalProfile = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any>();
  const toast = useToast();
  const date = new Date(props.message.created_at);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const chatRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(chatRef);

  useEffect(() => {
    if (isIntersecting && props?.handleDateTag) {
      props?.handleDateTag(props?.message.created_at);
    }
  }, [isIntersecting]);

  const actionsData = [
    {
      name: "Edit Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage path="IconDarkEdit.png" size="18" />,
      onClick: () => {
        props.hookChat.handleEdit(props.message);
      },
      condition: props.message?.user?.id == props?.authContext?.address,
    },
    {
      name: "Reply Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage path="IconDarkReply.png" size="18" />,
      onClick: () => {
        props.hookChat.handleReply(props.message);
      },
      condition: true,
    },
    {
      name: "Copy Message",
      key: `c-${props?.message?.id}`,
      icon: <IconImage path="IconDarkFiles.png" size="18" />,
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
      icon: <IconImage path="IconDarkPinned.png" size="18" />,
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
      icon: <IconImage path="IconRedDelete.png" size="18" />,
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

  const handleSelectedUser = (user: any) => {
    const channelUsers = props.hookMembers.allUsers;
    const userProfile = channelUsers.filter(
      (profile: any) =>
        String(profile.address).toLowerCase() ==
        String(user.lensOwnedBy).toLowerCase()
    )[0];
    modalProfile.onOpen();
    setSelectedUser(userProfile);
  };

  const TemplateProfile = () => {
    return (
      <ModalSlider event={modalProfile} size="lg">
        <UserProfile user={selectedUser} />
      </ModalSlider>
    );
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
      <Pop size="sm" trigger={<IconImage path="IconDarkMenu.png" />}>
        <Col className="text-start">
          {actionsData.map(item => {
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
        </Col>
      </Pop>
    );
  };

  const TemplateReply = () => {
    return (
      <>
        {props?.message?.quoted_message && (
          <Col
            onClick={() => handleReplyToView(props.message.quoted_message_id)}
            className="m-b-1 replyTo"
          >
            <Row>
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
            </Row>
            <Text>{props?.message.quoted_message?.text}</Text>
          </Col>
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
        <Row className="w-100">
          <Col>
            <Row>
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

              <Avatar
                onClick={() => handleSelectedUser(props.message?.user)}
                src={props.message?.user?.lensImage}
                className="m-r-0-5"
                name={
                  props.message?.user?.lensUsername ||
                  props.message?.user?.lensHandle ||
                  truncateAddress(props.message?.createdBy)
                }
              ></Avatar>
            </Row>
          </Col>
          <Col
            className={
              props.authContext?.address.toLowerCase() ==
              props?.message?.user?.id
                ? "active message"
                : "message"
            }
            style={{ color: "#ffffff" }}
          >
            <TemplateReply />
            <Row className="hr-between">
              <Text fontSize="sm" className="heading">
                {props.message?.user?.lensName ||
                  props.message?.user?.lensUsername ||
                  props.message?.user?.lensHandle ||
                  truncateAddress(props.message?.createdBy)}
              </Text>
              <Text style={{ alignSelf: "flex-end" }} fontSize="12">
                {time}
              </Text>
            </Row>

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
              <Row className="vr-center">
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
              </Row>
            )}
          </Col>
          <Row
            className={`positionPop ${
              props.scrollToId == props.message.id ? "" : "action"
            }`}
          >
            <TemplateReactions />
            <TemplateActions />
          </Row>
        </Row>
      </StyledConversation>
      <TemplateProfile />
    </>
  );
};

export default ChatMessage;
