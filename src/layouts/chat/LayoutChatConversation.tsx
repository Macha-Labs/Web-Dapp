import { Avatar, AvatarBadge, Badge, Button, Heading, Popover, PopoverBody, PopoverContent, PopoverTrigger, Tag, TagLabel, Text, Textarea } from "@chakra-ui/react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import LayoutPostCard from "cLayouts/Post/LayoutPostCard";
import LayoutProposalCard from "cLayouts/Proposal/LayoutProposalCard";
import LayoutTaskCard from "cLayouts/Task/LayoutTaskCard";
import CopyIcon from "components/Icon/CopyIcon";
import DeleteIcon from "components/Icon/DeleteIcon";
import DotsHIcon from "components/Icon/DotsHIcon";
import EmojiIcon from "components/Icon/EmojiIcon";
import PinIcon from "components/Icon/PinIcon";
import ReplyIcon from "components/Icon/ReplyIcon";
import ShareIcon from "components/Icon/ShareIcon";
import useUserMsg from "hooks/useUserMsg";
import { useLayoutEffect, useRef, useState } from "react";
import { Col, Icon, Row } from "style";
import { Conversation } from "style/chat";
import LayoutFilePreview from "./LayoutFilePreview";
import LayoutImagePreview from "./LayoutImagePreview";
import LayoutLinkPreview from "./LayoutLinkPreview";
import LayoutTransactionCard from "../Payment/LayoutTransactionCard";
import styled from "styled-components";
import { truncateAddress } from "helpers";
import LayoutNFTCard from "cLayouts/NFT/LayoutNFTCard";
import { Post } from "style/card";
import LayoutPollCard from "cLayouts/Poll/LayoutPollCard";

const TextareaDiv = styled.div`
    padding: 5px;
`

