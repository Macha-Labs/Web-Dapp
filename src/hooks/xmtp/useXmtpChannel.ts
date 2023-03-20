import { AuthContext } from "@/providers/AuthProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useContext, useState } from "react";

const useXmtpChannel = () => {
    console.log('Rendering >>>>> useXmtpChannel');
    const [channel, setChannel] = useState<any>();
    const $channel = useChatChannelStore((state: any) => state.channel);
    const authContext = useContext(AuthContext)

    const _fetch= async(channel: any) => {
        console.log('useXmtpChannel._fetch', channel?.xmtpRaw);
        const convo = await authContext.xmtpClient.conversations.newConversation(channel?.xmtpRaw?.peerAddress);
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