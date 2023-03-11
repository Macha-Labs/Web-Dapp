import { logger } from "@/helpers/logger";
import { StreamMessage$ } from "@/schema/message";
import { useEffect, useState } from "react";

const useStreamChannelMessages = (channel: any) => {
  const [messages, setMessages] = useState<any>();

  useEffect(() => {
    logger(
      "channel",
      "useStreamChannelMessages.useEffect[channel]",
      "channel is ",
      [channel]
    );
    if (channel) {
      channel?.raw?.markRead();
      setMessages(null);
    }
    channel?.raw?.on("message.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("message.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("message.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("reaction.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("reaction.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
    channel?.raw?.on("reaction.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
    });
  }, [channel]);
  console.log(channel?.raw?.state?.messageSets[0]?.messages, "STREAM MESSAGE");

  return {
    messages: StreamMessage$(
      messages || channel?.raw?.state?.messageSets[0]?.messages
    ),
  };
};
export default useStreamChannelMessages;
