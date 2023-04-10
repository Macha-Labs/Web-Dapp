import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";

const useChatMessage = () => {
    const $channel = useChatChannelStore((state: any) => state.channel)
    const router = useRouter();

    const _send = async (data: any) => {
        console.log("Reading SENDING MSG", data);
        switch(router.pathname) {
            case '/':
                return await $channel.raw.sendMessage(data);
            case '/chat/dm':
                return await $channel?.xmtpRaw?.send(data.text);
        }
    }

    return {
        send: _send
    }
}

export default useChatMessage;