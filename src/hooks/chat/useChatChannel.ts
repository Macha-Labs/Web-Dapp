import { DataContext } from "@/providers/DataProvider";
import { StreamContext, StreamContextType } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
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
        switch (router.pathname) {
            case "/chat":
                console.log('for stream')
                dataContext.loadChannel(streamContext?.hookChannel.channel);
                break;
            case "/chat/dm":
                console.log('for XMTP')
                dataContext.loadChannel(xmtpContext?.conversation);
                break;
        }
    }, [streamContext?.hookChannel.channel, xmtpContext?.conversation]);

    const _fetch = () => {
        switch (router.pathname) {
            case "/chat":
                return streamContext?.initiate;
                break;
            case "/chat/dm":
                return xmtpContext.initiate;
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
        fetch: _fetch(),
        remove: _remove,
        reload: _reload
    }
}
export default useChatChannel;