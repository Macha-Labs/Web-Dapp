import { ChannelEvents } from "@/data/types";
import { logger } from "@/helpers/logger";
import { StreamMessage$ } from "@/schema/message";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useEffect, useState } from "react";

const useStreamChannelMessages = () => {
  console.log('Rendering >>>>> useStreamChannelMessages');
  const [messages, setMessages] = useState<any>([]);
  const $channel = useChatChannelStore((state: any) => state.channel);

  const customChannelEventTrigger = async(eventType: ChannelEvents, text: any = "") => {
    const channelEvent = await $channel.raw?.sendEvent({
      type: JSON.stringify(eventType),
      text: text
    }); 
    console.log("Custom channel event triggered ", channelEvent);
  }

  useEffect(() => {
    logger(
      "channel",
      "useStreamChannelMessages.useEffect[channel]",
      "channel is ",
      [$channel]
    );
    if ($channel.source != 'getstream')
      return;
    
    _watch();

  }, [$channel?.id]);

  const _watch = () => {
    $channel.raw?.on("message.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>> new",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    $channel.raw?.on("message.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>>> updated",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    $channel.raw?.on("message.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>>> deleted",
        "logging the channel events",
        [event]
      );
      _setMessages();
    });
    $channel.raw?.on("reaction.new", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>> reaction new",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
    $channel.raw?.on("reaction.updated", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>>> reaction updated",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
    $channel.raw?.on("reaction.deleted", (event: any) => {
      logger(
        "stream",
        "useStreamChannel.useEffect >>>>> reaction deleted",
        "logging the message reaction events",
        [event]
      );
      _setMessages();
    });
  }

  const _setMessages = () => {
    if ($channel.raw?.state?.messageSets[0]?.messages) {
      logger('stream', 'useStreamChannelMessages._setMessages', 'messages are', $channel.raw?.state?.messageSets[0]?.messages)
      const messageData = $channel.raw?.state?.messageSets[0]?.messages
        ?.slice(0)
        .map((item: any) => {
          return StreamMessage$(item);
        });
      setMessages(messageData);
    }
  };

  return {
    messages: messages,
    fetch: _setMessages,
    customChannelEventTrigger: customChannelEventTrigger
  };
};
export default useStreamChannelMessages;
