import { logger } from "@/helpers/logger";
import { useChatMembersStore } from "@/store/useChatMembersStore";
import { useRouter } from "next/router";
import {useEffect } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    console.log("Rendering >>>>> useChatMembers");
    const router = useRouter();
    let hookStreamChannelMembers = useStreamChannelMembers();
    const $loadMembers = useChatMembersStore(((state: any) => state.load));
    const $loadMemberAll = useChatMembersStore(((state: any) => state.loadAll));
    const $loadMemberIds = useChatMembersStore(((state: any) => state.loadIds));


    useEffect(() => {
        logger("channel", "useChatMembers.useEffect[hookStreamChannelMembers?.users]", "members data from stream ", [
            hookStreamChannelMembers?.users,
        ]);
        if (router.pathname == '/chat' && hookStreamChannelMembers?.allUsersIds) {
            $loadMembers({ onlineUsers: hookStreamChannelMembers?.onlineUsers, offlineUsers: hookStreamChannelMembers?.offlineUsers});
            $loadMemberAll(hookStreamChannelMembers.allUsers)
            $loadMemberIds(hookStreamChannelMembers?.allUsersIds);
        }
        
    }, [hookStreamChannelMembers?.allUsersIds]);

    const _load = (channel: any) => {
        console.log('Rendering >>>>> useChatMembers.load');
        if (router.pathname == '/chat') {
            hookStreamChannelMembers.fetch(channel)
        }
    }

    return (
        {
            load: _load
        }
    )
    
}

export default useChatMembers;