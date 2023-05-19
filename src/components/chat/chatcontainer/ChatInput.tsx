import IconImage from "@/_ui/icons/IconImage";
import ModalWindow from "@/_ui/modal/ModalWindow";
import PopoverNative from "@/_ui/popover/PopoverNative";
import PortalLoader from "@/components/PortalLoader";
import useCreateLensPost from "@/hooks/lens/useCreateLensPosts";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import {
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatPreview,
  StyledCol,
  StyledIcon,
  StyledRow,
} from "@/styles/StyledComponents";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  Image,
  Text,
  Textarea,
  useDisclosure
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
  };

  const templateReply = () => {
    return (
      <>
        {chatContext?.hookChat?.actionMessage?.action === "REPLY" ? (
          <div className="reply">
            <StyledCol className="w-100 vr-center">
              <StyledRow className="vr-center">
                <IconImage slug="IconDarkReply.png" />
                <Divider orientation="vertical" color={"#246BFD"} />
                {/* <Avatar
                  size="xs"
                  src={chatContext?.hookChat?.actionMessage?.item?.user.lensImage}
                />
                <Text fontSize="xs">
                  @{chatContext?.hookChat?.actionMessage?.item?.user?.lensHandle}
                </Text> */}
              </StyledRow>
              <StyledRow>
                <Text fontSize="xs">
                  {chatContext?.hookChat?.actionMessage?.item?.text}
                </Text>
              </StyledRow>
            </StyledCol>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const templatePostNew = () => {
    return (
      <ModalWindow
        event={modalPost}
        header={
          <Heading as="h6" size="sm">
            New Lens Post
          </Heading>
        }
      >
        <StyledCol className="p-1">
          <Text fontSize={16}>Your Lens Post Heading Here</Text>
          <Textarea
            className="m-b-1 m-t-1"
            size="xl"
            placeholder="Your Lens Post Content Here"
            ref={createPostRef}
          ></Textarea>
          <StyledRow className="m-b-1">
            <IconImage
              slug="IconDarkFiles.png"
              style={{ className: "m-r-0-5" }}
            />
            <IconImage slug="IconDarkPost.png" />
          </StyledRow>
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
        </StyledCol>
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
            <StyledRow className="vr-start hr-between">
              <StyledCol className="w-100">
                {type == "image" ? (
                  <Image
                    src={URL.createObjectURL(chatContext?.hookChat.attachItem)}
                    alt={chatContext?.hookChat.attachItem?.name}
                    width="300px"
                  />
                ) : (
                  <IconImage
                    slug="IconDarkFiles.png"
                    style={{ className: "m-r-0-5" }}
                  />
                )}
                <Text className="m-t-0-5">
                  {chatContext?.hookChat?.attachItem?.name}
                </Text>
              </StyledCol>
              {chatContext?.hookChat.streamLoading ? (
                <PortalLoader size="xs" />
              ) : (
                <></>
              )}
            </StyledRow>
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
            <StyledRow className="vr-center w-100 hr-between">
              <Heading as="h6" size="sm">
                Preview
              </Heading>
              <IconImage
                slug="IconDarkCross.png"
                style={{ className: "m-r-0-5" }}
                onClick={() => previewCloseHandler()}
              />
            </StyledRow>
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
      <PopoverNative
        trigger={
          <StyledIcon className="circled">
            <PlusSquareIcon color="gray.300" />
          </StyledIcon>
        }
      >
        <StyledCol className="text-start">
          <Button
            variant="transparent"
            size="md"
            className="text-start"
            isLoading={props.attachLoading}
            rightIcon={<IconImage slug="IconDarkFiles.png" />}
          >
            <label htmlFor="upload-file" className="w-100">
              <StyledRow className="vr-center hr-between w-100">
                Upload File{" "}
              </StyledRow>
            </label>
          </Button>
          <input
            id="upload-file"
            onChange={(e) => {
              chatContext?.hookChat.handleAttachment(e);
            }}
            type="file"
            hidden
          />
        </StyledCol>
      </PopoverNative>
    );
  };

  const templateInput = () => {
    return (
      <StyledChatInputContainer>
        <StyledCol className="w-100">
          <TemplatePreview />

          <StyledChatInput>
            <StyledCol className="vr-center hr-center sideIcons">
              <TemplateAction />
            </StyledCol>
            <StyledCol className="w-100 vr-center">
              <Textarea
                onChange={(event) => {
                  event.target.style.height = "auto";
                  event.target.style.height = `${event.target.scrollHeight}px`;
                }}
                ref={chatContext?.hookChat?.textareaRef}
                className="inputElement"
                variant="unstyled"
                style={{ minHeight: "45px" }}
                onKeyDown={(event: any) => {
                  chatContext?.hookChat?.keyDownMessage(
                    event,
                    callbackSendMessage
                  );
                }}
                placeholder="Message..."
                height="auto"
                rows={1}
              />
            </StyledCol>
            <StyledCol className="vr-center hr-center sideIcons">
              <span
                onClick={(e: any) => {
                  chatContext?.hookChat?.addMessage(callbackSendMessage);
                }}
              >
                <IconImage slug="IconDarkSend.svg" size="30" />
              </span>
            </StyledCol>
          </StyledChatInput>
        </StyledCol>
      </StyledChatInputContainer>
    );
  };

  const TemplateMembership = () => {
    return (
      <>
        <StyledCol className="w-100 vr-center m-l-0-5">
          Join the Channel to Message
        </StyledCol>
        <StyledCol>
          <Button
            isLoading={props.isLoading}
            onClick={() => props.addMemberToChannel(props.channel?.id)}
          >
            Join
          </Button>
        </StyledCol>
      </>
    );
  };

  const TemplateSearch = () => {
    return (
      <StyledRow className="vr-center hr-between w-100">
        <IconImage slug="IconDarkCalendar.png" />
        <StyledRow className="vr-center">
          <IconImage
            slug="IconDarkArrowUp.png"
            style={{ className: "m-r-0-5" }}
          />
          <IconImage slug="IconDarkArrowDown.png" />
        </StyledRow>
      </StyledRow>
    );
  };

  const TemplateMultiselect = () => {
    return (
      <StyledRow className="vr-center hr-between w-100">
        <IconImage slug="IconDarkReply.png" style={{ className: "m-r-0-5" }} />
        <IconImage slug="IconDarkDelete.png" style={{ className: "m-r-0-5" }} />
        <IconImage
          slug="IconDarkForward.png"
          style={{ className: "m-r-0-5" }}
        />
      </StyledRow>
    );
  };

  const previewCloseHandler = () => {
    if (chatContext?.hookChat?.actionMessage?.action == "REPLY") {
      chatContext?.hookChat?.handleReplyClose();
    } else if (chatContext?.hookChat?.attachItem) {
      chatContext?.hookChat?.deleteAttachment();
    }
  };

  const template = () => {
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
    else return templateInput();
  };

  return (
    <>
      {/* <Template /> */}
      {template()}
      {/* <TemplatePostNew /> */}
      {templatePostNew()}
      {/* <Input/> */}
    </>
  );
};

export default ChatInput;
