import { contractsOfChain } from "@/service/ApiService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useChainContracts = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      _fetch();
    }
  }, [router.query.chainId]);

  const [contracts, setContracts] = useState<any>();
  const chainId = router.query.chainId;
  console.log("chainId from usechaincontracts", chainId);

  const _fetch = () => {
    contractsOfChain(chainId).then((res) => {
      console.log("chain contracts", res);
      setContracts(res.data);
    });
  };

  return {
    contracts: contracts,
  };
};

export default useChainContracts;
