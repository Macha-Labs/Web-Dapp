import { allContracts } from "@/service/ApiService";
import { useState, useEffect } from "react";
const useContractList = () => {
  const [contractList, setContractList] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterData, setFilteredData] = useState<any>(contractList);

  useEffect(() => {
    const fetch = async () => {
      await _fetch();
    };
    fetch();
  }, []);

  const _fetch = async () => {
    allContracts().then((res: any) => {
      console.log("all contract data from use transaction", res.data);
      setIsLoading(false);
      setContractList(res.data);
      setFilteredData(res.data);
    });
  };

  const handleSearch = (inputValue: string) => {
    const filtered = contractList.filter((item: any) => {
      return item.contract.name
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const handleFilter = (desired_chain_id: any) => {
    const filtered = contractList?.filter((item: any) => {
      // console.log(item.contract.chain_id, "  ", desired_chain_id);
      return (
        parseInt(item.contract.chain_id, 10) == parseInt(desired_chain_id, 10)
      );
    });
    // console.log("filtered", filtered);
    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilteredData(contractList);
  };

  return {
    contractList: contractList,
    isLoading: isLoading,
    handleSearch: handleSearch,
    filterData: filterData,
    handleFilter: handleFilter,
    clearFilters: clearFilters,
  };
};
export default useContractList;
