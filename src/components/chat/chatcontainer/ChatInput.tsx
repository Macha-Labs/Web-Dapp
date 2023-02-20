import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Heading,
  Icon,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  Row,
  Col,
  StyledIcon,
  StyledChatInputContainer,
  StyledChatPreview,
  StyledChatInput,
} from "@/styles/StyledComponents";
import LayoutSlashPreview from "@/layouts/chat/LayoutSlashPreview";
import LayoutPostCard from "../../../layouts/post/LayoutPostCard";
import LayoutProposalCard from "../../../layouts/proposal/LayoutProposalCard";
import LayoutNFTCard from "../../../layouts/nft/LayoutNFTCard";
import ChatMention from "../ChatMention";
import IconFile from "@/components/icons/IconFile";
import IconDelete from "@/components/icons/IconDelete";
import PortalLoader from "@/components/PortalLoader";
import IconImage from "@/components/icons/IconImage";
import Pop from "@/components/pop/Pop";

// const TypingRow = styled(Row)`
//     display: none;
// `

const ChatInput = (props: any) => {
  const templateReply = () => {
    return (
      <>
        {props?.hookChat?.actionMessage?.action === "REPLY" ? (
          <div className="reply">
            <Col className="w-100 vr-center">
              <Row className="vr-center">
                <Text fontSize="xs" className="m-r-1">
                  Replying to:
                </Text>
                <Avatar
                  size="xs"
                  src={props.hookChat?.actionMessage?.item?.user.lensImage}
                />
                <Text fontSize="xs">
                  @{props.hookChat?.actionMessage?.item?.user?.lensHandle}
                </Text>
              </Row>
              <Row>
                <Text fontSize="xs">
                  {props.hookChat?.actionMessage?.item?.text}
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

  const templateAttachment = () => {
    let type;
    if (props?.hookChat?.attachItem) {
      type = props?.hookChat?.attachItem.type.split("/")[0];
    }
    return (
      <>
        {props?.hookChat?.attachItem ? (
          <div className="attachment show">
            <Row className="vr-start hr-between">
              <Col className="w-100">
                {type == "image" ? (
                  <Image
                    src={URL.createObjectURL(props?.hookChat.attachItem)}
                    alt={props?.hookChat.attachItem?.name}
                    width="300px"
                  />
                ) : (
                  <IconFile width={24} height={24} fill="#efefef" />
                )}
                <Text className="m-t-0-5">
                  {props?.hookChat?.attachItem?.name}
                </Text>
              </Col>
              {props.hookChat.streamLoading ? (
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
      // 'post': <LayoutPostCard item={props?.hookChat?.chatMeta?.meta} />,
      // 'proposal': <LayoutProposalCard item={props?.hookChat?.chatMeta?.meta} />,
      nft: <LayoutNFTCard nft={props?.hookChat?.chatMeta?.meta} />,
      // '/send-payment': <LayoutTransactionCard meta={props.hookChat?.chatMeta?.meta} />,
      // 'poll': <LayoutPollCard poll={props?.hookChat?.chatMeta?.meta} />
    };
    return objs[props.hookChat?.chatMeta?.type];
  };

  const TemplatePreview = () => {
    return (
      <>
        {props?.hookChat?.actionMessage?.action == "REPLY" ||
        props?.hookChat?.attachItem ||
        props?.hookChat?.chatMeta?.type ||
        props?.hookChat?.slashCmd ||
        props?.hookChat?.isTyping ? (
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
            {props?.hookChat?.isTyping ? templateMention() : <></>}
            {/* {props?.hookChat.slashCmd ? (
                                <LayoutSlashPreview
                                    hookChat={props.hookChat}
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
        users={props.users}
        setMentionList={props?.hookChat.setMentionList}
        mentionList={props?.hookChat.mentionList}
        mention={props?.hookChat.mention}
        selectedText={props?.hookChat.selectedText}
      />
    );
  };

  const TemplateAction = () => {
    return (
      <Pop 
      trigger={<StyledIcon className="circled">
      <PlusSquareIcon color="gray.300" />
      </StyledIcon>
      }>
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
                onChange={props.hookChat.handleAttachment}
                type="file"
                hidden
              />
              <Button
                variant="transparent"
                size="md"
                className="text-start"
                rightIcon={<IconImage path="IconDarkFiles.png" />}
              >
                <Row className="hr-between w-100">Create Poll</Row>
              </Button>
              <Button
                variant="transparent"
                size="md"
                className="text-start"
                rightIcon={<IconImage path="IconDarkFiles.png" />}
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
              </Button>
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
                  props.hookChat.onChange(event);
                }}
                ref={props.hookChat?.textareaRef}
                className="inputElement"
                variant="unstyled"
                style={{ minHeight: "45px" }}
                onKeyDown={event => props?.hookChat?.keyDownMessage(event)}
                placeholder="Message..."
                height="auto"
                rows={1}
              />
            </Col>
            <Col className="vr-center hr-center sideIcons">
              <StyledIcon className="circled">
                {/* <EmojiIcon width="20" height="20" fill="#e8e8e8" /> */}
              </StyledIcon>
            </Col>
          </StyledChatInput>

          <Row>
            <Col className="w-100 vr-center">
              {props?.chatContext?.userObjTyping ? (
                <Text fontSize="xs">
                  <Spinner size="xs" />@{props?.chatContext?.userObjTyping} is
                  typing
                </Text>
              ) : (
                <Text fontSize="xs">
                  <br />
                </Text>
              )}
            </Col>
          </Row>
        </Col>
      </StyledChatInputContainer>
    );
  };

  const TemplateMembership = () => {
    return (
      <StyledChatInputContainer>
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
      </StyledChatInputContainer>
    );
  };

  const TemplateSearch = () => {
    return <></>;
  };

  const TemplateMultiselect = () => {
    return <></>;
  };

  const previewCloseHandler = () => {
    if (props?.hookChat?.actionMessage?.action == "REPLY") {
      props?.hookChat?.handleReplyClose();
    } else if (props?.hookChat?.attachItem) {
      props?.hookChat?.deleteAttachment();
    }
  };

  if (props.hookChat.searchActive) return <TemplateSearch />;
  else if (props.hookChat.actionMessage?.action === "MULTISELECT")
    return <TemplateMultiselect />;
  else return <TemplateInput />;
};

export default ChatInput;
