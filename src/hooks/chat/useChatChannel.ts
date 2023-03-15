import { StreamContext, StreamContextType } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const useChatChannel = () => {
    const streamContext = useContext(StreamContext) as StreamContextType;
    const xmtpContext = useContext(XmtpContext);
    const router = useRouter();
    const storeChannel = useChatChannelStore((state: any) => state.channel)
    const storeLoad = useChatChannelStore(((state: any) => state.load))

    useEffect(() => {
        console.log('fetch channel');
        console.log('pathname', router.pathname);
        switch (router.pathname) {
            case "/chat":
                console.log('for stream')
                storeLoad(streamContext?.hookChannel.channel);
                break;
            case "/chat/dm":
                console.log('for XMTP')
                storeLoad(xmtpContext?.conversation);
                break;
        }
    }, [streamContext?.hookChannel.channel, xmtpContext?.conversation]);

    const _fetch = () => {
        switch (router.pathname) {
            case "/chat":
                return streamContext?.initiate;
            case "/chat/dm":
                return xmtpContext.initiate;
        }
    };

    return {
        channel: storeChannel,
        fetch: _fetch()
    }
}
export default useChatChannel;