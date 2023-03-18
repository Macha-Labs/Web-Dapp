import { AuthContext } from "@/providers/AuthProvider"
import { XmtpContext } from "@/providers/XmtpProvider";
import { Channel$ } from "@/schema/channel";
import useChatChannelStore from "@/store/useChatChannelStore";
import { useContext, useRef } from "react"

const useXmtpChannelNew = () => {
    const authContext = useContext(AuthContext);
    const input = useRef<any>();
    const xmtpContext = useContext(XmtpContext);

    const _validate = async (callback?: any) => {
        await authContext?.xmtpClient?.canMessage(
            input.current.value
        ).then((res: any) => {
            if (res) {
                _fetch(callback);
            } else {
                callback.error();
            }
        })
    }

    const _fetch = async (callback?: any) => {
        await authContext?.xmtpClient?.conversations.newConversation(
            input.current.value,
        ).then((res: any) => {
            console.log(res);
            xmtpContext.initiate(new Channel$("xmtp", {...res, peer: {}, raw: res}));
            // callback.success();
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