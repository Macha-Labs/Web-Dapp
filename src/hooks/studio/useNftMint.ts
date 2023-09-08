import { config } from "@/config";
import MachaSBT_ABI from "@/data/ABI/MachaSBT_ABI.json";
import chains from "@/data/network";
import { useToast } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import useUserCreate from "./useUserCreate";
import useXP from "./useXP";
import useAlchemy from "./useAlchemy";
import { contractAddresses } from "@/data/xpContractAddresses";
const networks = chains;

const useNftMint = () => {
  const [chainId, setChainId] = useState<any>();
  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const hookUserCreate = useUserCreate();
  const hookXP = useXP();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const hookAlchemy = useAlchemy()
  const [userEarnedXPs,setUserEarnedXPs] = useState<number>(0);

  useEffect(() => {
    const f = async () => {
      await hookXP._fetch();
    };
    f();
  }, []);

  const { chains, switchNetwork } = useSwitchNetwork({
    onSuccess() {
      submit();
    },
    onError() {
      toast({
        title: `Please configure ${networks[chainId].chainName} in your wallet.`,
        status: "warning",
        duration: 5000,
        position: "top-right",
      });
    },
  });
  const { chain } = useNetwork();

  const submit = async () => {
    if (chainId == "") {
      toast({
        title: "Please select a network.",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (!address) {
      if (openConnectModal) {
        openConnectModal();
      }
    }

    if (address) {
      console.log("chain", chain);
      if (chain) {
        if (Number(chainId) !== chain.id) {
          console.log("wagmi chains", chains);
          switchNetwork?.(Number(chainId));
          return;
        }
      }

      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          chainId == 314159
            ? config.MACHA_CALIBRATION_SBT_CONTRACT_ADDRESS
            : chainId == 80001
            ? config.MACHA_MUMBAI_SBT_CONTRACT_ADDRESS
            : config.MACHA_GOERLI_SBT_CONTRACT_ADDRESS,
          MachaSBT_ABI,
          signer
        );
        console.log("contractData", contract);
        console.log("signer", signer);
        console.log("provider", provider);

        try {
          const res = await contract.safeMint();
          setIsLoading(true);
          await res.wait();
          console.log("res nftmint", res);
          let tokenId;
          await provider.getTransactionReceipt(res.hash).then((res) => {
            tokenId = parseInt(res.logs[0].topics[3], 16);
          });
          const filteredChains = hookXP?.XPList?.filter(
            (task: any) => task.project == "macha" && task.chainId == chainId
          );
          const taskId = filteredChains[0]._id;
          await hookUserCreate.createUser(
            chain?.name,
            chainId,
            res?.hash,
            Date.now(),
            tokenId,
            taskId ? taskId : null
          );
          hookAlchemy.nftByAddress.forEach((nft: any) => {
            Object.keys(contractAddresses).forEach((contract_address: any) => {
              if(nft.contract.address == contractAddresses[contract_address]){
                setUserEarnedXPs(userEarnedXPs + 10)
              }
            })
          })
          setIsLoading(false);
          // router.reload();
        } catch (error: any) {
          console.log(error);
          toast({
            title: error.code,
            status: "warning",
            duration: 5000,
            position: "top-right",
          });
        }
      }
    }
  };

  return {
    chainId: chainId,
    setChainId: setChainId,
    submit: submit,
    isLoading: isLoading,
  };
};

export default useNftMint;
