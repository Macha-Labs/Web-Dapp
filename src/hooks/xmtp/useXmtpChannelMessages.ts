import { logger } from "@/helpers/logger";
import { XmtpContext } from "@/providers/XmtpProvider";
import { XmtpMessage$ } from "@/schema/message";
import { DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useContext, useEffect, useState } from "react";

const useXmtpChannelMessages = () => {
    const [messages, setMessages] = useState<DecodedMessage[]>([]);
    const xmtpContext = useContext(XmtpContext);

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

    useEffect(() => {
      _fetch(xmtpContext.conversation)
    }, [xmtpContext.conversation])

    return (
        {
            fetch: _fetch,
            messages: messages
        }
    )
}

export default useXmtpChannelMessages;