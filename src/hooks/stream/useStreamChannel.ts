import { logger } from "./../../helpers/logger";
import { useState, useEffect} from "react";
import { ChannelStream$ } from "../../schema/channel";

const useStreamChannel = (client: any) => {
  console.log("Checking for useStreamChannel re-rendering");

  const [channel, setChannel] = useState<any>();

  /** 
   * @description Function to setup channel
   * 
   **/
  const setUpChannel = async (channelId: any) => {
    if (channelId) {
      const newChannel = client?.channel("team", channelId, {});
      await newChannel?.watch();
      logger("channel", "setupChannel", "channel data from stream ", [
        newChannel,
      ]);
      setChannel(ChannelStream$(newChannel?.data, newChannel));
    } else {
      setChannel(null);
    }
  };


  /** 
   * @description Watching Channel
   * 
   **/
  

  return {
    setUpChannel: setUpChannel,
    channel: channel,
    pinnedMessages: channel?.raw?.state?.pinnedMessages,
  };
};
export default useStreamChannel;
