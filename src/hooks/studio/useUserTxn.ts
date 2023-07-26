import { txnByUserAddress } from "@/service/ApiService";
import { useState } from "react";

const useUserTxn = () => {

  const [userTxnDetails, setUserTxnDetails] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(userTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal,setSearchVal] = useState<any>("");

  const _fetch = async (from_address: any) => {
    txnByUserAddress(from_address).then((res: any) => {
      console.log("user txn fetching", res);
      setIsLoading(false)
      setUserTxnDetails(res.data);
      setFilteredData(res.data.reverse());
    });
  };

  const handleFilter = (inputValue: string) => {
    const filtered = userTxnDetails.filter((item: any) => {
      return item.transaction.txn_hash.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return {
    contractTxnDetails: userTxnDetails,
    filteredData: filteredData,
    setFilteredData: setFilteredData,
    handleFilter: handleFilter,
    searchVal: searchVal,
    setSearchVal: setSearchVal,
    isLoading: isLoading,
    _fetch: _fetch
  }
}
export default useUserTxn