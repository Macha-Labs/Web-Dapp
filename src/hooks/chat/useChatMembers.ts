import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { useEffect} from "react";
=======
import { useContext, useEffect } from "react";
>>>>>>> 59a69faeecbd1a0d6aa5af0f37cd706ae69409d6
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    const router = useRouter();
    const dataContext = useContext(DataContext);
    const hookStreamChannelMembers = useStreamChannelMembers();

    useEffect(() => {
        if (router.pathname == '/chat') {
            console.log('users', hookStreamChannelMembers?.users);
            dataContext.loadMembers({ onlineUsers: hookStreamChannelMembers?.onlineUsers, offlineUsers: hookStreamChannelMembers?.offlineUsers});
        }
        
    }, [hookStreamChannelMembers?.users]);
    
}

export default useChatMembers;