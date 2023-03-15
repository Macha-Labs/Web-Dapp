import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamChannelMessages from "../stream/useStreamChannelMessages";
import useXmtpChannelMessages from "../xmtp/useXmtpChannelMessages";

const useChatMessages = () => {
    const router = useRouter();
    let hookStreamChannelMessages: any;
    let hookXmtpChannelMessages: any;
    const dataContext = useContext(DataContext);

    if (router.pathname == '/chat') {
        hookStreamChannelMessages = useStreamChannelMessages();

        useEffect(() => {
            dataContext.loadMessages(hookStreamChannelMessages?.messages || []);
        }, [router.pathname, hookStreamChannelMessages?.messages]);
    }
    
    if (router.pathname == '/chat/dm') {
        hookXmtpChannelMessages = useXmtpChannelMessages();
        useEffect(() => {
            dataContext.loadMessages(hookXmtpChannelMessages?.messages || []);
        }, [router.pathname, hookXmtpChannelMessages?.messages]);
    }

    return (
        {
            messages: dataContext.messages
        }
    )

}

export default useChatMessages;