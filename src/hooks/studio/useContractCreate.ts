import { createNewContract } from "@/service/ApiService";
import { useRef } from "react";

const useContractCreate = () => {
  const contractDataRef = useRef<any>({});

  const publishContract = async () => {
    const contractPayload = {
      name: contractDataRef.current["name"]?.value,
      description: contractDataRef.current["description"]?.value,
      address: contractDataRef.current["address"]?.value,
      chainId: contractDataRef.current["chainId"]?.value,
      slug: contractDataRef.current["slug"]?.value,
      interested_methods: contractDataRef.current["interested_methods"]?.value,
      interested_events: contractDataRef.current["interested_events"]?.value,
    };

    console.log("The contract payload data is ", contractPayload);
    createNewContract(contractPayload);
  };

  return {
    contractDataRef: contractDataRef,
    publishContract: publishContract,
  };
};
export default useContractCreate;
