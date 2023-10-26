import { checkUserXP } from "@/data/UserXPEarned";
import { allXPRewards } from "@/service/ApiService";
import { useState } from "react";

const useXP = () => {
  const [XPList, setXPList] = useState<any>();
  const [userXPList, setUserXPList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async () => {
    allXPRewards().then((res: any) => {
      setIsLoading(false);
      setXPList(res.data);
    });
  };

  const _fetchUserXP = async (address: any) => {
    // const res = await fetchUserXPRewards(address);
    // //console.log(res, "userXP");
    // setUserXPList(res.data);
    const checkUserXpKeys = Object.keys(checkUserXP)
    const responsePromises = checkUserXpKeys.map(async (taskId: any) => {
      return await checkUserXP[taskId](address)
    })
    const resolvedPromises = await Promise.all(responsePromises)
    let userXPClaimedXPs: any = {}
    resolvedPromises.map((isNftOwner: any, index: any) => {
      userXPClaimedXPs[checkUserXpKeys[index]] = isNftOwner
    })
    //console.log("user xp claimed xps",userXPClaimedXPs)
    setUserXPList(userXPClaimedXPs)
  };

  return {
    _fetch: _fetch,
    XPList: XPList,
    isLoading: isLoading,
    _fetchUserXP: _fetchUserXP,
    userXPList: userXPList,
  };
};
export default useXP;
