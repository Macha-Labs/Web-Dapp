import { loggerInit } from "@/helpers/logger";
import useChatChannelsStore from "@/store/useChatChannelsStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannelsReload = () => {
    const storeLoad = useChatChannelsStore(((state: any) => state.load))
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const router = useRouter();
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {
        loggerInit('useChatChannelsReload.useEffect');
        if (loading) {
            setLoading(false);
            if (router.pathname == '/chat')
                storeLoad(hookStreamChannels.channels);
            if (router.pathname == '/chat/dm')
                storeLoad(hookXmtpChannels.channels);
        }
    }, [hookStreamChannels.channels, hookXmtpChannels.channels])

    const _load = async () => {
        loggerInit('useChatChannelsReload._load');
        setLoading(true);
        switch (router.pathname) {
          case "/chat":
            hookStreamChannels.fetchUserChannels()
          case "/chat/dm":
            hookXmtpChannels.fetch()
        }
      }
    

    return (
        {
            load: _load
        }
    )
}

export default useChatChannelsReload;