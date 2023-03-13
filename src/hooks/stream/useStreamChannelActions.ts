import { logger } from "@/helpers/logger";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { StreamMessage$ } from "@/schema/message";

const useStreamChannelActions = (channel: any) => {
  const [messages, setMessages] = useState<any>();
  const chatContext = useContext(ChatContext);
  useEffect(() => {
    logger("channel", "useEffect[channel]", "channel is ", [channel]);
    if (channel) {
      channel?.raw?.markRead();
      _setMessages();
    }
    channel?.raw?.on("message.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("message.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("message.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("reaction.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("reaction.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
      _setMessages();
    });
    channel?.raw?.on("reaction.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
      //   setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("member.added", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging added member event",
        [event]
      );
      chatContext?.streamContext.reloadMembers();
      _setMessages();
    });
    channel?.raw?.on("member.removed", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging remove member event",
        [event]
      );
      chatContext?.streamContext.reloadMembers();
      _setMessages();
    });
  }, [channel]);

  const _setMessages = () => {
    if (channel?.raw?.state?.messageSets[0]?.messages) {
      const messageData = channel?.raw?.state?.messageSets[0]?.messages
        ?.slice(0)
        .map((item: any) => {
          return StreamMessage$(item);
        });
      setMessages(messageData);
    }
  };

  return {
    messages: messages,
  };
};
export default useStreamChannelActions;
