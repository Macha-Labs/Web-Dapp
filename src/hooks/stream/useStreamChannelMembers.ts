import { useContext, useEffect, useState } from "react";
import { getProfiles } from "../../helpers/lens/lens";
import { UserLens$, UserStream$, User$ } from "../../schema/user";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { off } from "process";
import { isTemplateExpression } from "typescript";

const useStreamChannelMembers = (channel: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const [allUsersIds, setAllUsersIds] = useState<any>([]);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [offlineUsers, setOfflineUsers] = useState<any>([]);
  const [userIsMember, setUserIsMember] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>();

  const fetchChannelMembers = async () => {
    const response = await channel?.queryMembers({});
    let onlineIds: any[] = [];
    let offlineIds: any[] = [];
    response?.members.map((item: any, index: number) => {
      const user = new User$(null, null, item.user);
      user.setLensFromStream();
      if (item.user?.online) {
        onlineIds.push(user);
        console.log("onlineids", onlineIds);
      } else offlineIds.push(user);
    });
    setOnlineUsers(onlineIds);
    setOfflineUsers(offlineIds);
    const result = [...offlineUsers, ...onlineUsers].map((item: any) => {
      return item.address;
    });
    setAllUsersIds(result);
    console.log("result", result);
  };
  console.log(allUsersIds);
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
    allUsers: onlineUsers.concat(offlineUsers),
    allUsersIds: allUsersIds,
    onlineUsers: onlineUsers,
    offlineUsers: offlineUsers,
    userIsMember: userIsMember,
    isLoading: isLoading,
  };
};

export default useStreamChannelMembers;
