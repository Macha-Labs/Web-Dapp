import InviteChannel from "@/components/invite/InviteChannel";
import useStreamChannelMembership from "@/hooks/stream/useStreamChannelMembership";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { getChannel } from "@/service/ChannelService";
import { StyledWindow } from "@/styles/StyledComponents";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";

const Invite = () => {
    const router = useRouter();
    const { routerQuery }: any = router.query;

    return (
        <StyledWindow>
            <InviteChannel channelId={router.query?.channelId ? router?.query?.channelId[0]: null} />
        </StyledWindow>
    )
}

export default Invite;