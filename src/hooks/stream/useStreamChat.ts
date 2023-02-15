import { useContext, useState, useRef } from "react";
import { truncateAddress } from "../../helpers";
import { deletePost } from "../../helpers/lens/lens";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { StreamContext, StreamContextType } from "../../providers/StreamProvider";
// import { newMessageNotification } from "../../service/NotificationService";
// import useChatFilters from "../useChatFilters";
import useMention from "./useMention";
// import useCommand from "./useCommand";

const useStreamChat = (channel: any, users?: any, callback?: any) => {
    const authContext = useContext(AuthContext) as AuthContextType;
    const streamContext = useContext(StreamContext) as StreamContextType;
    const [chatMeta, setChatMeta] = useState<any>({});
    const [rerenderSwitch, setRerenderSwitch] = useState<any>(false);
    const [attachLoading, setAttachLoading] = useState<any>();
    const [attachItem, setAttachItem] = useState<any>();
    const [reactions, setReactions] = useState<any>({});
    const [actionMessage, setActionMessage] = useState<any>({
        action: "",
        item: {},
    });
    const [selectedMessages, setSelectedMessages] = useState<any>([]);
    const [userObjTyping, setUserObjTyping] = useState<any>();
    const [searchActive, setSearchActive] = useState<any>();
    const [searchQuery, setSearchQuery] = useState<any>();

    const textareaRef = useRef<any>(null);

    // custom hooks
    // const chatFilterHook = useChatFilters(users);
    const hookMention = useMention();

    // Slash & Widget
    const [slashCmd, setSlashCmd] = useState<any>();
    const [slashCmdValue, setSlashCmdValue] = useState<any>();

    const slashRun = (command: any) => {
        setSlashCmdValue(command.name);
        setSlashCmd(false);
        textareaRef.current = "";
    };

    const searchMessage = () => {};

    // channel?.raw.on('typing.start', event => {
    //   console.log("User is typing");
    //     setUserObjTyping(event?.user?.handle);
    // });

    // channel?.raw.on('typing.stop', event => {
    //   console.log("User has stopped typing");
    //     setUserObjTyping(null);
    // });

    const addMessage = async () => {
        if (!authContext?.address) {
            console.log("Didn't find user address");
            return;
        }
        if (slashCmdValue) {
            console.log("Logic to run a slash command");
            // console.log("Called slash cmd", slashCmdValue);
            // const response = await commandHook.run(slashCmdValue, chatMeta?.meta);
            // console.log(response);
            // addMessageToStream({...chatMeta, meta: {...chatMeta.meta, response: response }});
            // setSlashCmdValue("");
        } else {
            if (!textareaRef.current.value) {
                alert("The Message input shouldn't be empty");
                return;
            }

            addMessageToStream(chatMeta);
        }
    };

    // useEffect(() => {
    //     if (attachItem) {
    //         console.log("Message from useStreamChat ", attachItem);
    //     }
    // }, [attachItem]);

    const addMessageToStream = async (msgData?: any) => {
        try {
            let messageData: any = {};
            if (actionMessage?.action == "FORWARD") {
                messageData = {
                    text: actionMessage?.item?.text,
                    mentioned_users: actionMessage?.item.mentioned_users,
                    message_custom_data: {
                        ...msgData,
                        forwarded: true,
                        fromChannel: actionMessage?.item?.cid,
                        ownerId: actionMessage?.item?.user?.id,
                    },
                };
            } else {
                messageData = {
                    text: textareaRef.current?.value,
                    mentioned_users: hookMention.mentionList.map((user: any, index: number) => {
                        console.log("MessageData", user);
                        return user?.ownedBy;
                    }),
                    message_custom_data: msgData,
                };
            }

            console.log("The messageData is ", messageData);

            if (actionMessage?.action == "REPLY" && actionMessage?.item) {
                messageData = {
                    ...messageData,
                    ...{
                        parent_id: actionMessage.item.id,
                        show_in_channel: true,
                    },
                };
            }

            if (attachItem) {
                // const fileCid = await storeFiles([attachItem]);
                console.log(attachItem);
                messageData = {
                    ...messageData,
                    attachments: [
                        {
                            type: attachItem.type.split("/")[0],
                            asset_url: `https://ipfs.io/ipfs/${attachItem?.cid}`,
                            thumb_url: `https://ipfs.io/ipfs/${attachItem?.cid}`,
                            name: attachItem?.name,
                        },
                    ],
                };
            }
            console.log("connected channel", channel);
            console.log("Sending messsageData is ", messageData);
            await channel.raw.sendMessage(messageData); // sending a new message
            setRerenderSwitch(!rerenderSwitch);
            const notificationPayload = {
                topic: "newMessage",
                notification: {
                    title: channel.name,
                    body: `${authContext.user?.lens?.name || authContext.user?.lens?.handle || authContext.user?.lens?.id || truncateAddress(authContext.user?.lens?.ownedBy)}: ${messageData.text}`
                },
                data: {
                    type: "channelMessage",
                    name: "Portal New Message",
                    channelId: channel.id
                },
                android: {
                    ttl: 4500,
                    priority: "normal"
                }
            }
            hookMention.onRefresh();
            setChatMeta(null);
            // await newMessageNotification(notificationPayload); // sending new message notification
        } catch (error) {
            console.log("Could not send message", error);
        }
        textareaRef.current.value = ""
        setAttachItem(null);
        setActionMessage(null);
    };

    const editMessage = async () => {
        if (!authContext?.address) {
            console.log("Wallet is not connected");
            return;
        }
        if (actionMessage?.action !== "EDIT") {
            return;
        }
        await streamContext.client.updateMessage({
            id: actionMessage.item?.id,
            text: textareaRef,
        });
    };

    const deleteMessage = async (message: any) => {
        if (message?.message_custom_data?.type == "post") {
            // deleting lens post
            await deletePost({
                publicationId: message.message_custom_data?.postID,
            });
        }

        streamContext.client.deleteMessage(message?.id, true);
        // callback();
        console.log("Message deleted");
    };

    const pinMessage = async (message: any) => {
        await streamContext.client.pinMessage(message, null);
        // callback();
        console.log("Pinned a message");
    };

    const unPinMessage = async (message: any) => {
        await streamContext.client.unpinMessage(message);
        // callback();
        console.log("Un-Pinned a message");
    };

    const getPinnedMessages = async () => {
        const channelState = await channel.raw.query();
        const pinnedMessages = channelState.pinned_messages;
        console.log(
            "These messages are pinned in current channel ",
            pinnedMessages
        );
        return pinnedMessages;
    };

    const keyDownMessage = async (event: any) => {
        const keycode = event.which || event.keycode;
        if (keycode == 13 && !event.shiftKey) {
            event.preventDefault();

            if (textareaRef.current.value.substring(0, 1) == '/') {
                setSlashCmdValue(textareaRef.current.value);
                setSlashCmd(false);
                textareaRef.current.value = "";
                // widgetDrawer.onOpen();
            } else {
                await addMessage();
            }
        }
        else if (event.key == "/") {
            console.log("slash key was pressed");
            setSlashCmd(true);
        }
    };

    const handleEdit = (message: any) => {
        setActionMessage({action: "EDIT", item: message});
    };

    const handleEditClose = () => {
        setActionMessage(null);
    };

    const handleAttachment = async (attachment: any) => {
        setAttachLoading(true);
        setAttachItem(attachment);
        setAttachLoading(false);
    };

    const deleteAttachment = () => {
        setAttachItem(null);
    };

    const handleSearch = (e: any) => {
        setSearchActive(true);
        setSearchQuery("");
    };

    const handleSearchClose = () => {
        setSearchActive(false);
        setSearchQuery("");
    };

    const handleSelect = (message: any) => {
        // This checks if the message is already selected and removes it from the array if the user tries to uncheck it
        if (selectedMessages.includes(message.id)) {
            setSelectedMessages(
                selectedMessages.filter((id: any) => id !== message.id)
            );
        } else {
            setSelectedMessages([...selectedMessages, message.id]);
        }
        // setActionMessage({ ...actionMessage, item: result });
    };

    const handleMultiSelect = () => {
        setActionMessage({action: "MULTISELECT", item: null});
    };
    const handleMultiSelectClose = () => {
        setActionMessage(null);
    };
    const handleLongPressSelect = (message: any) => {
        console.log("Pressed long press button");
        setActionMessage({action: "LONGPRESS", item: message});
    };
    const handleLongPressSelectClose = () => {
        setActionMessage(null);
    };
    const handleReply = (message: any) => {
        setActionMessage({action: "REPLY", item: message});
    };

    const handleReplyClose = () => {
        setActionMessage(null);
    };

    const handleCopy = (message: any) => {
        // onCopy(message.text);
        // handleLongPressSelectClose();
        // toast.show({
        //     title: "Copied to clipboard",
        //     placement: "bottom",
        // });
    };

    const sendReaction = async (reaction: any, message: any) => {
        return await channel.raw.sendReaction(message?.id, {
            type: reaction?.type,
            score: message.reaction_scores[reaction.type]
                ? message.reaction_scores[reaction?.type] + 1
                : 1,
        });
    };

    const handleReaction = async (reaction: any, message: any) => {
        console.log(reaction);
        console.log(message);
        let result;
        if (message.own_reactions.length) {
            let available = false;
            message.own_reactions.filter(async (item: any) => {
                if (item.type == reaction.type) {
                    available = true;
                    console.log("Got existing reaction");
                    result = await channel.raw.deleteReaction(
                        message?.id,
                        reaction.type
                    );
                    console.log("Reactions ", result);
                }
            });
            if (!available) {
                result = sendReaction(reaction, message);
                console.log("Reactions ", result);
            }
        } else {
            result = sendReaction(reaction, message);
            console.log("Reactions ", result);
        }
    };

    const onChange = async (event: any, users?: any) => {
        const value = event.target.value;
        console.log("Typing value is ", textareaRef.current.value);
        const lastChar = value.split("")[value.length - 1];
        if (lastChar == " " || value == "") {
            console.log("set isTyping to false");
            hookMention.setIsActive(false);
            setSlashCmd(false);
        }
        if (lastChar == "@") {
            console.log("set isTyping to true");
            setSlashCmd(false);
            hookMention.setIsActive(true);
        }
        if (hookMention.isActive) {
            hookMention.onTrigger(value, users);
        }

        if (slashCmd) {
            const cmds = value.split(" ");
            // chatFilterHook.setSlashCmdFilter(
            //     cmds[cmds.length - 1].substring(1)
            // );
        }
        // await channel.keystroke();
    };

    const mentionSelect = (user: any) => {
        console.log("The cliked value ", user);
        const msg = textareaRef.current.value;
        const result =
            textareaRef.current.value.substr(
                0,
                msg.length - hookMention.mention.length
                // msg.length
            ) + user.name;
        textareaRef.current = result;
        hookMention.onSelect(user);
    };

    return {
        // REACTIONS
        reactions: reactions,
        setReactions: setReactions,
        handleReaction: handleReaction,
        rerenderSwitch: rerenderSwitch,
        // MENTIONS
        mentionActive: hookMention.isActive,
        mentionList: hookMention.mentionList,
        mentionSelect: mentionSelect,
        //
        userObjTyping: userObjTyping,
        onChange: onChange,
        addMessage: addMessage,
        editMessage: editMessage,
        deleteMessage: deleteMessage,
        // PINS
        pinMessage: pinMessage,
        unPinMessage: unPinMessage,
        //
        keyDownMessage: keyDownMessage,
        textareaRef: textareaRef,
        attachItem: attachItem,
        attachLoading: attachLoading,
        handleAttachment: handleAttachment,
        deleteAttachment: deleteAttachment,
        actionMessage: actionMessage,
        setActionMessage: setActionMessage,
        setSelectedMessages:setSelectedMessages,
        // transactionModal: transactionModal,
        chatMeta: chatMeta,
        setChatMeta: setChatMeta,
        slashCmd: slashCmd,
        setSlashCmd: setSlashCmd,
        // slashCmds: chatFilterHook.slashCmds,
        slashCmdValue: slashCmdValue,
        setSlashCmdValue: setSlashCmdValue,
        slashRun: slashRun,
        handleSearch: handleSearch,
        handleSearchClose: handleSearchClose,
        searchActive: searchActive,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        handleMultiSelect: handleMultiSelect,
        handleMultiSelectClose: handleMultiSelectClose,
        handleLongPressSelect: handleLongPressSelect,
        handleLongPressSelectClose: handleLongPressSelectClose,
        handleReply: handleReply,
        handleReplyClose: handleReplyClose,
        handleCopy: handleCopy,
        handleEdit: handleEdit,
        handleEditClose: handleEditClose,
        handleSelect: handleSelect,
        selectedMessages: selectedMessages,
        // widgetDrawer: widgetDrawer
    };
};

export default useStreamChat;
