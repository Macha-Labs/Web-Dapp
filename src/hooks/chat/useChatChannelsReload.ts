import { loggerInit } from "@/helpers/logger";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannelsReload = () => {
    console.log('Rendering >>>>> useChatChannelsReload');
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const router = useRouter();
    const [loading, setLoading] = useState<any>(false);
    const $loadChannels = useChatChannelsStore(((state: any) => state.load))

    useEffect(() => {
        loggerInit('useChatChannelsReload.useEffect');
        if (loading) {
            setLoading(false);
            if (router.pathname == '/chat')
                $loadChannels(hookStreamChannels.channels);
            if (router.pathname == '/chat/dm')
                $loadChannels(hookXmtpChannels.channels);
        }
    }, [hookStreamChannels.channels, hookXmtpChannels.channels])

    const _load = async () => {
        loggerInit('useChatChannelsReload._load');
        setLoading(true);
        switch (router.pathname) {
          case "/chat":
            hookStreamChannels.fetchUserChannels();
            break;
          case "/chat/dm":
            loggerInit('for xmtp');
            hookXmtpChannels.fetch()
            break;
        }
      }
    

    return (
        {
            load: _load
        }
    )
}

export default useChatChannelsReload;