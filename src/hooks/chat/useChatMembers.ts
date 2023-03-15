import useChatMembersStore from "@/store/useChatMembersStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    let hookStreamChannelMembers: any;
    const router = useRouter();
    const $loadMembers = useChatMembersStore(((state: any) => state.load));

    if (router.pathname == '/chat') {
        hookStreamChannelMembers = useStreamChannelMembers();

        useEffect(() => {
            $loadMembers(hookStreamChannelMembers?.users);
        }, [hookStreamChannelMembers?.users]);
    }
}

export default useChatMembers;