import { ethers } from "ethers";
import MachaMeta_ABI from "@/data/ABI/MachaMeta_ABI.json";
import { config } from "@/config";
import { userMetaByAddress } from "@/service/ApiService";
import { useState } from "react";

type Props = {
  userAdderss: string;
};

const useUserMeta = () => {
  const [userMeta, setUserMeta] = useState<any>();

  const fetchMetas = async (userAdderss: string) => {
    await userMetaByAddress(userAdderss).then((res) => {
      console.log("response form useUserMeta", res.data);
      setUserMeta(res.data);
    });
  };

  return {
    fetchMetas: fetchMetas,
    userMeta: userMeta,
  };
};

export default useUserMeta;
