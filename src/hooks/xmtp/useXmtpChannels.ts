import { logger } from "@/helpers/logger";
import { AuthContext } from "@/providers/AuthProvider";
import { Channel$ } from "@/schema/channel";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useContext, useEffect, useState } from "react";
import useLensProfileList from "../lens/useLensProfileList";

const useXmtpChannels = () => {
  console.log('Rendering >>>>> useXmtpChannels');
  const authContext = useContext(AuthContext);
  const [allConversations, setAllConversations] = useState<any>();
  const [xmtpConvo, setXmtpConvo] = useState<any>();
  const hookLensProfileList = useLensProfileList();

  const _listen = async () => {
    for await (const conversation of xmtpConvo) {
      console.log("New conversation started with ", conversation);
      setAllConversations((prevConversations: any) => {
        const conversations = [...prevConversations];
        conversations.unshift(new Channel$("xmtp", conversation));
        return conversations;
      });
    }
  };

  // useEffect(() => {
  //   if ($channel?.source != 'xmtp')
  //     return;

  //   const streamConversations = async () => {
  //     const xmtpNew = await authContext?.xmtpClient?.conversations?.stream();
  //     console.log("New xmtpConvo ", xmtpNew);
  //     setXmtpConvo(xmtpNew);
  //   };
  //   streamConversations();
  // }, [$channel?.id]);

  useEffect(() => {
    if (xmtpConvo) {
      _listen();
    }
  }, [xmtpConvo]);

  useEffect(() => {
    if (allConversations?.length) {
    }
  }, [allConversations]);

  const _fetch = async () => {
    const conversationList =
      await authContext?.xmtpClient?.conversations?.list();
    // const data = conversationList?.map((item: any) => {
    //   // const peer = hookLensProfileList.fetch(item.peerAddress);
    //   // console.log("useXmtpChannels peer", ChannelXMTP$({...item, peer: peer}));
    //   return new Channel$("xmtp", item);
    // });
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
