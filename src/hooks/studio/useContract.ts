import { contractDataBySlug } from "@/service/ApiService";
import {useState,useEffect} from "react"

const useContract = () => {

  const [contractDetails, setContractDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async (contract_slug: any) => {
    contractDataBySlug(contract_slug).then((res: any) => {
      console.log("contract fetching", res.data);
      setIsLoading(false)
      setContractDetails(res.data);
    });
  };

  return {
    contractDetails: contractDetails,
    isLoading: isLoading,
    _fetch: _fetch
  }

}
export default useContract