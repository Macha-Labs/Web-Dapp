import { config } from "@/config";
import { useToast } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import MachaSBT_ABI from "@/data/ABI/MachaSBT_ABI.json";

const useNftMint = () => {
  const [chainId, setChainId] = useState<any>();
  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

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
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          chainId == 1
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
          await contract.safeMint();
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
  };
};

export default useNftMint;
