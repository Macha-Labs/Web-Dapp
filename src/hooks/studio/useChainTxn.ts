import { txnByChainId } from "@/service/ApiService";
import { useState, useEffect } from "react"

const useChainTxn = () => {

  const [chainTxnDetails, setChainTxnDetails] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(chainTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages,setTotalPages] = useState<number>(1)
  const [totalTxns,setTotalTxns] = useState<any>("");

  const _fetch = async (chain_id: any) => {
    setIsLoading(true)
    txnByChainId(chain_id, page).then((res: any) => {
      setTotalPages(Math.ceil(res.count / 10))
      setTotalTxns(res.count)
      console.log("chain txn fetching", res);
      setIsLoading(false)
      setChainTxnDetails(res.data);
      setFilteredData(res.data);
    });
  };

  const handleFilter = (inputValue: string) => {
    const filtered = chainTxnDetails.filter((item: any) => {
      return item.transaction.txn_hash.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return {
    contractTxnDetails: chainTxnDetails,
    filteredData: filteredData,
    setFilteredData: setFilteredData,
    handleFilter: handleFilter,
    searchVal: searchVal,
    setSearchVal: setSearchVal,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    page: page,
    setPage: setPage,
    totalPages: totalPages,
    _fetch: _fetch,
    totalTxns: totalTxns
  }
}
export default useChainTxn