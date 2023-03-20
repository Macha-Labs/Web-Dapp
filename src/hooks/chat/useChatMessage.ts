import useChatChannelStore from "@/store/useChatChannelStore";
import { useRouter } from "next/router";

const useChatMessage = () => {
    const storeChannel = useChatChannelStore((state: any) => state.channel)
    const router = useRouter();

    const _send = async (data: any) => {
        console.log("Reading SENDING MSG", data);
        switch(router.pathname) {
            case '/chat':
                return await storeChannel.raw.sendMessage(data);
            case '/chat/dm':
                return await storeChannel?.xmtpRaw?.send(data.text);
        }
    }

    return {
        send: _send
    }
}

export default useChatMessage;