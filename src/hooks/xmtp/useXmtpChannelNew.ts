import { AuthContext } from "@/providers/AuthProvider"
import { Channel$ } from "@/schema/channel";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useContext, useRef } from "react"

const useXmtpChannelNew = () => {
    const authContext = useContext(AuthContext);
    const input = useRef<any>();
    const $loadChannel = useChatChannelStore(((state: any) => state.load))

    const _validate = async (callback?: any) => {
        await authContext?.xmtpClient?.canMessage(
            input.current.value
        ).then((res: any) => {
            if (res) {
                _fetch(callback);
            }
        })
    }

    const _fetch = async (callback?: any) => {
        await authContext?.xmtpClient?.conversations.newConversation(
            input.current.value,
        ).then((res: any) => {
            console.log();
            $loadChannel(new Channel$("xmtp", {...res, peer: {}, raw: res}));
            callback();
        })
    }

    return (
        {
            validate: _validate,
            input: input,
            fetch: _fetch
        }
    )
}

export default useXmtpChannelNew;