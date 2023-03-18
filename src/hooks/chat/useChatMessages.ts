import { XmtpContext } from "@/providers/XmtpProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import useChatMessagesStore from "@/store/useChatMessagesStore";
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";
import useStreamChannelMessages from "../stream/useStreamChannelMessages";
import useXmtpChannelMessages from "../xmtp/useXmtpChannelMessages";

const useChatMessages = () => {
    const router = useRouter();
    let hookStreamChannelMessages = useStreamChannelMessages();
    let hookXmtpChannelMessages = useXmtpChannelMessages();
    const xmtpContext = useContext(XmtpContext);
    const $channel = useChatChannelStore((state: any) => state.channel);
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
        $loadMessages(null);
        if (router.pathname == '/chat') {
            hookStreamChannelMessages.fetch()
        } else if (router.pathname == '/chat/dm') {
            hookXmtpChannelMessages.fetch($channel);
            
        }
    }

    const _watch = () => {
        if (router.pathname == '/chat/dm') {
            hookXmtpChannelMessages.watch(xmtpContext.logs);
        }
    }


    return (
        {
            load: _load,
            watch: _watch
        }
    )

}

export default useChatMessages;