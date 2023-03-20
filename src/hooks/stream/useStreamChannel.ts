import { useContext, useState } from "react";
import { logger } from "./../../helpers/logger";
import { Channel$ } from "@/schema/channel";
import { AuthContext } from "@/providers/AuthProvider";

const useStreamChannel = () => {
  console.log('Rendering >>>>> useStreamChannel');
  const [channel, setChannel] = useState<any>();
  const authContext = useContext(AuthContext)  

  /** 
   * @description Function to setup channel
   * 
   **/
   const _fetch = async (channelId: any) => {
    if (channelId) {
      const newChannel = authContext.streamClient?.channel("team", channelId, {});
      await newChannel?.watch();
      logger("channel", "_fetch", "channel data from stream ", [
        newChannel,
      ]);
      setChannel(new Channel$('getstream', newChannel));
    } else {
      setChannel(null);
    }
  };
  
  const _remove = () => {
    setChannel(null);
  }

  const _reload = () => {
    _fetch(channel?.id)
}
 
  return {
    _fetch: _fetch,
    _remove: _remove,
    _reload: _reload,
    channel: channel,
    pinnedMessages: channel?.raw?.state?.pinnedMessages,
  };
};
export default useStreamChannel;
