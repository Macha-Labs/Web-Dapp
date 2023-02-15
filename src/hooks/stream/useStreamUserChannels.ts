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
      try {
        let result = await client.queryChannels(filter, sort, {
          watch: true,
          state: true,
        });
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The channel Data was just updated', [result])
        setChannels(
          result.map((item: any, index: number) => {
            return ChannelStream$(item.data, item);
          })
        );
      } catch (e) {
        console.log("StreamAuth Step 6", e);
      }
    }
  };

  return {
    channels: channels,
    fetchUserChannels: fetchUserChannels,
  };
};
export default useStreamUserChannels;
