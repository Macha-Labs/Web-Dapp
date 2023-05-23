import { useToast } from "@chakra-ui/react";
import { logger } from "@/helpers/logger";
import { uploadAtIpfsRoot } from "@/helpers/storage/web3storage";
import { newMessageNotification } from "@/service/NotificationService";
import { useContext, useEffect, useRef, useState } from "react";
import { truncateAddress } from "../../helpers";
import { deletePost } from "../../helpers/lens/lens";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import useMention from "../stream/useMention";
import useChatChannelStore from "@/store/useChatChannelStore";
import { deploytoLightHouse } from "@/helpers/storage/lightHouseStorage";

const useChat = () => {
  
  const authContext = useContext(AuthContext) as AuthContextType;
  const $channel = useChatChannelStore((state: any) => state.channel);
  //
  const [chatMeta, setChatMeta] = useState<any>({});
  const [rerenderSwitch, setRerenderSwitch] = useState<any>(false);
  const [streamLoading, setStreamLoading] = useState<any>(false);
  const [attachItem, setAttachItem] = useState<any>();
  const [attachEvent, setAttachEvent] = useState<any>();
  const [reactions, setReactions] = useState<any>({});
  const [actionMessage, setActionMessage] = useState<any>({
    action: "",
    item: {},
    data: {},
  });
  const [selectedMessages, setSelectedMessages] = useState<any>([]);
  const [userObjTyping, setUserObjTyping] = useState<any>();
  const [usersWhoAreTyping, setUsersWhoAreTyping] = useState<any>();
  const [typingMessage, setTypingMessage] = useState<any>();

  const textareaRef = useRef<any>();
  const editMessageRef = useRef<any>(null);

  const hookMention = useMention();
  const toast = useToast();

  // Slash & Widget
  const [slashCmd, setSlashCmd] = useState<any>();
  const [slashCmdValue, setSlashCmdValue] = useState<any>();


  console.log('Rendering >>>>> useChat', textareaRef);

  const slashRun = (command: any) => {
    setSlashCmdValue(command.name);
    setSlashCmd(false);
  };

  const addMessage = async (callback?: any) => {
    console.log('inside add message', actionMessage);
    setStreamLoading(true);
    if (!authContext?.address) {
      setStreamLoading(false);
      throw new Error("Couldn't find a user address");
      return;
    }
    if (slashCmdValue) {
      // const response = await commandHook.run(slashCmdValue, chatMeta?.meta);
      // addMessageToStream({...chatMeta, meta: {...chatMeta.meta, response: response }});
      // setSlashCmdValue("");
    } else {
      if (!textareaRef.current.value && !attachItem) {
        alert("You are not sending anything");
        setStreamLoading(false);
        return;
      }

      let messageData: any = {};
      let msgData: any = {};


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
          mentioned_users: hookMention.mentionList.map(
            (user: any, index: number) => {
              return user?.ownedBy;
            }
          ),
          message_custom_data: msgData,
        };
      }

      if (actionMessage?.action == "REPLY" && actionMessage?.item) {
        messageData = {
          ...messageData,
          ...{
            quoted_message_id: actionMessage.item.id,
            show_in_channel: true,
          },
        };
      }

      if (attachItem) {
        console.log("Here is the attach item", attachItem);
        const fileCid: any = await deploytoLightHouse(attachEvent);
        console.log("The uploaded filedata ", fileCid);
        messageData = {
          ...messageData,
          attachments: [
            {
              type: attachItem.type.split("/")[0],
              asset_url: `https://gateway.lighthouse.storage/ipfs/${fileCid}`,
              thumb_url: `https://gateway.lighthouse.storage/ipfs/${fileCid}`,
              name: attachItem?.name,
            },
          ],
        };
      }

      callback(messageData).then(() => {
        console.log('message sent');
        setRerenderSwitch(!rerenderSwitch);
        setStreamLoading(false);
        setAttachItem(null);
        setActionMessage(null);
        textareaRef.current.value = null;

        
        hookMention.onRefresh();
        setChatMeta(null);
        
      });
      // addMessageToStream(chatMeta);
    }
  };

  const notify = async (messageData: any) => {
    const notificationPayload = {
      topic: "newMessage",
      notification: {
        title: $channel.name,
        body: `${
          authContext.user?.lens?.name ||
          authContext.user?.lens?.handle ||
          authContext.user?.lens?.id ||
          truncateAddress(authContext.user?.lens?.ownedBy)
        }: ${messageData.text}`,
      },
      data: {
        type: "channelMessage",
        name: "Portal New Message",
        channelId: $channel.id,
      },
      android: {
        ttl: 4500,
        priority: "normal",
      },
    };

    await newMessageNotification(notificationPayload); // sending new message notification
  }

  const editMessage = async () => {
    if (!authContext?.address) {
      throw new Error("Couldn't find the user address");
    }
    if (actionMessage?.action !== "EDIT") {
      return;
    }
  };

  const deleteMessage = async (message: any) => {
    if (message?.message_custom_data?.type == "post") {
      // deleting lens post
      await deletePost({
        publicationId: message.message_custom_data?.postID,
      });
    }
  };

  const pinMessage = async (message: any) => {

  };

  const unPinMessage = async (message: any) => {

  };

  const keyDownMessage = async (event: any, callback?: any) => {
    const keycode = event.which || event.keycode;
    console.log("Keycode", keycode, callback);

    if ((keycode == 13 && !event.shiftKey)) {
      event.preventDefault();

      if (textareaRef.current?.value.substring(0, 1) == "/") {
        setSlashCmdValue(textareaRef.current?.value);
        setSlashCmd(false);
        // widgetDrawer.onOpen();
      } else if (textareaRef.current?.value.length > 0 || attachItem) {
        await addMessage(callback);
      }
    }
  };

  const handleEdit = (message: any) => {
    console.log("Editing message body ", message);
    setActionMessage({ action: "EDIT", item: message });
  };

  const handleEditClose = () => {
    setActionMessage(null);
  };

  const handleAttachment = async (attachment: any) => {
    console.log("File event ", attachment);

    const filePicked = attachment.target.files[0];
    setAttachItem(filePicked);
    setAttachEvent(attachment);
  };

  const deleteAttachment = () => {
    setAttachItem(null);
  };

  const handleSearch = (e: any) => {
    setActionMessage({ action: "SEARCH", data: { query: "" } });
  };

  const handleSearchClose = () => {
    setActionMessage(null);
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
    setActionMessage({
      action: "MULTISELECT",
      item: null,
      data: { query: "" },
    });
  };
  const handleMultiSelectClose = () => {
    logger(
      "channel",
      "useStreamChat.handleMultiSelect",
      "Trigger MultiSelectClose",
      []
    );
    setActionMessage(null);
  };
  const handleLongPressSelect = (message: any) => {
    setActionMessage({ action: "LONGPRESS", item: message });
  };
  const handleLongPressSelectClose = () => {
    setActionMessage(null);
  };
  const handleReply = (message: any) => {
    setActionMessage({ action: "REPLY", item: message });
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
    return await $channel.raw.sendReaction(message?.id, {
      type: reaction?.type,
      score: 1,
    });
  };

  const handleReaction = async (reaction: any, message: any) => {
    let result;
    if (message?.own_reactions?.length) {
      let available = false;
      message?.own_reactions?.filter(async (item: any) => {
        if (item.type == reaction.type) {
          available = true;
          result = await $channel?.raw?.deleteReaction(message?.id, reaction.type);
        }
      });
      if (!available) {
        result = sendReaction(reaction, message);
      }
    } else {
      result = sendReaction(reaction, message);
    }
  };

  const onChange = async (event: any, users?: any) => {
    const value = event.target.value;
    setTypingMessage(value);
    const lastChar = value.split("")[value.length - 1];
    if (lastChar == " " || value == "") {
      hookMention.setMentionActive(false);
      setSlashCmd(false);
    }
    if (lastChar == "@") {
      // setSlashCmd(false);
      // hookMention.setMentionActive(true);
      // hookMention.onTrigger(value, users);
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

  useEffect(() => {
    logger(
      "channel",
      "useStreamChat.useEffect[actionMessage]",
      "actionMessage is",
      [actionMessage]
    );
  }, [actionMessage]);

  return {
    // REACTIONS
    reactions: reactions,
    setReactions: setReactions,
    handleReaction: handleReaction,
    rerenderSwitch: rerenderSwitch,
    // MENTIONS
    mentionActive: hookMention.mentionActive,
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
    editMessageRef: editMessageRef,
    attachItem: attachItem,
    streamLoading: streamLoading,
    handleAttachment: handleAttachment,
    deleteAttachment: deleteAttachment,
    actionMessage: actionMessage,
    setActionMessage: setActionMessage,
    setSelectedMessages: setSelectedMessages,
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
    usersWhoAreTyping: usersWhoAreTyping,
    typingMessage: typingMessage,
    setTypingMessage: setTypingMessage,

    // widgetDrawer: widgetDrawer
  };
};

export default useChat;
