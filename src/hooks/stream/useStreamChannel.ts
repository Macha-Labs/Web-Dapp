import { useState } from "react";
import { StreamChat } from "stream-chat";
import { logger } from "./../../helpers/logger";
import { config } from "../../config";
import { Channel$ } from "@/schema/channel";

const useStreamChannel = (client: any) => {
  console.log('Rendering >>>>> useStreamChannel');

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
      setChannel(new Channel$('getstream', newChannel));
    } else {
      setChannel(null);
    }
  };


  /** 
   * @description Watching Channel
   * 
   **/
  const getChannel = async(channelId: any) => {
    if (channelId) {
      const newClient = StreamChat.getInstance(`${config.STREAM_APIKEY}`)
      await newClient.connectAnonymousUser();
      const newChannel = await newClient?.queryChannels({id: {$eq: channelId}});
      logger("channel", "getChannel", "channel data from stream ", [
        newChannel,
      ]);
    }
  }
  
  const removeChannel = () => {
    setChannel(null);
  }
 
  return {
    setUpChannel: setUpChannel,
    getChannel: getChannel,
    removeChannel: removeChannel,
    channel: channel,
    pinnedMessages: channel?.raw?.state?.pinnedMessages,
  };
};
export default useStreamChannel;
