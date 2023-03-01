import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Divider,
  Heading,
  Image,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Row,
  Col,
  StyledIcon,
  StyledChatInputContainer,
  StyledChatPreview,
  StyledChatInput,
} from "@/styles/StyledComponents";
import LayoutNFTCard from "../../../layouts/nft/LayoutNFTCard";
import ChatMention from "../ChatMention";
import PortalLoader from "@/components/PortalLoader";
import IconImage from "@/components/icons/IconImage";
import Pop from "@/components/pop/Pop";
import ModalWindow from "@/components/modal/ModalWindow";
import useCreateLensPost from "@/hooks/lens/useCreateLensPosts";
import { useRef } from "react";

const ChatInput = (props: any) => {
  const modalPost = useDisclosure();
  const hookCreateLensPost = useCreateLensPost();
  const createPostRef = useRef<any>();

  const templateReply = () => {
    return (
      <>
        {props?.hookChat?.actionMessage?.action === "REPLY" ? (
          <div className="reply">
            <Col className="w-100 vr-center">
              <Row className="vr-center">
                <IconImage path="IconDarkReply.png" />
                <Divider orientation="vertical" color={"#246BFD"} />
                {/* <Avatar
                  size="xs"
                  src={props.hookChat?.actionMessage?.item?.user.lensImage}
                />
                <Text fontSize="xs">
                  @{props.hookChat?.actionMessage?.item?.user?.lensHandle}
                </Text> */}
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
            <IconImage path="IconDarkPhotos.png" />
          </Row>
          <Button
            size="sm"
            variant="state_brand w-content"
            onClick={() => {
              hookCreateLensPost.validateMetadataAndPostOnLens({
                profileId: props?.lensId,
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
                  <IconImage
                    path="IconDarkFiles.png"
                    style={{ className: "m-r-0-5" }}
                  />
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
        {props.hookChat?.actionMessage?.action == "REPLY" ||
        props.hookChat?.attachItem ||
        props.hookChat?.chatMeta?.type ||
        props.hookChat?.slashCmd ||
        props.hookChat?.mentionActive ? (
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
            {props.hookChat?.mentionActive ? templateMention() : <></>}
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
        setMentionList={props.hookChat.setMentionList}
        mentionList={props.hookChat.mentionList}
        mention={props.hookChat.mention}
        selectedText={props.hookChat.selectedText}
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
                }}
                ref={props.hookChat.textareaRef}
                className="inputElement"
                variant="unstyled"
                style={{ minHeight: "45px" }}
                onKeyDown={event => {
                  props.hookChat?.keyDownMessage(event);
                }}
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
        <IconImage path="IconDarkForward.png" style={{ className: "m-r-0-5" }} />
      </Row>
    );
  };

  const previewCloseHandler = () => {
    if (props?.hookChat?.actionMessage?.action == "REPLY") {
      props?.hookChat?.handleReplyClose();
    } else if (props?.hookChat?.attachItem) {
      props?.hookChat?.deleteAttachment();
    }
  };

  const Template = () => {
    if (props.hookChat.actionMessage?.action === "SEARCH")
      return (
        <StyledChatInputContainer>
          <StyledChatInput>
            <TemplateSearch />
          </StyledChatInput>
        </StyledChatInputContainer>
      );
    else if (props.hookChat.actionMessage?.action === "MULTISELECT")
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
