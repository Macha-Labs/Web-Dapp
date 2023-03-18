import useChatMessagesStore from "@/store/useChatMessagesStore";
import { useRouter } from "next/router";
import { useEffect} from "react";
import useStreamChannelMessages from "../stream/useStreamChannelMessages";
import useXmtpChannelMessages from "../xmtp/useXmtpChannelMessages";

const useChatMessages = () => {
    const router = useRouter();
    let hookStreamChannelMessages = useStreamChannelMessages();
    let hookXmtpChannelMessages = useXmtpChannelMessages();
    const $loadMessages = useChatMessagesStore(((state: any) => state.load));

    useEffect(() => {
        if (router.pathname == '/chat')
            $loadMessages(hookStreamChannelMessages?.messages || []);
    }, [hookStreamChannelMessages?.messages]);

    useEffect(() => {
        if (router.pathname == '/chat/dm')
            $loadMessages(hookXmtpChannelMessages?.messages || []);
    }, [hookXmtpChannelMessages?.messages]);

    const _load = () => {
        if (router.pathname == '/chat') {
            hookStreamChannelMessages.fetch()
        } else if (router.pathname == '/chat/dm') {
            hookXmtpChannelMessages.fetch()
        }
    }


    return (
        {
            load: _load
        }
    )

}

export default useChatMessages;