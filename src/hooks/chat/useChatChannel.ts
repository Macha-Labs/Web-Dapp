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

        $loadLoading(false);

        if (router.pathname == "/chat/dm")
            $loadChannel(null);

        if (router.pathname == "/chat" || router.pathname == "/invite/c/[...channelId]") {
            console.log('for stream', $channel?.id, hookStreamChannel?.channel?.id);
            if ($channel?.id != hookStreamChannel?.channel?.id)
                _unwatch($channel);
            _read(hookStreamChannel?.channel?.id);
            $loadChannel(hookStreamChannel?.channel);
        }
    }, [hookStreamChannel?.channel]);

    // xmtp
    useEffect(() => {
        logger("channel", "useChatChannel.useEffect[hookStreamChannel?.channel]", "channel data from xmtp ", [
            hookXmtpChannel.channel,
        ]);

        $loadLoading(false)

        if (router.pathname == "/chat")
            $loadChannel(null);
        if (router.pathname == "/chat/dm") {
            console.log('for XMTP')
            $loadChannel(hookXmtpChannel.channel);
        }
    }, [hookXmtpChannel.channel])

    const _fetch = (data: any) => {
        console.log("Router pathname ", router.pathname);
        $loadLoading(true);
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
    }

    const _read = async(channel: any) => {
        if (channel && router.pathname == '/chat') {
            const result =  await channel?.raw?.markRead();
            console.log("Channel marked as Read ", result);
        }
    }

    const _unwatch = async(oldChannel: any) => {
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