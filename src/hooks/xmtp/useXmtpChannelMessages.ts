import { logger } from "@/helpers/logger";
import { XmtpMessage$ } from "@/schema/message";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useState } from "react";

const useXmtpChannelMessages = () => {
  console.log('Rendering >>>>> useXmtpChannelMessages');
  const [messages, setMessages] = useState<DecodedMessage[]>([]);

  const _fetch = async (channel: any) => {
    logger('xmtp', 'useXmtpChannelMessages._fetch', 'channel of xmtp', [channel]);
    const messages = await channel?.xmtpRaw?.messages({
      direction: SortDirection.SORT_DIRECTION_ASCENDING,
    });
    const messagesData = messages?.map((item: any) => {
      return XmtpMessage$(item);
    });
    logger('xmtp', 'XMTPProvider._loadMessages', 'Messages is', [messagesData])
    setMessages(messagesData);
  }

  

  const _watch = async (logs: any) => {
    if (logs) {
      for await (const msg of logs) {
        console.log("stream xmtp ", msg);
        setMessages(prevMessages => {
          const messages = [...prevMessages];
          messages.push(XmtpMessage$(msg));
          return messages;
        });
      }
    }
  }

  return (
    {
      fetch: _fetch,
      watch: _watch,
      messages: messages
    }
  )
}

export default useXmtpChannelMessages;