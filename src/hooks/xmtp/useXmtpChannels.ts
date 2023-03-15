import { logger, loggerInit } from "@/helpers/logger";
import { AuthContext } from "@/providers/AuthProvider";
import { ChannelXMTP$ } from "@/schema/channel";
import { useContext, useEffect, useState } from "react";

const useXmtpChannels = () => {
    const authContext = useContext(AuthContext);
    const [allConversations, setAllConversations] = useState<any>();

    useEffect(() => {
        if (authContext?.xmtpClientAddress) {
          _fetch();
        }
      }, [authContext?.xmtpClientAddress]);

    const _fetch = async () => {
        const conversationList = await authContext?.xmtpClient.conversations.list();
        const data = conversationList.map((item: any) => {
          return ChannelXMTP$(item);
        });
        logger('xmtp', 'useXmtpChannels._fetch', 'channels', [data])
        setAllConversations(data);
      };

    return (
        {
            fetch: _fetch,
            channels: allConversations
        }
    )
}

export default useXmtpChannels;