import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    const router = useRouter();
    const dataContext = useContext(DataContext);
    let hookStreamChannelMembers = useStreamChannelMembers()


    useEffect(() => {
        if (router.pathname == '/chat' && hookStreamChannelMembers?.users) {
            console.log('users', hookStreamChannelMembers?.users);
            dataContext.loadMembers({ onlineUsers: hookStreamChannelMembers?.onlineUsers, offlineUsers: hookStreamChannelMembers?.offlineUsers});
            dataContext.loadMemberAll(hookStreamChannelMembers.allUsers)
            dataContext.loadMemberIds(hookStreamChannelMembers?.allUsersIds);
        }
        
    }, [hookStreamChannelMembers?.users]);

    return (
        {
            load: hookStreamChannelMembers.fetch
        }
    )
    
}

export default useChatMembers;