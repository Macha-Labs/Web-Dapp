import { logger } from "@/helpers/logger";
import { StreamContext } from "@/providers/StreamProvider";
import { StreamMessage$ } from "@/schema/message";
import { useContext, useEffect, useState } from "react";

const useStreamChannelMessages = () => {
  const [messages, setMessages] = useState<any>([]);
  const streamContext = useContext(StreamContext);


  useEffect(() => {
    logger(
      "channel",
      "useStreamChannelMessages.useEffect[channel]",
      "channel is ",
      [streamContext?.hookChannel?.channel]
    );
    // streamContext?.hookChannel?.channel?.raw?.stopWatching();
    if (streamContext?.hookChannel?.channel && !streamContext?.hookChannel?.channel?.raw?.disconnected) {
      streamContext?.hookChannel?.channel?.raw?.markRead();
      _setMessages();
    }
    streamContext?.hookChannel?.channel?.raw?.on("message.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    streamContext?.hookChannel?.channel?.raw?.on("message.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    streamContext?.hookChannel?.channel?.raw?.on("message.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    streamContext?.hookChannel?.channel?.raw?.on("reaction.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
    streamContext?.hookChannel?.channel?.raw?.on("reaction.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
    streamContext?.hookChannel?.channel?.raw?.on("reaction.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
  }, [streamContext?.hookChannel?.channel?.id]);

  const _setMessages = () => {
    if (streamContext?.hookChannel?.channel?.raw?.state?.messageSets[0]?.messages) {
      logger('stream', 'useStreamChannelMessages._setMessages', 'messages are', streamContext?.hookChannel?.channel?.raw?.state?.messageSets[0]?.messages)
      const messageData = streamContext?.hookChannel?.channel?.raw?.state?.messageSets[0]?.messages
        ?.slice(0)
        .map((item: any) => {
          return StreamMessage$(item);
        });
      setMessages(messageData);
    }
  };

  return {
    messages: messages,
    fetch: _setMessages
  };
};
export default useStreamChannelMessages;
