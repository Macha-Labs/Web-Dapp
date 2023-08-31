import { ethers } from "ethers";
import MachaMeta_ABI from "@/data/ABI/MachaMeta_ABI.json";
import { config } from "@/config";

type Props = {
  metaId: any;
};

const useMetaDelete = () => {
  const deleteMeta = async ({ metaId }: Props) => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      config.MACHA_DATA_CONTRACT_ADDRESS,
      MachaMeta_ABI,
      signer
    );

    await contract.deleteMeta(metaId);
  };

  return {
    deleteMeta: deleteMeta,
  };
};

export default useMetaDelete;
