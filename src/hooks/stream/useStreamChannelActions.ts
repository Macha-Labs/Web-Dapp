import { logger } from "@/helpers/logger";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/providers/ChatProvider";

const useStreamChannelActions = (channel: any) => {
    const [messages, setMessages] = useState<any>();
    const chatContext = useContext(ChatContext);
    useEffect(() => {
        logger("channel", "useEffect[channel]", "channel is ", [channel]);
        if (channel) {
            channel?.raw?.markRead();
            setMessages(null);
        }

        // Message Events
        channel?.raw?.on("message.new", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("message.updated", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("message.deleted", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });

          // Reaction events
          channel?.raw?.on("reaction.new", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the message reaction events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("reaction.updated", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the message reaction events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("reaction.deleted", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging the message reaction events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });

          // Member events
          channel?.raw?.on("member.added", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging added member event", [event]);
            chatContext?.streamContext.reloadMembers();
          });
          channel?.raw?.on("member.removed", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "logging remove member event", [event]);
            chatContext?.streamContext.reloadMembers();
          });

          // Channel notifications events
          chatContext.streamClient?.on("message.new", (event: any) => {
            // logger("stream", "useStreamChannel.useEffect", "Notification New Message", [event]);
          });
      }, [channel]);

      return {
        messages: messages || channel?.raw?.state?.messageSets[0]?.messages,
      }
}
export default useStreamChannelActions;