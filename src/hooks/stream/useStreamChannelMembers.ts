import { useContext, useEffect, useState } from "react";
import { User$ } from "../../schema/user";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { logger } from "@/helpers/logger";
import { StreamContext } from "@/providers/StreamProvider";

const useStreamChannelMembers = (isAsync: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const streamContext = useContext(StreamContext);
  const [allUsersIds, setAllUsersIds] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>(null);
  const [offlineUsers, setOfflineUsers] = useState<any>(null);
  const [userIsMember, setUserIsMember] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>();

  const _fetch = async () => {
    if (streamContext?.hookChannel?.channel?.raw?.disconnected)
      return;

    const response = await streamContext?.hookChannel?.channel?.raw?.queryMembers({});
    let onlineIds: any[] = [];
    let offlineIds: any[] = [];
    response?.members.map((item: any, index: number) => {
      const user = new User$(null, null, item.user);
      user.setLensFromStream();
      if (item.user?.online) {
        onlineIds.push(user);
      } else offlineIds.push(user);
    });
    const result = [...onlineIds, ...offlineIds].map((item: any) => {
      return item.address;
    });

    logger('stream', 'useStreamChannelMembers?.fetchChannelMembers', 'Loading channel members', [onlineIds, offlineIds])

    setOnlineUsers(onlineIds);
    setOfflineUsers(offlineIds);
    setAllUsersIds(result);
  };

  // checking if current user is a member of this channel
  const checkUserIsAMember = async () => {
    try {
      const result = await streamContext?.hookChannel?.raw?.queryMembers({
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

  const checkOnline = (user: any) => {
    return user.online == true;
  };


  return {
    fetch: _fetch,
    checkOnline: checkOnline,
    users: onlineUsers,
    allUsers: onlineUsers?.concat(offlineUsers),
    allUsersIds: allUsersIds,
    onlineUsers: onlineUsers,
    offlineUsers: offlineUsers,
    userIsMember: userIsMember,
    isLoading: isLoading,
  };
};

export default useStreamChannelMembers;
