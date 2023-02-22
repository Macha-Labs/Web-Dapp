import { logger } from "@/helpers/logger";
import { useEffect, useState } from "react";
import { Channel$, ChannelStream$ } from "../../schema/channel";

const useStreamUserChannels = () => {
  const [channelsRaw, setChannelsRaw] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const fetchUserChannels = async (client: any, callback?: any) => {
    if (client) {
      const filter = {
        type: "team",
        members: { $in: [`${client?.user?.id}`] },
      };
      const sort = [{ last_message_at: -1 }];
      setIsLoading(true);
      let result: any;
      try {
        let result = await client?.queryChannels(filter, sort, {
          watch: true,
          state: true,
        })
        setChannelsRaw(result);
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The channel Data was just updated', [result])
      } catch (error: any) {
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The error is', [error]);
        throw new Error("Error in fetching user Channels ", error);
      }
      
    }
  };

  useEffect(() => {
    // setChannels(channelsRaw?.map((item: any) => {
    //   return ChannelStream$(item.data, item);
    // }))
  }, [channelsRaw])

  return {
    channels: channels,
    fetchUserChannels: fetchUserChannels,
  };
};
export default useStreamUserChannels;
