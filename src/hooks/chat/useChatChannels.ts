import { logger } from "@/helpers/logger";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";

const useChatChannels = () => {
    console.log('Rendering >>>>> useChatChannels');
    const router = useRouter();
    const xmtpContext = useContext(XmtpContext);
    const hookStreamChannels = useStreamUserChannels();
    const [channels, setChannels] = useState<any>();

    useEffect(() => {
      logger('channel', 'useEffect[hookStreamChannels.channels]', 'data', [hookStreamChannels.channels]);
      if (hookStreamChannels.channels != (undefined || null)) {
        const result = _fetchChannels();
        setChannels(result)
      }
      
    }, [hookStreamChannels.channels]);

    if (router.pathname == '/chat/dm') {
      useEffect(() => {
        const result = _fetchChannels();
        setChannels(result)
      }, [xmtpContext.allConversations != (undefined || null)])
    }

    

  const _fetchChannels = () => {
      switch (router.pathname) {
        case "/chat":
          return hookStreamChannels.channels;
        case "/chat/dm":
          return xmtpContext.allConversations;
      }
    };

  const _reloadChannels = () => {
    const result = hookStreamChannels.fetchUserChannels();
    setChannels(result);
  }
      
  return (
      {
          channels: channels,
          reload: _reloadChannels
      }
  )
}

export default useChatChannels;