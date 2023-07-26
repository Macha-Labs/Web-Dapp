import { txnByChainId } from "@/service/ApiService";
import { useState, useEffect } from "react"

const useChainTxn = () => {

  const [chainTxnDetails, setChainTxnDetails] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(chainTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<any>("");
  const [cursor, setCursor] = useState<any>("1");

  const _fetch = async (chain_id: any) => {
    setIsLoading(true)
    txnByChainId(chain_id, cursor).then((res: any) => {
      console.log("chain txn fetching", res);
      setIsLoading(false)
      setChainTxnDetails(res.data);
      setFilteredData(res.data.reverse());
      setCursor(res.cursor)
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
    _fetch: _fetch
  }
}
export default useChainTxn