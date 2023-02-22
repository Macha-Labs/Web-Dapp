import { logger } from "@/helpers/logger";
import { useEffect, useState } from "react";
import { Channel$, ChannelStream$ } from "../../schema/channel";

const useStreamUserChannels = () => {
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
        let result = await client.queryChannels(filter, sort, {
          limit: 15
        });
        let newResult = result?.map((item: any) => {
          return ChannelStream$(item.data, item);
        })
        setChannels(newResult)

        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The channel Data was just updated', [result])
      } catch (error: any) {
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The error is', [error]);
      }
      
    }
  };

  return {
    channels: channels,
    fetchUserChannels: fetchUserChannels,
  };
};
export default useStreamUserChannels;
