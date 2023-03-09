import InviteChannel from "@/components/invite/InviteChannel";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { StyledWindow } from "@/styles/StyledComponents";
import { useRouter } from 'next/router';
import { useContext, useEffect } from "react";

const Invite = () => {
    const router = useRouter();
    const { channelId }: any = router.query;
    const chatContext = useContext(ChatContext);
    const authContext = useContext(AuthContext)

    

    useEffect(() => {
        if (channelId && channelId[0]) {
            console.log('Route channel', channelId[0]);
            chatContext.hookChannel.getChannel(channelId[0]);
        }
    }, [channelId])

    return (
        <StyledWindow>
            <InviteChannel channel={chatContext?.hookChannel?.channel} />
        </StyledWindow>
    )
}

export default Invite;