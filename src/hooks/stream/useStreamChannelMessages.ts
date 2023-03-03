import { logger } from "@/helpers/logger";
import { useEffect, useState } from "react";

const useStreamChannelMessages = (channel: any) => {
    const [messages, setMessages] = useState<any>();

    useEffect(() => {
        logger("channel", "useEffect[channel]", "channel is ", [channel]);
        if (channel)
          channel?.raw?.markRead();
          channel?.raw?.on("message.new", (event: any) => {
            logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("message.updated", (event: any) => {
            logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
          channel?.raw?.on("message.deleted", (event: any) => {
            logger("stream", "useStreamChannel.useEffect", "logging the channel events", [event]);
            setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
          });
      }, [channel]);

      return {
        messages: messages || channel?.raw?.state?.messageSets[0]?.messages,
      }
}
export default useStreamChannelMessages;