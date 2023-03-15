import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStreamChannelMessages from "../stream/useStreamChannelMessages";
import useXmtpChannelMessages from "../xmtp/useXmtpChannelMessages";

const useChatMessages = () => {
    const router = useRouter();
    let hookStreamChannelMessages: any;
    let hookXmtpChannelMessages: any;
    const [messages, setMessages] = useState<any>([]);

    if (router.pathname == '/chat') {
        hookStreamChannelMessages = useStreamChannelMessages();

        useEffect(() => {
        if (router.pathname == "/chat") {
            setMessages(hookStreamChannelMessages?.messages || []);
        }
        }, [router.pathname, hookStreamChannelMessages?.messages]);
    }
    
    if (router.pathname == '/chat/dm') {
        hookXmtpChannelMessages = useXmtpChannelMessages();
        useEffect(() => {
            if (router.pathname == "/chat/dm") {
                setMessages(hookXmtpChannelMessages?.messages || []);
            }
            }, [router.pathname, hookXmtpChannelMessages?.messages]);
    }

    return (
        {
            messages: messages
        }
    )

}

export default useChatMessages;