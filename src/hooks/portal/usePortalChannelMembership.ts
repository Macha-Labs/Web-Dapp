import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { addMembers, removeMembers } from "../../service/ChannelService";
import useLensConnections from "../lens/useLensConnections";

const usePortalChannelMembership = (channel: any) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const hookLensConnections = useLensConnections(authContext?.address, authContext?.user?.lens?.id);
  const [isLoading, setIsLoading] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [usersIds, setUsersIds] = useState<any>([]);

  const handleCheckedUsers = (user: any) => {
    if (!users.includes(user?.lens?.ownedBy.toLowerCase())) {
      setUsers([...users, user]);
      setUsersIds([...usersIds, user?.lens?.ownedBy?.toLowerCase()]);
    } else {
      const usersFilter = users.filter(
        (item: any) => item?.lens?.ownedBy?.toLowerCase() != user?.lens?.ownedBy?.toLowerCase()
      );
      setUsers(usersFilter);
      setUsersIds(usersFilter.map((item: any) => {return item?.lens?.ownedBy?.toLowerCase()}));
    }
  };

  // adding selected members to current channel
  const addMembersToChannel = (callback:any = null) => {
    // const myFollowers = Object.values(users);
    if (users) {
      const data = {
        members: usersIds,
        id: channel.id,
      };
      addMembers(data);
      callback();
    }
  };

  // run when -> members selected -> clicked on remove
  const removeMembersFromChannel = async (callback:any = null) => {
    if (users) {
      const data = {
        members: usersIds,
        id: channel.id,
      };
      removeMembers(data);
      callback();
    }
  };

  // fetching my lens followers
  useEffect(() => {
    if (authContext.address) {
      hookLensConnections.getFollowers(authContext.user?.lens?.id);
    }
  }, [authContext.address]);

  return {
    removeMembersFromChannel,
    followers: hookLensConnections.followers,
    following: hookLensConnections.following,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    visible: visible,
    setVisible: setVisible,
    handleCheckedUsers: handleCheckedUsers,
    addMembersToChannel: addMembersToChannel,
    users: users,
    userIds: usersIds
  };
};
export default usePortalChannelMembership;
