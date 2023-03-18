import { AuthContext } from "@/providers/AuthProvider"
import { DataContext } from "@/providers/DataProvider";
import { Channel$ } from "@/schema/channel";
import { useContext, useRef } from "react"

const useXmtpChannelNew = () => {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const input = useRef<any>();

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
            dataContext.loadChannel(new Channel$("xmtp", {...res, peer: {}, raw: res}));
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