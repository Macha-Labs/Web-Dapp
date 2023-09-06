import { config } from "@/config";
import MachaSBT_ABI from "@/data/ABI/MachaSBT_ABI.json";
import chains from "@/data/network";
import { useToast } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
const networks = chains

const useNftMint = () => {
  const [chainId, setChainId] = useState<any>();
  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chains, switchNetwork } = useSwitchNetwork({
    onSuccess() {
      submit()
    },
    onError() {
      toast({
        title: `Please configure ${networks[chainId].chainName} in your wallet.`,
        status: "warning",
        duration: 5000,
        position: "top-right",
      });
    }
  });
  const { chain } = useNetwork();
  const router = useRouter()

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
      console.log("chain", chain)
      if (chain) {
        if (Number(chainId) !== chain.id) {
          console.log("wagmi chains", chains)
          switchNetwork?.(Number(chainId))
          return
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
          setIsLoading(true)
          await res.wait()
          setIsLoading(false)
          router.reload()
        } catch (error: any) {
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
    isLoading: isLoading
  };
};

export default useNftMint;
