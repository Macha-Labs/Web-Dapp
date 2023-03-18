import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";
import { useEffect} from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannels = () => {
    console.log('Rendering >>>>> useChatChannels');
    const router = useRouter();
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const $loadChannel = useChatChannelStore(((state: any) => state.load))
    const $loadChannels = useChatChannelsStore(((state: any) => state.load))

    useEffect(() => {
      if (router.pathname == '/chat')
      $loadChannels(hookStreamChannels.channels);
      $loadChannel(null)
      if (router.pathname == '/chat/dm')
      $loadChannels(hookXmtpChannels.channels);
      $loadChannel(null);
    }, [hookStreamChannels.channels, hookXmtpChannels.channels])
    
    const _load = async () => {
      switch (router.pathname) {
        case "/chat":
          hookStreamChannels.fetchUserChannels()
          break;
        case "/chat/dm":
          hookXmtpChannels.fetch();
          break;
      }
    }
        
    return (
        {
            load: _load
        }
    )
}

export default useChatChannels;