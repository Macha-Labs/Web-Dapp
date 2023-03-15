import { logger } from "@/helpers/logger";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamUserChannels from "../stream/useStreamUserChannels";
import useXmtpChannels from "../xmtp/useXmtpChannels";

const useChatChannels = () => {
    console.log('Rendering >>>>> useChatChannels');
    const router = useRouter();
    const hookStreamChannels = useStreamUserChannels();
    const hookXmtpChannels = useXmtpChannels();
    const [channels, setChannels] = useState<any>();

    useEffect(() => {
      logger('channel', 'useEffect[hookStreamChannels.channels]', 'data', [hookStreamChannels.channels]);
      if (hookStreamChannels.channels != (undefined || null)) {
        const result = _fetch();
        setChannels(result)
      }
      
    }, [hookStreamChannels.channels]);

    if (router.pathname == '/chat/dm') {
      useEffect(() => {
        const result = _fetch();
        setChannels(result)
      }, [hookXmtpChannels.channels != (undefined || null)])
    }

    

  const _fetch = () => {
      switch (router.pathname) {
        case "/chat":
          return hookStreamChannels.channels;
        case "/chat/dm":
          return hookXmtpChannels.channels;
      }
    };

  const _reload = () => {
  }
      
  return (
      {
          channels: channels,
          reload: _reload
      }
  )
}

export default useChatChannels;