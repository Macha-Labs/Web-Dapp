import { StreamContext } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamChannelMessages from "../stream/useStreamChannelMessages";

const useChatMessages = () => {
    const router = useRouter();
    const xmtpContext = useContext(XmtpContext);
    const streamContext = useContext(StreamContext);
    let hookStreamChannelMessages: any;
    const [messages, setMessages] = useState<any>([]);

    if (router.pathname == '/chat') {
        hookStreamChannelMessages = useStreamChannelMessages(
            streamContext?.hookChannel?.channel
        );

        useEffect(() => {
        if (router.pathname == "/chat") {
            setMessages(hookStreamChannelMessages?.messages || []);
        }
        }, [router.pathname, hookStreamChannelMessages?.messages]);
    }
    
    if (router.pathname == '/chat/dm') {
        useEffect(() => {
            if (router.pathname == "/chat/dm") {
                setMessages(xmtpContext?.messages || []);
            }
            }, [router.pathname, xmtpContext?.messages]);
    }

    return (
        {
            messages: messages
        }
    )

}

export default useChatMessages;