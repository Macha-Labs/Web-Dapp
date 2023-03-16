import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";
import useChatMembersStore from "@/store/useChatMembersStore";

const useChatMembers = () => {
    const router = useRouter();
    const $loadMembers = useChatMembersStore(((state: any) => state.load));
    const hookStreamChannelMembers = useStreamChannelMembers();
    const $members = useChatMembersStore((state: any) => state.members);

    useEffect(() => {
        if (router.pathname == '/chat') {
            console.log('users', hookStreamChannelMembers?.users);
            $loadMembers(hookStreamChannelMembers?.users);
            console.log("stream members ", $members);
        }
        
    }, [hookStreamChannelMembers?.users]);
    
}

export default useChatMembers;