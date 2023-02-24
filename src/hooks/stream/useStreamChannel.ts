import { logger } from "./../../helpers/logger";
import { useState, useEffect, useContext } from "react";
import {
  StreamContext,
  StreamContextType,
} from "../../providers/StreamProvider";
import { ChannelStream$ } from "../../schema/channel";

const useStreamChannel = (client: any) => {
  const [channel, setChannel] = useState<any>();
  const [messages, setMessages] = useState<any>();

  /** 
   * @description Function to setup channel
   * 
   **/
  const setUpChannel = async (channelId: any) => {
    const newChannel = client?.channel("team", channelId, {});
    await newChannel?.watch();
    logger("channel", "setupChannel", "channel data from stream ", [
      newChannel,
    ]);
    setChannel(ChannelStream$(newChannel?.data, newChannel));
  };


  /** 
   * @description Watching Channel
   * 
   **/
  useEffect(() => {
    logger("channel", "useEffect[channel]", "channel is ", [channel]);
    if (channel)
      channel?.raw?.markRead()
      channel?.raw?.on((event: any) => {
        logger("stream", "useEffect", "logging the channel events", [event]);
        logger("stream", "useEffect", "logging the channel Messages", [channel?.raw?.state?.messageSets[0]?.messages]);
        setMessages(channel?.raw?.state?.messageSets[0]?.messages.slice(0));
      });
  }, [channel]);

  return {
    setUpChannel: setUpChannel,
    channel: channel,
    messages: messages || channel?.raw?.state?.messageSets[0]?.messages,
    pinnedMessages: channel?.raw?.state?.pinnedMessages,
  };
};
export default useStreamChannel;
