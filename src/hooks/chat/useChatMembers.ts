import { DataContext } from "@/providers/DataProvider";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    const router = useRouter();
    const dataContext = useContext(DataContext);

    if (router.pathname == '/chat') {
        const hookStreamChannelMembers = useStreamChannelMembers();

        useEffect(() => {
            console.log('users', hookStreamChannelMembers?.users, dataContext.members)
            // dataContext.loadMembers(hookStreamChannelMembers?.users);
        }, [router.pathname, hookStreamChannelMembers?.users]);
    }
}

export default useChatMembers;