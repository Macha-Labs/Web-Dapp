import { fetchChannelsForOrg } from "../../service/ChannelService";
import { useState, useEffect } from "react";
import { Channel$ } from "../../schema/channel";
import { logger } from "@/helpers/logger";

const useOrgChannels = (orgId: any) => {
  const [isLoading, setIsLoading] = useState<any>();
  const [channels, setChannels] = useState<any>([]);

  const getChannels = (activeChannel = null) => {
    setIsLoading(true);
    fetchChannelsForOrg(orgId).then((data) => {
      const result = data.map((item: any) => {
        return Channel$(item);
      });
      logger('channel', 'useOrgChannels.getChannels', 'org channels are', [result])
      setChannels(result);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getChannels();
  }, [orgId]);

  return {
    channels: channels
  }
};
export default useOrgChannels;
