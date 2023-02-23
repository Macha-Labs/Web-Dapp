import { useContext, useEffect, useState } from "react";
import { getProfiles } from "../../helpers/lens/lens";
import { UserLens$, UserStream$ } from "../../schema/user";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { off } from "process";

const useStreamChannelMembers = (channel: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [offlineUsers, setOfflineUsers] = useState<any>([]);
  const [userIsMember, setUserIsMember] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>();

  const fetchChannelMembers = async () => {
    const response = await channel?.queryMembers({});
    let onlineIds: any[] = [];
    let offlineIds: any[] = [];
    response?.members.map((item: any, index: number) => {
      if (item.user?.online) {
        onlineIds.push({lens: UserStream$(item.user)});
      } else offlineIds.push({stream: UserStream$(item.user), lens: {}});
    });
    setOnlineUsers(onlineIds);
    setOfflineUsers(offlineIds);
  };
  // checking if current user is a member of this channel
  const checkUserIsAMember = async () => {
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
