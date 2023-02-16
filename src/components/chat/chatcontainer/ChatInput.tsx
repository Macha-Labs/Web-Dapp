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
import IconFile from "@/components/icons/IconFile";
import IconDelete from "@/components/icons/IconDelete";
import PortalLoader from "@/components/PortalLoader";

// const TypingRow = styled(Row)`
//     display: none;
// `

const ChatInput = (props: any) => {
  const templateReply = () => {
    return (
      <>
        {props?.hookChat?.actionMessage?.actionType == "Reply" ? (
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
                props?.hookChat.setActionMessage({
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
    if (props?.hookChat?.attachItem) {
      type = props?.hookChat?.attachItem.type.split("/")[0];
    }
    return (
      <>
        {props?.hookChat?.attachItem ? (
          <div className="attachment show">
            <Row className="vr-start hr-between">
              <Col className="w-100">
                {
                  type == "image" ?
                    <Image src={URL.createObjectURL(props?.hookChat.attachItem)} alt={props?.hookChat.attachItem?.name} width="300px" />
                    :
                    <IconFile width={24} height={24} fill="#efefef" />
                }
                <Text className="m-t-0-5">
                  {props?.hookChat?.attachItem?.name}
                </Text>
              </Col>
              {props.hookChat.streamLoading ? (<PortalLoader size="xs" />) : (
                <Icon onClick={() => props?.hookChat.deleteAttachment()}>
                <IconDelete width="20" height="20" fill="#efefef" />
              </Icon>)}
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

  const templatePreview = () => {
    return (
      <>
        {props?.hookChat?.actionMessage?.actionType == "Reply" ||
          props?.hookChat?.attachItem ||
          props?.hookChat?.chatMeta?.type ||
          props?.hookChat?.slashCmd ||
          props?.hookChat?.isTyping ? (
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
                onChange={props.hookChat.handleAttachment}
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
                isDisabled={props.hookChat.streamLoading}
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

  const TemplateInput = () => {
    return (
      <StyledChatInputContainer>
        <Col className="w-100">
          {templatePreview()}

          {templateChatInputRow()}

        <Row>
          <Col className="w-100 vr-center">
            {props?.hookChat?.userObjTyping ? (
              <Text fontSize="xs">
                <Spinner size="xs" />@{props?.hookChat?.userObjTyping} is
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
