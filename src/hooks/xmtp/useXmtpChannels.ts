import { logger } from "@/helpers/logger";
import { AuthContext } from "@/providers/AuthProvider";
import { Channel$ } from "@/schema/channel";
import { useContext, useEffect, useState } from "react";
import useLensProfileList from "../lens/useLensProfileList";

const useXmtpChannels = () => {
  console.log('Rendering >>>>> useXmtpChannels');
  const authContext = useContext(AuthContext);
  const [allConversations, setAllConversations] = useState<any>();
  const [rawConversations, setRawConversations] = useState<any>();
  const hookLensProfileList = useLensProfileList();

  useEffect(() => {
    if (authContext?.xmtpLogs) {
      _watch();
    }
  }, [authContext?.xmtpLogs]);


  useEffect(() => {
    
  }, [allConversations])

  const _watch = async () => {
    console.log("Calling useXmtpChannels._watch", authContext?.xmtpLogs);
    for await (const conversation of authContext?.xmtpLogs) {
      console.log("New conversation started with ", conversation);
      const conversations = [...allConversations];
      conversations.unshift(new Channel$("xmtp", conversation));
      setAllConversations(conversations);
    }
  };

  const _unwatch = () => {
    authContext?.xmtpLogs.return()
  }

  const _fetch = async () => {
    let conversationList = await authContext?.xmtpClient?.conversations?.list();
    conversationList = conversationList.reverse()
    setRawConversations(conversationList);

    const conversationMap = await conversationList
      ?.map(async (item: any) => {
        const peer = await hookLensProfileList.fetch(item.peerAddress);
        const channelData = new Channel$("xmtp", {...item, peer: peer, raw: item});
        return channelData;
      })
      Promise?.all(conversationMap).then((result: any) => {
        logger("xmtp", "useXmtpChannels._fetch", "channels from xmtp", [
          result,
        ]);
        setAllConversations(result);
      });
  };

  return {
    fetch: _fetch,
    channels: allConversations,
  };
};

export default useXmtpChannels;
