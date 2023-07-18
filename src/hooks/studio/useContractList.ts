import { allContracts } from "@/service/ApiService";
import { useState, useEffect } from "react"
const useContractList = () => {

    const [contractList, setContractList] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filterData,setFilteredData] = useState<any>(contractList);

    useEffect(() => {
        _fetch()
    }, [])
    

    const _fetch = async () => {
        allContracts().then((res: any) => {
            console.log("all contract data from use transaction", res.data);
            setIsLoading(false)
            setContractList(res.data);
            setFilteredData(res.data)
        });
    };
    const handleFilter = (inputValue: string) => {
        const filtered = contractList.filter((item: any) => {
          return item.contract.name.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredData(filtered);
      };


    return {
        contractList: contractList,
        isLoading: isLoading,
        handleFilter: handleFilter,
        filterData: filterData
    }
}
export default useContractList