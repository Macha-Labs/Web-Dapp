import { allXPRewards, fetchUserXPRewards } from "@/service/ApiService";
import { useEffect, useState } from "react";

const useXP = () => {
  const [XPList, setXPList] = useState<any>();
  const [userXPList,setUserXPList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async () => {
    allXPRewards().then((res: any) => {
      setIsLoading(false);
      setXPList(res.data);
    });
  };

  const _fetchUserXP = async (address: any) => {
    const res = await fetchUserXPRewards(address)
    console.log("user xp data",res)
  }

  return {
    _fetch: _fetch,
    XPList: XPList,
    isLoading: isLoading,
    _fetchUserXP: _fetchUserXP,
    userXPList: userXPList,
  };
};
export default useXP;
