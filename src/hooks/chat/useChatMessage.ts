import { StreamContext } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext } from "react";

const useChatMessage = () => {
    const streamContext = useContext(StreamContext);
    const xmtpContext = useContext(XmtpContext);
    const router = useRouter();

    const _send = async (data: any) => {
        switch(router.pathname) {
            case '/chat':
                return await streamContext?.hookChannel?.channel.raw.sendMessage(data);
            case '/chat/dm':
                return await xmtpContext.conversation?.xmtpRaw?.send(data.text);
        }
    }

    return {
        send: _send
    }
}

export default useChatMessage;