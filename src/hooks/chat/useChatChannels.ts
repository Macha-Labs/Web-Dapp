import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannels = () => {
    console.log('Rendering >>>>> useChatChannels');
    const router = useRouter();
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const dataContext = useContext(DataContext);

    useEffect(() => {
      if (router.pathname == '/chat')
        dataContext?.loadChannels(hookStreamChannels.channels);
        dataContext?.loadChannel(null)
      if (router.pathname == '/chat/dm')
        dataContext?.loadChannels(hookXmtpChannels.channels);
        dataContext?.loadChannel(null);
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
            channels: dataContext.channels,
            load: _load
        }
    )
}

export default useChatChannels;