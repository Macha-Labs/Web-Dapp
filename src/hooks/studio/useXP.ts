import { allXPRewards } from "@/service/ApiService";
import { useState } from "react";

const useXP = () => {
  const [XPList, setXPList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async () => {
    allXPRewards().then((res: any) => {
      setIsLoading(false);
      setXPList(res.data);
    });
  };

  return {
    XPList: XPList,
    isLoading: isLoading,
    _fetch: _fetch
  };
};
export default useXP;
