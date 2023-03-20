import IconImage from "@/components/icons/IconImage";
import ModalWindow from "@/components/modal/ModalWindow";
import Pop from "@/components/pop/Pop";
import PortalLoader from "@/components/PortalLoader";
import useCreateLensPost from "@/hooks/lens/useCreateLensPosts";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import {
  Col,
  Row,
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatPreview,
  StyledIcon,
} from "@/styles/StyledComponents";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  Image,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import LayoutNFTCard from "../../../layouts/nft/LayoutNFTCard";
import ChatMention from "../ChatMention";

const ChatInput = (props: any) => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const modalPost = useDisclosure();
  const hookCreateLensPost = useCreateLensPost();
  const createPostRef = useRef<any>();


  const callbackSendMessage = (data: any) => {
    return chatContext?.hookMessage.send(data);
  }

  const templateReply = () => {
    return (
      <>
        {chatContext?.hookChat?.actionMessage?.action === "REPLY" ? (
          <div className="reply">
            <Col className="w-100 vr-center">
              <Row className="vr-center">
                <IconImage path="IconDarkReply.png" />
                <Divider orientation="vertical" color={"#246BFD"} />
                {/* <Avatar
                  size="xs"
                  src={chatContext?.hookChat?.actionMessage?.item?.user.lensImage}
                />
                <Text fontSize="xs">
                  @{chatContext?.hookChat?.actionMessage?.item?.user?.lensHandle}
                </Text> */}
              </Row>
              <Row>
                <Text fontSize="xs">
                  {chatContext?.hookChat?.actionMessage?.item?.text}
                </Text>
              </Row>
            </Col>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const TemplatePostNew = () => {
    return (
      <ModalWindow
        event={modalPost}
        header={
          <Heading as="h6" size="sm">
            New Lens Post
          </Heading>
        }
      >
        <Col className="p-1">
          <Text fontSize={16}>Your Lens Post Heading Here</Text>
          <Textarea
            className="m-b-1 m-t-1"
            size="xl"
            placeholder="Your Lens Post Content Here"
            ref={createPostRef}
          ></Textarea>
          <Row className="m-b-1">
            <IconImage
              path="IconDarkFiles.png"
              style={{ className: "m-r-0-5" }}
            />
            <IconImage path="IconDarkPost.png" />
          </Row>
          <Button
            size="sm"
            variant="state_brand w-content"
            onClick={() => {
              hookCreateLensPost.validateMetadataAndPostOnLens({
                profileId: authContext?.user?.lens?.id,
                postContent: createPostRef.current.value,
              });
            }}
          >
            Create Post
          </Button>
        </Col>
      </ModalWindow>
    );
  };
  const templateAttachment = () => {
    let type;
    if (chatContext?.hookChat?.attachItem) {
      type = chatContext?.hookChat?.attachItem.type.split("/")[0];
    }
    return (
      <>
        {chatContext?.hookChat?.attachItem ? (
          <div className="attachment show">
            <Row className="vr-start hr-between">
              <Col className="w-100">
                {type == "image" ? (
                  <Image
                    src={URL.createObjectURL(chatContext?.hookChat.attachItem)}
                    alt={chatContext?.hookChat.attachItem?.name}
                    width="300px"
                  />
                ) : (
                  <IconImage
                    path="IconDarkFiles.png"
                    style={{ className: "m-r-0-5" }}
                  />
                )}
                <Text className="m-t-0-5">
                  {chatContext?.hookChat?.attachItem?.name}
                </Text>
              </Col>
              {chatContext?.hookChat.streamLoading ? (
                <PortalLoader size="xs" />
              ) : (
                <></>
              )}
            </Row>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const templateSlashPreview = () => {
    const objs: any = {
      // 'post': <LayoutPostCard item={chatContext?.hookChat?.chatMeta?.meta} />,
      // 'proposal': <LayoutProposalCard item={chatContext?.hookChat?.chatMeta?.meta} />,
      nft: <LayoutNFTCard nft={chatContext?.hookChat?.chatMeta?.meta} />,
      // '/send-payment': <LayoutTransactionCard meta={chatContext?.hookChat?.chatMeta?.meta} />,
      // 'poll': <LayoutPollCard poll={chatContext?.hookChat?.chatMeta?.meta} />
    };
    return objs[chatContext?.hookChat?.chatMeta?.type];
  };

  const TemplatePreview = () => {
    return (
      <>
        {chatContext?.hookChat?.actionMessage?.action == "REPLY" ||
        chatContext?.hookChat?.attachItem ||
        chatContext?.hookChat?.chatMeta?.type ||
        chatContext?.hookChat?.slashCmd ||
        chatContext?.hookChat?.mentionActive ? (
          <StyledChatPreview>
            <Row className="vr-center w-100 hr-between">
              <Heading as="h6" size="sm">
                Preview
              </Heading>
              <IconImage
                path="IconDarkCross.png"
                style={{ className: "m-r-0-5" }}
                onClick={() => previewCloseHandler()}
              />
            </Row>
            {templateReply()}
            {templateAttachment()}
            {templateSlashPreview()}
            {chatContext?.hookChat?.mentionActive ? templateMention() : <></>}
            {/* {chatContext?.hookChat.slashCmd ? (
                                <LayoutSlashPreview
                                    hookChat={chatContext?.hookChat}
                                    handleTask={props.handleTask}
                                    txnModalOpen={props.txnModalOpen}
                                    slashCmds={props.slashCmds}
                                />
                                ) : (<></>)
                            } */}
          </StyledChatPreview>
        ) : (
          <></>
        )}
      </>
    );
  };

  const templateMention = () => {
    return (
      <ChatMention
        setMentionList={chatContext?.hookChat.setMentionList}
        mentionList={chatContext?.hookChat.mentionList}
        mention={chatContext?.hookChat.mention}
        selectedText={chatContext?.hookChat.selectedText}
      />
    );
  };

  const TemplateAction = () => {
    return (
      <Pop
        trigger={
          <StyledIcon className="circled">
            <PlusSquareIcon color="gray.300" />
          </StyledIcon>
        }
      >
        <Col className="text-start">
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            isLoading={props.attachLoading}
            rightIcon={<IconImage path="IconDarkFiles.png" />}
          >
            <label htmlFor="upload-file" className="w-100">
              <Row className="vr-center hr-between w-100">Upload File </Row>
            </label>
          </Button>
          <input
            id="upload-file"
            onChange={chatContext?.hookChat.handleAttachment}
            type="file"
            hidden
          />
          {/* TODO */}
          {/* <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkFiles.png" />}
          >
            <Row className="hr-between w-100">Create Poll</Row>
          </Button> */}
          {/* <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkFiles.png" />}
            onClick={modalPost.onOpen}
          >
            <Row className="hr-between w-100">Create Post</Row>
          </Button>
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            rightIcon={<IconImage path="IconDarkWallet.png" />}
          >
            <Row className="hr-between w-100">Send Payment</Row>
          </Button> */}
        </Col>
      </Pop>
    );
  };

  const TemplateInput = () => {
    return (
      <StyledChatInputContainer>
        <Col className="w-100">
          <TemplatePreview />

          <StyledChatInput>
            <Col className="vr-center hr-center sideIcons">
              <TemplateAction />
            </Col>
            <Col className="w-100 vr-center">
              <Textarea
                onChange={event => {
                  event.target.style.height = "auto";
                  event.target.style.height = `${event.target.scrollHeight}px`;
                }}
                ref={chatContext?.hookChat.textareaRef}
                className="inputElement"
                variant="unstyled"
                style={{ minHeight: "45px" }}
                onKeyDown={(event: any) => {
                  chatContext?.hookChat?.keyDownMessage(event, callbackSendMessage);
                }}
                placeholder="Message..."
                height="auto"
                rows={1}
              />
            </Col>
            <Col className="vr-center hr-center sideIcons">
              <span
                onClick={(e: any) => {
                  chatContext?.hookChat?.addMessage(callbackSendMessage);
                }}
              >
                <IconImage path="IconDarkSend.svg" size="30" />
              </span>
            </Col>
          </StyledChatInput>
        </Col>
      </StyledChatInputContainer>
    );
  };

  const TemplateMembership = () => {
    return (
      <>
        <Col className="w-100 vr-center m-l-0-5">
          Join the Channel to Message
        </Col>
        <Col>
          <Button
            isLoading={props.isLoading}
            onClick={() => props.addMemberToChannel(props.channel?.id)}
          >
            Join
          </Button>
        </Col>
      </>
    );
  };

  const TemplateSearch = () => {
    return (
      <Row className="vr-center hr-between w-100">
        <IconImage path="IconDarkCalendar.png" />
        <Row className="vr-center">
          <IconImage
            path="IconDarkArrowUp.png"
            style={{ className: "m-r-0-5" }}
          />
          <IconImage path="IconDarkArrowDown.png" />
        </Row>
      </Row>
    );
  };

  const TemplateMultiselect = () => {
    return (
      <Row className="vr-center hr-between w-100">
        <IconImage path="IconDarkReply.png" style={{ className: "m-r-0-5" }} />
        <IconImage path="IconDarkDelete.png" style={{ className: "m-r-0-5" }} />
        <IconImage
          path="IconDarkForward.png"
          style={{ className: "m-r-0-5" }}
        />
      </Row>
    );
  };

  const previewCloseHandler = () => {
    if (chatContext?.hookChat?.actionMessage?.action == "REPLY") {
      chatContext?.hookChat?.handleReplyClose();
    } else if (chatContext?.hookChat?.attachItem) {
      chatContext?.hookChat?.deleteAttachment();
    }
  };

  const Template = () => {
    if (chatContext?.hookChat.actionMessage?.action === "SEARCH")
      return (
        <StyledChatInputContainer>
          <StyledChatInput>
            <TemplateSearch />
          </StyledChatInput>
        </StyledChatInputContainer>
      );
    else if (chatContext?.hookChat.actionMessage?.action === "MULTISELECT")
      return (
        <StyledChatInputContainer>
          <StyledChatInput>
            <TemplateMultiselect />
          </StyledChatInput>
        </StyledChatInputContainer>
      );
    else return <TemplateInput />;
  };

  return (
    <>
      <Template />
      <TemplatePostNew />
    </>
  );
};

export default ChatInput;
