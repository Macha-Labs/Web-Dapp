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

  

  const _watch = async (channel: any) => {
    console.log('Rendering >>>>>>> useXmtpChannelMessages._watch', channel?.xmtpRaw)
      for await (const msg of await channel?.xmtpRaw?.streamMessages()) {
        console.log(`New message from ${msg.senderAddress}: ${msg.content}`)
        setMessages(prevMessages => {
          const messages = [...prevMessages];
          messages.push(XmtpMessage$(msg));
          return messages;
        });
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