import { logger } from "@/helpers/logger";
import { useEffect, useState } from "react";
import { Channel$, ChannelStream$ } from "../../schema/channel";

const useStreamUserChannels = (client: any) => {
  const [channels, setChannels] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [selectedChannels, setSelectedChannels] = useState<any>([]) 
  const [actionMessage, setActionMessage] = useState<String>('')

  const fetchUserChannels = async ( passClient?: any ,callback?: any) => {
 
    if (client || passClient) {
      console.log("fetchUserChannels", true);
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
          return ChannelStream$(item.data, item, client?.user?.id);
        })
        setChannels(newResult)

        logger('channelTest', 'useStreamUserChannels.fetchUserChannels', 'The channel Data was just updated', [result])
      } catch (error: any) {
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The error is', [error]);
      }
      
    } else {
      console.log("fetchUserChannels", false);
      
    }
  };

  // useEffect(() => {
  //   fetchUserChannels()
  // },[])

  useEffect(() => {
    console.log("Channels", "hook",channels);
  }, [channels])

  const handleChannelAction = (action: String) => {
    setActionMessage(action)
  }

  const handleSelectChannel = (channel: any) => {
    if (selectedChannels.includes(channel.id)) {
      setSelectedChannels(
        selectedChannels.filter((id: any) => id !== channel.id)
      );
    } else {
      setSelectedChannels([...selectedChannels, channel.id]);
    }
    
  }

  return {
    channels: channels,
    fetchUserChannels: fetchUserChannels,
    selectedChannels: selectedChannels,
    handleSelectChannel: handleSelectChannel,
    handleChannelAction: handleChannelAction,
    actionMessage: actionMessage
  };
};
export default useStreamUserChannels;
