import { DataContext } from "@/providers/DataProvider";
import { StreamContext, StreamContextType } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const useChatChannel = () => {
    const streamContext = useContext(StreamContext) as StreamContextType;
    const xmtpContext = useContext(XmtpContext);
    const router = useRouter();
    const dataContext = useContext(DataContext)


    useEffect(() => {
        console.log('fetch channel');
        console.log('pathname', router.pathname);
        const stopWatchingChannlel = async() => {
            if (dataContext?.channel) {
                const result =  await dataContext?.channel?.raw?.stopWatching();
                console.log("Stopped watching the channel ", result);
            }
        }
        const markChannelAsRead = async() => {
            if (dataContext?.channel) {
                const result =  await dataContext?.channel?.raw?.markRead();
                console.log("Channel marked as Read ", result);
            }
        }
        switch (router.pathname) {
            case "/chat":
                console.log('for stream')
                stopWatchingChannlel();
                dataContext.loadChannel(streamContext?.hookChannel.channel);
                markChannelAsRead();
                break;
            case "/chat/dm":
                console.log('for XMTP')
                dataContext.loadChannel(xmtpContext?.conversation);
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
        channel: dataContext.channel,
        fetch: _fetch,
        remove: _remove,
        reload: _reload
    }
}
export default useChatChannel;