import { useEffect, useState } from "react";
import { Channel$, ChannelStream$ } from "../../schema/channel";

const useStreamUserChannels = () => {
  const [channels, setChannels] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const fetchUserChannels = async (client: any, callback?: any) => {
    console.log("Checking if ", client);
    if (client) {
      const filter = {
        type: "team",
        members: { $in: [`${client?.user?.id}`] },
      };
      const sort = [{ last_message_at: -1 }];
      setIsLoading(true);
      console.log("StreamAuth step 4", client?.user?.id);
      try {
        let result = await client.queryChannels(filter, sort, {
          watch: true,
          state: true,
        });
        console.log("User channel results ", result);
        setChannels(
          result.map((item: any, index: number) => {
            return ChannelStream$(item.data, item);
          })
        );
        callback(
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
