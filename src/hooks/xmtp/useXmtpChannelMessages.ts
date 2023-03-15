import { logger } from "@/helpers/logger";
import { XmtpMessage$ } from "@/schema/message";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useState } from "react";

const useXmtpChannelMessages = () => {
    const [messages, setMessages] = useState<DecodedMessage[]>([]);

    const _fetch = async(convData: any) => {
        const messages = await convData?.messages({
          direction: SortDirection.SORT_DIRECTION_ASCENDING,
        });
        const messagesData = messages?.map((item: any) => {
          return XmtpMessage$(item);
        });
        logger('xmtp', 'XMTPProvider._loadMessages', 'Messages is', [messagesData])
        // console.log("conversation", conversation.send("hulle hula le hula"));
    
        setMessages(messagesData);
      }

    return (
        {
            fetch: _fetch,
            messages: messages
        }
    )
}

export default useXmtpChannelMessages;