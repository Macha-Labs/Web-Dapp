import { logger, loggerInit } from "@/helpers/logger";
import { StreamContext } from "@/providers/StreamProvider";
import { useContext, useEffect, useState } from "react";
import { Channel$, ChannelStream$ } from "../../schema/channel";

const useStreamUserChannels = () => {
  console.log('Rendering >>>>> useStreamUserChannels');
  const streamContext = useContext(StreamContext);
  const [channels, setChannels] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [selectedChannels, setSelectedChannels] = useState<any>([]) 
  const [actionMessage, setActionMessage] = useState<String>('')

  const fetchUserChannels = async () => {
    loggerInit('useStreamUserChannels.fetchUserChannels', streamContext?.client?.user);
    if (streamContext?.client?.user?.id) {
      
      const filter = {
        type: "team",
        members: { $in: [`${streamContext.client?.user?.id}`] },
      };
      const sort = [{ last_message_at: -1 }];
      setIsLoading(true);
      try {
        let result = await streamContext.client.queryChannels(filter, sort, {
          limit: 30
        });
        let newResult = result?.map((item: any) => {
          return ChannelStream$(item.data, item, streamContext.client?.user?.id);
        })
        setChannels(newResult);
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'channels from stream', [result]);
      } catch (error: any) {
        logger('channel', 'useStreamUserChannels.fetchUserChannels', 'The error is', [error]);
      }
    }
  };

  useEffect(() => {
    logger('channel', 'useStreamUserChannels.useEffect[channels]', 'The channel Data was just updated', [channels]);
  },[channels])

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
