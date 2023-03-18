import { StreamContext, StreamContextType } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import useChatChannelStore from "@/store/useChatChannelStore";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const useChatChannel = () => {
    console.log('Rendering >>>>> useChatChannel');
    const streamContext = useContext(StreamContext) as StreamContextType;
    const xmtpContext = useContext(XmtpContext);
    const router = useRouter();
    const $channel = useChatChannelStore((state: any) => state.channel);
    const $loadChannel = useChatChannelStore(((state: any) => state.load))



    useEffect(() => {
        console.log('fetch channel');
        console.log('pathname', router.pathname);
        const stopWatchingChannel = async() => {
            if ($channel) {
                const result =  await $channel?.raw?.stopWatching();
                console.log("Stopped watching the channel ", result, $channel);
            }
        }
        const markChannelAsRead = async() => {
            if ($channel) {
                const result =  await $channel?.raw?.markRead();
                console.log("Channel marked as Read ", result);
            }
        }
        switch (router.pathname) {
            case "/chat":
                console.log('for stream', $channel);
                stopWatchingChannel();
                $loadChannel(streamContext?.hookChannel.channel);
                markChannelAsRead();
                break;
            case "/chat/dm":
                console.log('for XMTP')
                $loadChannel(xmtpContext?.conversation);
                break;
        }
    }, [streamContext?.hookChannel.channel, xmtpContext?.conversation]);

    const _fetch = (data: any) => {
        switch (router.pathname) {
            case "/chat":
                return streamContext?.initiate(data);
                break;
            case "/chat/dm":
                return xmtpContext.initiate(data);
                break;
        }
    };

    const _remove = () => {
        switch (router.pathname) {
            case "/chat":
                streamContext?.hookChannel.removeChannel();
                break;
            case "/chat/dm":
                xmtpContext.remove();
                break;
        }
    }

    const _reload = () => {
        switch (router.pathname) {
            case "/chat":
                streamContext?.reloadChannel();
                break;
            case "/chat/dm":
                // xmtpContext.remove();
                break;
        }   
    }

    return {
        fetch: _fetch,
        remove: _remove,
        reload: _reload
    }
}
export default useChatChannel;