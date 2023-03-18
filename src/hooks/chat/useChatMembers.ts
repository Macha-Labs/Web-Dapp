import { useChatMembersStore } from "@/store/useChatMembersStore";
import { useRouter } from "next/router";
import {useEffect } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    const router = useRouter();
    let hookStreamChannelMembers = useStreamChannelMembers();
    const $loadMembers = useChatMembersStore(((state: any) => state.load));
    const $loadMemberAll = useChatMembersStore(((state: any) => state.loadAll));
    const $loadMemberIds = useChatMembersStore(((state: any) => state.loadIds));


    useEffect(() => {
        if (router.pathname == '/chat' && hookStreamChannelMembers?.users) {
            $loadMembers({ onlineUsers: hookStreamChannelMembers?.onlineUsers, offlineUsers: hookStreamChannelMembers?.offlineUsers});
            $loadMemberAll(hookStreamChannelMembers.allUsers)
            $loadMemberIds(hookStreamChannelMembers?.allUsersIds);
        }
        
    }, [hookStreamChannelMembers?.users]);

    return (
        {
            load: hookStreamChannelMembers.fetch
        }
    )
    
}

export default useChatMembers;