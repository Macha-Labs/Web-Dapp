import { logger } from "@/helpers/logger";
import { StreamMessage$ } from "@/schema/message";
import { useEffect, useState } from "react";

const useStreamChannelMessages = (channel: any) => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    logger(
      "channel",
      "useStreamChannelMessages.useEffect[channel]",
      "channel is ",
      [channel]
    );
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
    });
    channel?.raw?.on("message.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    channel?.raw?.on("message.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    channel?.raw?.on("reaction.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
    channel?.raw?.on("reaction.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
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
    });
  }, [channel]);


  const _setMessages = () => {
    if (channel?.raw?.state?.messageSets[0]?.messages) {
      const messageData = channel?.raw?.state?.messageSets[0]?.messages?.slice(0).map(
        (item: any) => {
          console.log("if", item, StreamMessage$(item));

          return StreamMessage$(item);
        }
      );
      setMessages(messageData);
    }
  };


  return {
    messages: messages,
  };
};
export default useStreamChannelMessages;
