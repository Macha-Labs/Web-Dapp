import { logger } from "@/helpers/logger";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import { XmtpMessage$ } from "@/schema/message";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useContext, useEffect, useState } from "react";

const useXmtpChannelMessages = () => {
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [xmtpLogs, setXmtpLogs] = useState<any>();
  const xmtpContext = useContext(XmtpContext);
  const authContext = useContext(AuthContext) as AuthContextType;

  const _fetch = async () => {
    logger('xmtp', 'useXmtpChannelMessages._fetch', 'channel of xmtp', [xmtpContext.conversation]);
    const messages = await xmtpContext.conversation?.xmtpRaw?.messages({
      direction: SortDirection.SORT_DIRECTION_ASCENDING,
    });
    const messagesData = messages?.map((item: any) => {
      return XmtpMessage$(item);
    });
    logger('xmtp', 'XMTPProvider._loadMessages', 'Messages is', [messagesData])
    setMessages(messagesData);
  }

  const readXmtpLogs = async () => {
    for await (const msg of xmtpLogs) {
      console.log("stream xmtp ", msg);
      setMessages(prevMessages => {
        const messages = [...prevMessages];
        messages.push(XmtpMessage$(msg));
        return messages;
      });
    }
  }

  useEffect(() => {
    logger('xmtp', 'XmtpProvider.useEffect[xmtpContext.conversation]', 'channel', [xmtpContext.conversation])
    _fetch()
  }, [xmtpContext.conversation]);

  useEffect(() => {
    if (authContext.xmtpClientAddress) {
      console.log("useEffect to stream messages");
      const streamMessages = async () => {
        const newStream = await xmtpContext?.conversation?.xmtpRaw.streamMessages();
        console.log("newStream", newStream);
        setXmtpLogs(newStream);
      };
      streamMessages();
    }
    console.log("first");
  }, []);

  useEffect(() => {
    if (xmtpLogs) {
      readXmtpLogs();
    }
  }, [xmtpLogs]);

  return (
    {
      fetch: _fetch,
      messages: messages
    }
  )
}

export default useXmtpChannelMessages;