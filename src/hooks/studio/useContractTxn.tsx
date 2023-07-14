import { txnDataBySlug } from "@/service/ApiService";
import {useState, useEffect} from "react"

const useContractTxn = (slug: any) => {

    useEffect(() => {
        _fetch(slug)
    },[])

  const [contractTxnDetails, setContractTxnDetails] = useState<any>();

  const _fetch = async (contract_slug: any) => {
    txnDataBySlug(contract_slug).then((res: any) => {
      console.log("contract txn fetching", res);
      setContractTxnDetails(res.data);
    });
  };

  return {
    contractTxnDetails: contractTxnDetails
  }
}
export default useContractTxn