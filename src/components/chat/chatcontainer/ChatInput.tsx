import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Heading,
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
import LayoutTransactionCard from "../../user/payment/LayoutTransactionCard";
import LayoutPollCard from "../../../layouts/poll/LayoutPollCard";
import ChatMention from "../ChatMention";

// const TypingRow = styled(Row)`
//     display: none;
// `

const ChatInput = (props: any) => {
  const templateReply = () => {
    return (
      <>
        {props?.chatContext?.actionMessage?.actionType == "Reply" ? (
          <div className="reply">
            <Col className="w-100 vr-center">
              <Row className="vr-center">
                <Text fontSize="xs" className="m-r-1">
                  Replying to:
                </Text>{" "}
                <Avatar
                  size="xs"
                  src={`https://meta-profile-photos.s3.ap-south-1.amazonaws.com/${props.actionMessage.item.user.id}.png`}
                />{" "}
                <Text fontSize="xs">@{props.actionMessage.item.user.id}</Text>
              </Row>
            </Col>
            <StyledIcon
              onClick={() =>
                props?.chatContext.setActionMessage({
                  actionType: "",
                  item: {},
                })
              }
            >
              {/* <CrossIcon width="12" height="12" fill="#efefef" /> */}
            </StyledIcon>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const templateAttachment = () => {
    let type;
    if (props?.chatContext?.attachItem) {
      type = props?.chatContext?.attachItem.type.split("/")[0];
    }
    return (
      <>
        {props?.chatContext?.attachItem ? (
          <div className="attachment show">
            <Row className="vr-start hr-between">
              <Col className="w-100">
                {/* {
                                            type == "image" ?
                                                <Image src={URL.createObjectURL(props?.chatContext.attachItem)} alt={props?.chatContext.attachItem?.name} width="300px" />
                                                :
                                                <FileIcon width="150px" height="150px" />
                                        } */}
                <Text className="m-t-0-5">
                  {props?.chatContext?.attachItem?.name}
                </Text>
              </Col>
              <StyledIcon onClick={() => props?.chatContext.deleteAttachment()}>
                {/* <DeleteIcon width="20" height="20" fill="#efefef" /> */}
              </StyledIcon>
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
      // 'post': <LayoutPostCard item={props?.chatContext?.chatMeta?.meta} />,
      // 'proposal': <LayoutProposalCard item={props?.chatContext?.chatMeta?.meta} />,
      nft: <LayoutNFTCard nft={props?.chatContext?.chatMeta?.meta} />,
      // '/send-payment': <LayoutTransactionCard meta={props.chatContext?.chatMeta?.meta} />,
      // 'poll': <LayoutPollCard poll={props?.chatContext?.chatMeta?.meta} />
    };
    return objs[props.chatContext?.chatMeta?.type];
  };

  const templatePreview = () => {
    return (
      <>
        {props?.chatContext?.actionMessage?.actionType == "Reply" ||
        props?.chatContext?.attachItem ||
        props?.chatContext?.chatMeta?.type ||
        props?.chatContext?.slashCmd ||
        props?.chatContext?.isTyping ? (
          <StyledChatPreview>
            <Row className="m-b-1 vr-center w-100 hr-between">
              <Heading as="h6" size="sm">
                Preview
              </Heading>
              <StyledIcon>
                <CloseIcon />
              </StyledIcon>
            </Row>
            {templateReply()}
            {templateAttachment()}
            {templateSlashPreview()}
            {props?.chatContext?.isTyping ? templateMention() : <></>}
            {/* {props?.chatContext.slashCmd ? (
                                <LayoutSlashPreview
                                    chatContext={props.chatContext}
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
        setMentionList={props?.chatContext.setMentionList}
        mentionList={props?.chatContext.mentionList}
        mention={props?.chatContext.mention}
        selectedText={props?.chatContext.selectedText}
      />
    );
  };

  const templateAdd = () => {
    return (
      <Popover placement="top-start">
        <PopoverTrigger>
          <StyledIcon className="circled">
            <PlusSquareIcon color="gray.300" />
          </StyledIcon>
        </PopoverTrigger>
        <PopoverContent className="m-b-1">
          <PopoverBody>
            <Col className="text-start">
              <Button
                variant="transparent"
                size="sm"
                className="text-start"
                isLoading={props.attachLoading}
              >
                <label htmlFor="upload-file" className="w-100">
                  <Row className="hr-between w-100">
                    Add File{" "}
                    {/* <FileIcon width="20" height="20" fill="#efefef" className="m-r-0-5" /> */}
                  </Row>
                </label>
              </Button>
              <input
                id="upload-file"
                onChange={props.handleAttachment}
                type="file"
                hidden
              />
              {/* <Button variant="transparent" size="sm" className="text-start"><Row className="hr-between w-100">Add Poll<PollIcon width="20" height="20" fill="#efefef" className="m-r-0-5" /></Row></Button> */}
            </Col>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  const templateChatInputRow = () => {
    return (
      <StyledChatInput>
        {props.channel?.data?.created_by?.id == props.currentUser?.id ||
        props.userIsMember ? (
          <>
            <Col className="vr-center hr-center sideIcons">{templateAdd()}</Col>

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
          </>
        ) : (
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
        )}
      </StyledChatInput>
    );
  };

  return (
    <StyledChatInputContainer>
      <Col className="w-100">
        {templatePreview()}

        {templateChatInputRow()}

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

export default ChatInput;
