import { logger } from "@/helpers/logger";
import { DataContext } from "@/providers/DataProvider";
import { StreamContext } from "@/providers/StreamProvider";
import { StreamMessage$ } from "@/schema/message";
import { useContext, useEffect, useState } from "react";

const useStreamChannelMessages = () => {
  const [messages, setMessages] = useState<any>([]);
  const streamContext = useContext(StreamContext);
  const dataContext = useContext(DataContext);


  useEffect(() => {
    logger(
      "channel",
      "useStreamChannelMessages.useEffect[channel]",
      "channel is ",
      [streamContext?.hookChannel?.channel]
    );
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
  }, [dataContext?.channel?.id]);

  const _setMessages = () => {
    console.log(streamContext, dataContext, 'EVENT LOG');
    if (dataContext?.channel?.raw?.state?.messageSets[0]?.messages) {
      logger('stream', 'useStreamChannelMessages._setMessages', 'messages are', dataContext?.channel?.raw?.state?.messageSets[0]?.messages)
      const messageData = dataContext?.channel?.raw?.state?.messageSets[0]?.messages
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
