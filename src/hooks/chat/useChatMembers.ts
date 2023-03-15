import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    let hookStreamChannelMembers: any;
    const [users, setUsers] = useState<any>();
    const router = useRouter();

    if (router.pathname == '/chat') {
        hookStreamChannelMembers = useStreamChannelMembers();

        // useEffect(() => {
        //     setUsers(hookStreamChannelMembers?.users || []);
        // }, [router.pathname, hookStreamChannelMembers?.users]);
    }

    return (
        {
            users: users
        }
    )
}

export default useChatMembers;