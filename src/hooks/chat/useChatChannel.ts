import { logger } from "@/helpers/logger";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useStreamChannel from "../stream/useStreamChannel";
import useXmtpChannel from "../xmtp/useXmtpChannel";

const useChatChannel = () => {
    console.log('Rendering >>>>> useChatChannel');
    const hookXmtpChannel = useXmtpChannel();
    const hookStreamChannel = useStreamChannel();
    const router = useRouter();
    const $channel = useChatChannelStore((state: any) => state.channel);
    const $loadChannel = useChatChannelStore(((state: any) => state.load));
    const $loadLoading = useChatChannelStore(((state: any) => state.loadLoading));

    // stream
    useEffect(() => {
        logger("channel", "useChatChannel.useEffect[hookStreamChannel?.channel]", "channel data from stream ", [
            hookStreamChannel?.channel,
        ]);

        _read(hookStreamChannel?.channel);
        $loadChannel(hookStreamChannel?.channel);
        $loadLoading(false);

    }, [hookStreamChannel?.channel]);

    // xmtp
    useEffect(() => {
        logger("channel", "useChatChannel.useEffect[hookStreamChannel?.channel]", "channel data from xmtp ", [
            hookXmtpChannel.channel,
        ]);

        $loadChannel(hookXmtpChannel.channel);
        $loadLoading(false)

    }, [hookXmtpChannel.channel])

    const _fetch = (data: any) => {
        console.log("Router pathname ", router.pathname);
        $loadLoading(true);
        _unwatch($channel);
        $loadChannel(null);

        switch (router.pathname) {
            case "/chat":
                return hookStreamChannel._fetch(data?.id);
            case "/chat/dm":
                return hookXmtpChannel._fetch(data);
            case '/invite/c/[...channelId]':
                return hookStreamChannel._fetch(data?.id);
        }
    };

    const _remove = () => {
        switch (router.pathname) {
            case "/chat":
                hookStreamChannel._remove();
                break;
            case "/chat/dm":
                hookXmtpChannel._remove()
                break;
        }
    }

    const _reload = () => {
        $loadLoading(true);

        switch (router.pathname) {
            case "/chat":
                hookStreamChannel._reload();
                break;
            case "/chat/dm":
                break;
        }   
    }

    const _unload = () => {
        $loadChannel(null)
        $loadLoading(false)
    }

    const _read = async(channel: any) => {
        if (channel && router.pathname == '/chat') {
            const result =  await channel?.raw?.markRead();
            console.log("Channel marked as Read ", result);
        }
    }

    const _unwatch = async(oldChannel: any) => {
        console.log('Stopped watching the channel >>>>>>>>', oldChannel, router.pathname);
        if (oldChannel && router.pathname == '/chat') {
            const result =  await oldChannel?.raw?.stopWatching();
            console.log("Stopped watching the channel ", result, oldChannel);
        } else if (oldChannel && router.pathname == '/chat/dm') {

            
        }
    }
    

    return {
        fetch: _fetch,
        remove: _remove,
        reload: _reload,
        unload: _unload
    }
}
export default useChatChannel;