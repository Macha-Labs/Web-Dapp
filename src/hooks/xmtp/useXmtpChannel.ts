import useChatChannelStore from "@/store/useChatChannelStore";
import { useState } from "react";

const useXmtpChannel = () => {
    console.log('Rendering >>>>> useXmtpChannel');
    const [channel, setChannel] = useState<any>();
    const $channel = useChatChannelStore((state: any) => state.channel);

    const _fetch= (channel: any) => {
        console.log('useXmtpChannel._fetch', channel?.xmtpRaw)
        setChannel(channel);
    }

    const _remove = () => {
        setChannel(null)
    }

    return (
        {
            _fetch: _fetch,
            _remove: _remove,
            channel: channel
        }
    )

}

export default useXmtpChannel;