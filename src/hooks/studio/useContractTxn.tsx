import { txnDataBySlug } from "@/service/ApiService";
import { useState, useEffect } from "react"

const useContractTxn = () => {

  const [contractTxnDetails, setContractTxnDetails] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>(contractTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal,setSearchVal] = useState<any>("");
  const [page,setPage] = useState<number>(1)
  const [totalPages,setTotalPages] = useState<number>(1)

  const _fetch = async (contract_slug: any) => {
    txnDataBySlug(contract_slug,page).then((res: any) => {
      setTotalPages(Math.ceil(res.count / 10))
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
    setIsLoading: setIsLoading,
    _fetch: _fetch,
    page: page,
    setPage: setPage,
    totalPages: totalPages
  }
}
export default useContractTxn