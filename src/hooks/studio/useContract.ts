import { contractDataBySlug } from "@/service/ApiService";
import {useState,useEffect} from "react"

const useContract = (_contract_slug: any) => {

  const [contractDetails, setContractDetails] = useState<any>();

  useEffect(() => {
    _fetch(_contract_slug)
  },[])

  const _fetch = async (contract_slug: any) => {
    contractDataBySlug(contract_slug).then((res: any) => {
      console.log("contract fetching", res);
      setContractDetails(res.data);
    });
  };

  return {
    contractDetails: contractDetails
  }

}
export default useContract