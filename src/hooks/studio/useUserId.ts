import { userIdByAddress } from "@/service/ApiService";
import { useState } from "react";

const useUserId = () => {
  const [userIds, setUserIds] = useState<any>();

  const fetchIds = async (userAddress: string) => {
    await userIdByAddress(userAddress).then((res) => {
      console.log("response form useUserId", res.data);
      setUserIds(res.data);
    });
  };

  return {
    fetchIds: fetchIds,
    userId: userIds,
  };
};
export default useUserId;
