import { createUserInDB } from "@/service/ApiService";
import { useAccount } from "wagmi";

const useUserCreate = () => {
  const { address } = useAccount();
  const createUser = async (
    chain: any,
    chainId: any,
    txnHash: any,
    timeStamp: any,
    tokenId: any,
    taskId: any
  ) => {
    const usePayLoad = {
      address: address,
      claims: {
        chain: chain,
        chainId: chainId,
        txn_hash: txnHash,
        timeStamp: timeStamp,
        tokenId: tokenId,
        taskId: taskId,
      },
    };

    createUserInDB(usePayLoad).then((res) => {
      console.log("res from useusercreate", res);
    });
  };
  return {
    createUser: createUser,
  };
};

export default useUserCreate;
