import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { addMembers, removeMembers } from "../../service/ChannelService";
import useLensConnections from "../lens/useLensConnections";

const usePortalChannelMembership = (channel) => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const hookLensConnections = useLensConnections(authContext?.address);
  const [isLoading, setIsLoading] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);

  // handling selection of users
  // const handleCheckedUsers = (userAddress, index) => {
  //     if (users[userAddress]) {
  //         console.log(`found ${users[userAddress]} at ${index}. Now removing user`);
  //         // users[index] = null
  //         setUsers({...users, [userAddress.toString()]: null});
  //         console.log(users);
  //     } else {
  //         console.log(`Not found Adding address ${userAddress} at ${index}`);
  //         // users[index] = userAddress.toLowerCase();
  //         setUsers({
  //             ...users,
  //             [userAddress.toString()]: userAddress.toLowerCase(),
  //         });
  //         console.log(users);
  //     }
  // };
  // var users = [];
  const handleCheckedUsers = (userAddress, index) => {
    console.log("Focusing address ", userAddress);
    if (!users.includes(userAddress)) {
      // users.push(userAddress);
      setUsers([...users, userAddress.toLowerCase()]);
      console.log(`Added ${userAddress}, updated array ${users}`);
    } else {
      const usersFilter = users.filter(
        (user) => user != userAddress.toLowerCase()
      );
      setUsers(usersFilter);
      console.log(`Removed ${userAddress}, updated array ${users}`);
    }
  };

  // adding selected members to current channel
  const addMembersToChannel = () => {
    // const myFollowers = Object.values(users);
    if (users) {
      const data = {
        members: users,
        id: channel.id,
      };
      console.log(data);
      console.log(users);
      addMembers(data);
    } else {
      console.log("No followers selected");
    }
  };

  // run when -> members selected -> clicked on remove
  const removeMembersFromChannel = async () => {
    console.log(`Users to remove ${users}`);
    if (users) {
      const data = {
        members: users,
        id: channel.id,
      };
      removeMembers(data);
    } else {
      console.log("No members selected");
    }
  };

  // fetching my lens followers
  useEffect(() => {
    if (authContext.address) {
      console.log(
        "Fetching followers for lens id ",
        authContext.user?.lens?.id
      );
      hookLensConnections.getFollowers(authContext.user?.lens?.id);
    } else {
      console.log("User address not found");
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
  };
};
export default usePortalChannelMembership;
