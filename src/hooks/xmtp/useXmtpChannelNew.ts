import { AuthContext } from "@/providers/AuthProvider"
import { ChatContext } from "@/providers/ChatProvider";
import { Channel$ } from "@/schema/channel";
import { useContext, useRef } from "react"
import { useState } from "react";

const useXmtpChannelNew = () => {
    const authContext = useContext(AuthContext);
    const input = useRef<any>();
    const chatContext = useContext(ChatContext);
    const [isLoading, setLoading] = useState<any>();

    const _validate = async (peerAddress: any, callback?: any) => {
        setLoading(true);
        await authContext?.xmtpClient?.canMessage(
            peerAddress
        ).then((res: any) => {
            if (res) {
                _fetch(peerAddress, callback);
            } else {
                console.log(res);
                callback.error();
                setLoading(false);
            }
        })
    }

    const _fetch = async (peerAddress: any, callback?: any) => {
        await authContext?.xmtpClient?.conversations.newConversation(
            peerAddress,
        ).then((res: any) => {
            console.log(res);
            chatContext?.hookChannel?.fetch(new Channel$("xmtp", {...res, peer: {}, raw: res}));
            setLoading(false);
            callback.success();
        })
    }

    const _initiateSearch = (callback?: any) => {
        _validate(input.current.value, callback);
    }

    const _initiateDirect = (peerAddress: any, callback?: any) => {
        console.log(peerAddress)
        _validate(peerAddress, callback);
    }

    return (
        {
            validate: _validate,
            input: input,
            fetch: _fetch,
            initiateSearch: _initiateSearch,
            initiateDirect: _initiateDirect,
            isLoading: isLoading
        }
    )
}

export default useXmtpChannelNew;