const LayoutChatConversation = (props) => {
    const [emoji, setEmoji] = useState<any>();
    const textareaRef = useRef<any>();
    const min_textarea_height = 45;
    const userHook = useUserMsg(props?.item?.user?.id);
    const userTest = useRef<any>();

    useLayoutEffect(() => {
        if (props.editingId) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, min_textarea_height)}px`;
        }
    }, [props.editingId]);

    const templateParent = (item) => {
        return (
            <>
                {
                    item.parent_id
                        ?
                        (
                            <Row className="replyTo">
                                <Text>{item?.parent_id}</Text>
                            </Row>
                        )
                        :
                        (
                            <></>
                        )
                }
            </>
        )
    }

    const templateAttachment = (attachment) => {
        if (attachment?.og_scrape_url) {
            return (
                <LayoutLinkPreview attachment={attachment} />
            )
        }
        else if (attachment?.type == "image") {
            return (
                <LayoutImagePreview attachment={attachment} />
            )
        } else if (attachment?.type == "text" || attachment?.type == "application") {
            return (
                <LayoutFilePreview attachment={attachment} />
            )
        }
    }

    const templateChatPreview = () => {
        const objs = {
            'post': <LayoutPostCard item={props?.item?.message_custom_data?.meta} />,
            'task': <LayoutTaskCard task={props?.item?.message_custom_data?.meta}
                openTask={() => { props.handleTask(props?.item?.message_custom_data?.meta) }}
            />,
            'nft': <LayoutNFTCard nft={props.item.message_custom_data.meta} />,
            'proposal': <LayoutProposalCard item={props?.item?.message_custom_data?.meta} />,
            '/send-payment': <LayoutTransactionCard meta={props.item?.message_custom_data?.meta} />,
            'poll': <LayoutPollCard poll={props.item.message_custom_data.meta} />
        }
        return objs[props.item?.message_custom_data?.type];
    }

    const templateAction = (item, index) => {
        return (
            <Popover placement='top-start'>
                <PopoverTrigger>
                    <Icon className="circled"><DotsHIcon width="20" height="20" fill="#e8e8e8" /></Icon>
                </PopoverTrigger>
                <PopoverContent className="">
                    <PopoverBody>
                        <Col className="text-start">
                            <Button variant="transparent" size="sm" className="text-start" onClick={() => { props.setActionMessage({ actionType: "Pin", item: item }); props.onOpen() }}><Row className="hr-between w-100">Pin Message<PinIcon width="20" height="20" fill="#efefef" className="m-r-0-5" /></Row></Button>
                            <Button variant="transparent" size="sm"><Row className="hr-between w-100">Forward<ShareIcon width="20" height="20" fill="#efefef" className="m-r-0-5" /></Row></Button>
                            <Button variant="transparent" size="sm" onClick={() => { props.copyMessage(index) }}><Row className="hr-between w-100">Copy Message<CopyIcon width="20" height="20" fill="#efefef" className="m-r-0-5" /></Row></Button>
                            {
                                item?.user?.id == props.context.userLens.profile.id
                                    ?
                                    (
                                        <>
                                            <Button variant="transparent" size="sm" onClick={() => { props.handleEditing(item) }}>
                                                <Row className="hr-between w-100">
                                                    Edit
                                                </Row>
                                            </Button>
                                            <Button
                                                variant="transparent"
                                                size="sm"
                                                onClick={() => { props.setActionMessage({ actionType: "Delete", item: item }); props.onOpen() }}>
                                                <Row className="hr-between w-100">
                                                    Delete<DeleteIcon width="20" height="20" fill="#efefef" className="m-r-0-5" />
                                                </Row>
                                            </Button>
                                        </>

                                    )
                                    :
                                    (
                                        <></>
                                    )
                            }
                        </Col>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        )
    }

    const templateReactions = (item, index) => {
        return (
            <>
                {Object.keys(props.reactions).length > 0 ? (
                    <Row key={index}>
                        {
                            Object.keys(props.reactions).map((reaction, index) =>
                                <Badge key={index} variant={props.reactions[reaction]['clicked'] ? (`subtle`) : (`outline`)}
                                    className="m-r-0-5"
                                    onClick={() => props.handleReaction(reaction, item.id)}>
                                    {reaction} {props.reactions[reaction]['count']}
                                </Badge>
                            )
                        }
                    </Row>
                ) : (<></>)
                }
            </>
        )
    }

    const templateEmoji = (item, index) => {
        return (
            <Popover key={index} placement='left-end'>
                <PopoverTrigger>
                    <Icon className="circled m-r-0-5">
                        <EmojiIcon width="20" height="20" fill="#e8e8e8" />
                    </Icon>
                </PopoverTrigger>
                <PopoverContent className="m-r-2">
                    <Picker data={data} onEmojiSelect={e => addEmoji(e, item.id)} />
                </PopoverContent>
            </Popover>
        )
    }

    const addEmoji = (e, messageId) => {
        setEmoji(e.native);
        props.handleReaction(e.native, messageId);
    }

    const templateChatMessage = () => {
        if (props.channel.id == "63748b83314d578c7a74620d") {
            return (<>
                <Conversation key={props.index}>
                    <Row className="message">
                        <Avatar src={userHook?.image} className="m-r-1" onClick={() => { props.setMember(userHook) }}>
                            {
                                props.item.user.online ? (<AvatarBadge boxSize='0.7em' bg='green.500' />) : (<></>)
                            }
                        </Avatar>
                        <Col className="w-100">
                            <Row className="hr-between" onClick={() => { props.setMember(userHook) }}>
                                <Heading as="h5" size="xs" className="m-b-0-5">{userHook?.name}</Heading>
                                <Tag>{truncateAddress(userHook?.ownedBy)}</Tag>
                            </Row>
                            <Post className="m-b-1 border-with-hover">
                                <Col className="card-body">
                                    <Row className="m-b-1">
                                        <Heading as="h6" size="sm">{props.item.text}</Heading>
                                    </Row>

                                    <Text as="b">Event Logs</Text>
                                    {props.item?.eventLog?.events.map(event => {
                                        return (
                                            <>
                                                <Text>{event?.name} - {event.value}</Text>
                                            </>
                                        )
                                    })}
                                </Col>

                            </Post>
                            {props?.item?.message_custom_data ? (
                                <>
                                    {
                                        templateChatPreview()
                                    }
                                </>
                            ) : (<></>)
                            }

                            {/* {templateReactions(item, index)} */}
                        </Col>
                        <Row className="w-100 action">
                            {templateEmoji(props.item, props.index)}
                            <Icon className="circled m-r-0-5" onClick={() => props.setActionMessage({ actionType: "Reply", item: props.item })}>
                                <ReplyIcon width="20" height="20" fill="#e8e8e8" />
                            </Icon>
                            {templateAction(props.item, props.index)}
                        </Row>
                    </Row>
                </Conversation>
            </>)
        } else {
            return (
                <Conversation key={props.index}>
                    {templateParent(props.item)}
                    <Row className="message">
                        <Avatar src={userHook?.image} className="m-r-1" onClick={() => { props.setMember(userHook) }}>
                            {
                                props.item.user.online ? (<AvatarBadge boxSize='0.7em' bg='green.500' />) : (<></>)
                            }
                        </Avatar>
                        <Col className="w-100">
                            <Row className="hr-between" onClick={() => { props.setMember(userHook) }}>
                                <Heading as="h5" size="xs" className="m-b-0-5">{userHook?.name}</Heading>
                                <Tag>{truncateAddress(userHook?.ownedBy)}</Tag>
                            </Row>
                            <Row className="m-b-0-5 w-100">
                                {props.editingId && (props.editingId == props.item.id) ? (
                                    <Col className="w-100 vr-center">
                                        <Textarea
                                            onChange={(e) => { props.setEditingMessage(e.currentTarget.value) }}
                                            ref={textareaRef}
                                            className="inputElement"
                                            variant="unstyled"
                                            style={{ minHeight: min_textarea_height }}
                                            value={props.editingMessage}
                                            onKeyDown={(event) => props.keyDownMessageUpdate(event)}
                                            placeholder={props.item.text}
                                            height="auto"
                                            rows={1}
                                        />
                                    </Col>
                                ) : (
                                    <TextareaDiv dangerouslySetInnerHTML={{ __html: props.item?.html }} />
                                )}
                            </Row>

                            {props?.item?.message_custom_data ? (
                                <>
                                    {
                                        templateChatPreview()
                                    }
                                </>
                            ) : (<></>)
                            }

                            {/* {templateReactions(item, index)} */}
                        </Col>
                        <Row className="w-100 action">
                            {templateEmoji(props.item, props.index)}
                            <Icon className="circled m-r-0-5" onClick={() => props.setActionMessage({ actionType: "Reply", item: props.item })}>
                                <ReplyIcon width="20" height="20" fill="#e8e8e8" />
                            </Icon>
                            {templateAction(props.item, props.index)}
                        </Row>
                    </Row>
                </Conversation>
            )
        }
    }


    return (
        <>
            {templateChatMessage()}
        </>

    )
}

export default LayoutChatConversation;