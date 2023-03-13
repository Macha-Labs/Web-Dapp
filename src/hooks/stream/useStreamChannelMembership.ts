import { logger } from "@/helpers/logger";
import { Channel$ } from "@/schema/channel";
import { getChannel } from "@/service/ChannelService";
import { addStreamMembers } from "@/service/StreamService";
import { useState } from "react";

const useStreamChannelMembership = () => {
    const [isLoading, setIsLoading] = useState<any>();
    const [channel, setChannel] = useState<any>();


    const fetchChannel = (channelId: any) => {
        getChannel(channelId).then(res => {
            logger('channel', 'useStreamChannelMembership.fetchChannel', 'getting channel from db', [res]);
            setChannel(Channel$(res));
        })
    }

    const triggerMembership = (userAddress: any, channelId: any, callback: any) => {
        setIsLoading(true);
        addStreamMembers({userAddress: userAddress, channelId: channelId}).then(res => {
            console.log("response of join stream channel ", res);
            setIsLoading(false);
            callback();
        })
    }

    return {
        isLoading: isLoading,
        channel: channel,
        fetchChannel: fetchChannel,
        triggerMembership: triggerMembership
    }
}

export default useStreamChannelMembership;