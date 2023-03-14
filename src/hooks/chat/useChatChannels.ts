import { StreamContext } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const useChatChannels = () => {
    const router = useRouter();
    const streamContext = useContext(StreamContext);
    const xmtpContext = useContext(XmtpContext);
    const [channels, setChannels] = useState<any>();

    const _fetchChannels = () => {
        switch (router.pathname) {
          case "/chat":
            console.log("all conversations", streamContext?.hookChannels.channels);
            return streamContext?.hookChannels.channels;
          case "/chat/dm":
            console.log("all conversations", xmtpContext.allConversations);
            return xmtpContext.allConversations;
        }
      };

    const _reloadChannels = () => {
      streamContext.reloadChannelList();
    }

    useEffect(() => {
        console.log('Reading channels from stream');
        if (streamContext?.hookChannels.channels != (undefined || null)) {
          const result = _fetchChannels();
          setChannels(result)
        }
        
    }, [streamContext?.hookChannels.channels])

    useEffect(() => {
        const result = _fetchChannels();
        setChannels(result)
    }, [xmtpContext.allConversations != (undefined || null)])

      
    return (
        {
            channels: channels,
            reloadChannels: _reloadChannels
        }
    )
}

export default useChatChannels;