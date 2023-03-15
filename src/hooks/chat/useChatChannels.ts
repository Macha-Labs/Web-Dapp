import useChatChannelsStore from "@/store/useChatChannelsStore";
import { useRouter } from "next/router";
import { useEffect} from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannels = () => {
    console.log('Rendering >>>>> useChatChannels');
    const router = useRouter();
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const storeChannels = useChatChannelsStore((state: any) => state.channels)
    const storeLoad = useChatChannelsStore(((state: any) => state.load))

    useEffect(() => {
      if (router.pathname == '/chat')
        storeLoad(hookStreamChannels.channels);
      if (router.pathname == '/chat/dm')
        storeLoad(hookXmtpChannels.channels);
    }, [hookStreamChannels.channels, hookXmtpChannels.channels])
    
    const _load = async () => {
      switch (router.pathname) {
        case "/chat":
          hookStreamChannels.fetchUserChannels()
        case "/chat/dm":
          hookXmtpChannels.fetch()
      }
    }
        
    return (
        {
            channels: storeChannels,
            load: _load
        }
    )
}

export default useChatChannels;