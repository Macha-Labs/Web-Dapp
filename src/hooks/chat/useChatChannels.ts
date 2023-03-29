import useChatChannelsStore from "@/store/useChatChannelsStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";
import { useEffect} from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannels = (from?: any) => {
    console.log(`Rendering >>>>> useChatChannels`);
    const router = useRouter();
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const $loadChannel = useChatChannelStore(((state: any) => state.load))
    const $loadChannels = useChatChannelsStore(((state: any) => state.load))

    // stream
    useEffect(() => {
      console.log('Rendering >>>>> useChatChannels >>>>>> for stream', hookStreamChannels.channels);
      if (router.pathname == '/chat') {
        $loadChannels(hookStreamChannels.channels);
      }
    }, [hookStreamChannels.channels]);

    // xmtp
    useEffect(() => {
      console.log('Rendering >>>>> useChatChannels >>>>>> for xmtp', hookXmtpChannels.channels);
      if (router.pathname == '/chat/dm') {
        $loadChannels(hookXmtpChannels.channels);
      }
    }, [hookXmtpChannels.channels])
    
    const _load = async () => {
      console.log('Rendering >>>>> useChatChannels.load');
      $loadChannels(null);
      switch (router.pathname) {
        case "/chat":
          console.log("Executing fetchUserChannels function");
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