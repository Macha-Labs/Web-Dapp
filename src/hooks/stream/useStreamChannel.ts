import { logger } from "./../../helpers/logger";
import { useState, useEffect, useContext } from "react";
import {
  StreamContext,
  StreamContextType,
} from "../../providers/StreamProvider";
import { ChannelStream$ } from "../../schema/channel";

const useStreamChannel = (channelId: any) => {
  const [channel, setChannel] = useState<any>();
  const [channelMessages, setChannelMessages] = useState<any>(channel?.raw?.state?.messageSets[0]?.messages);
  const streamContext = useContext(StreamContext) as StreamContextType;

  // const commandHook = useCommand();
  // const getChannelMessages = async () => {
  //     const lastMessageId =
  //         channel?.raw?.state?.messageSets[0]?.messages[
  //             channel?.raw?.state?.messageSets[0]?.messages.length - 1
  //         ]?.id;

  //     // TEST: Try making a promise, Flatlist crashing if messages not loaded
  //     const messages = await channel.raw.query({
  //         messages: {limit: 10, id_lte: lastMessageId},
  //     });

  //     console.log("Paginated messages ", messages);
  //     setChannelMessages(messages.messages);
  // };

  const setUpChannel = async () => {
    const newChannel = streamContext?.client?.channel("team", channelId, {});
    await newChannel?.watch();
    logger("channel", "setupChannel", "channel data from stream ", [
      newChannel,
    ]);
    setChannel(ChannelStream$(newChannel?.data, newChannel));
    setChannelMessages(newChannel?.state?.messageSets[0]?.messages);
  };

  useEffect(() => {
    setUpChannel();
  }, [streamContext.client]);

  useEffect(() => {
    if (streamContext.client) {
      setUpChannel();
    }
  }, [channelId]);

  useEffect(() => {
    logger("channel", "useEffect[channel]", "channel is ", [channel]);
    // getChannelMessages();
    // listening to message events
    if (channel)
    channel?.raw?.on((event: any) => {
      console.log("This is a channel event handler log ", event);
      let messages = channelMessages.concat([event?.message]);
      setChannelMessages(messages);
    });
  }, [channel]);

  return {
    channel: channel,
    messages: channelMessages,
    pinnedMessages: channel?.raw?.state?.pinnedMessages,

    // messages: channelMessages,
  };
};
export default useStreamChannel;
