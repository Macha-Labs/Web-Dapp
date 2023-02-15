import {useContext, useEffect, useState} from "react";
import {getProfiles} from "../../helpers/lens/lens";
import {UserLens$} from "../../schema/user";
import {AuthContext, AuthContextType} from "../../providers/AuthProvider";

const useStreamChannelMembers = (channel: any) => {
    const authContext = useContext(AuthContext) as AuthContextType;
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const [offlineUsers, setOfflineUsers] = useState<any>([]);
    const [userIsMember, setUserIsMember] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>();

    const fetchChannelMembers = async () => {
        console.log("Called fetchChannelMembers");
        const response = await channel?.queryMembers({});
        console.log("Fetched channel members ", response);
        let onlineIds: any[] = [];
        let offlineIds: any[] = [];
        response?.members.map((item: any, index: number) => {
            if (item.user?.lensId) {
                if (item.user?.online)
                    onlineIds.push(item.user?.lensId);
                else offlineIds.push(item?.user?.lensId);
            }
        }
        );

        console.log("Online lens ids array", onlineIds);
        console.log("Offline lens ids array", offlineIds);

        // getting online lens profiles
        if (onlineIds.length > 0) {
            getProfiles({profileIds: onlineIds, limit: 50}).then((data) => {
                try {
                    const usersList = data.data?.profiles?.items.map((item: any, index: number) => {
                        return UserLens$(item);
                    });

                    setOnlineUsers(usersList);
                } catch (error) {
                    setOnlineUsers([]);
                }
            });
        } else {
            setOnlineUsers([]);
        }

        // getting offline lens profiles
        if (offlineIds.length > 0) {
            getProfiles({profileIds: offlineIds, limit: 50}).then((data) => {
                try {
                    const usersList = data.data?.profiles?.items.map((item: any, index: number) => {
                        return UserLens$(item);
                    });
                    setOfflineUsers(usersList);
                } catch (error) {
                    setOfflineUsers([]);
                }
            });
        } else {
            setOfflineUsers([]);
        }

        // checking if current user is a member of this channel
        try {
            const result = await channel?.raw?.queryMembers({
                id: authContext?.user.lens?.id,
            });

            // returns if the user is a member or not
            // if user is banned=true, or undefined
            // return result?.members[0] ? true : false;
            result?.members[0] ? setUserIsMember(true) : setUserIsMember(false);
            return result?.members[0] ? true : false;
        } catch (error) {
            setUserIsMember(false);
            return false;
        }
    };

    useEffect(() => {
        if (channel) fetchChannelMembers();
    }, [channel]);

    const checkOnline = (user: any) => {
        return user.online == true;
    };

    return {
        fetchChannelMembers: fetchChannelMembers,
        checkOnline: checkOnline,
        onlineUsers: onlineUsers,
        offlineUsers: offlineUsers,
        userIsMember: userIsMember,
        isLoading: isLoading,
    };
};

export default useStreamChannelMembers;
