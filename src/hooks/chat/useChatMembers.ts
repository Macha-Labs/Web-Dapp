import { useState } from "react";
import useStreamChannelMembers from "../stream/useStreamChannelMembers";

const useChatMembers = () => {
    const hookStreamChannelMembers = useStreamChannelMembers();
    const [users, setUsers] = useState<any>();

    const reloadMembers = () => {
        hookStreamChannelMembers.fetchChannelMembers()
    }

    return (
        {
            users: users
        }
    )
}

export default useChatMembers;