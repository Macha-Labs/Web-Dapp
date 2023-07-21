import { txnDataBySlug } from "@/service/ApiService";
import { useState, useEffect } from "react"

const useContractTxn = () => {

  const [contractTxnDetails, setContractTxnDetails] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>(contractTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal,setSearchVal] = useState<any>("");

  

  const _fetch = async (contract_slug: any) => {
    txnDataBySlug(contract_slug).then((res: any) => {
      console.log("contract txn fetching", res);
      setIsLoading(false)
      setContractTxnDetails(res.data);
      setFilteredData(res.data);
    });
  };

  const handleFilter = (inputValue: string) => {
    const filtered = contractTxnDetails.filter((item: any) => {
      return item.transaction.txn_hash.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return {
    contractTxnDetails: contractTxnDetails,
    filteredData: filteredData,
    setFilteredData: setFilteredData,
    handleFilter: handleFilter,
    searchVal: searchVal,
    setSearchVal: setSearchVal,
    isLoading: isLoading,
    _fetch: _fetch
  }
}
export default useContractTxn