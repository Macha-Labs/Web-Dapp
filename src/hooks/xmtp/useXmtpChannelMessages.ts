import { logger } from "@/helpers/logger";
import { XmtpMessage$ } from "@/schema/message";
import useChatChannelStore from "@/store/useChatChannelStore";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";

const useXmtpChannelMessages = () => {
  console.log('Rendering >>>>> useXmtpChannelMessages');
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [messagesLogs, setMessagesLogs] = useState<any>();
  const $channel = useChatChannelStore((state: any) => state.channel);

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
    setMessagesLogs(await channel?.xmtpRaw?.streamMessages())

    if (channel?.xmtpRaw) {
      for await (const msg of messagesLogs) {
        console.log(`New message from ${msg.senderAddress}: ${msg.content}`)
        setMessages(prevMessages => {
          const messages = [...prevMessages];
          messages.push(XmtpMessage$(msg));
          return messages;
        });
      }
    }
  }

  useEffect(() => {
    if ($channel) {
      _watch($channel)
    } else {
      messagesLogs.return();
      setMessagesLogs(null);
    }
  }, [$channel])

  return (
    {
      fetch: _fetch,
      messages: messages
    }
  )
}

export default useXmtpChannelMessages;