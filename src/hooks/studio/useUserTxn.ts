import { txnByUserAddress } from "@/service/ApiService";
import { useState } from "react";

const useUserTxn = () => {

  const [userTxnDetails, setUserTxnDetails] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(userTxnDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchVal,setSearchVal] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages,setTotalPages] = useState<number>(1)

  const _fetch = async (from_address: any) => {
    txnByUserAddress(from_address,page).then((res: any) => {
      console.log("user txn fetching", res);
      setTotalPages(Math.ceil(res.count / 10))
      setIsLoading(false)
      setUserTxnDetails(res.data);
      setFilteredData(res.data);
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
    setIsLoading: setIsLoading,
    page: page,
    setPage: setPage,
    totalPages: totalPages,
    _fetch: _fetch
  }
}
export default useUserTxn