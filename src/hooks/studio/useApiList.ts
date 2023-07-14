import useUserStore from "@/store/useUserStore";
import {useState,useEffect} from "react"

const useApiList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const $userApis = useUserStore((state: any) => state.userApis);
    const [filteredData, setFilteredData] = useState<any>($userApis);

    useEffect(() => {
        setFilteredData($userApis);
        setIsLoading(false);
      }, [$userApis]);

    const handleFilter = (inputValue: string) => {
        const filtered = $userApis.filter((item: any) => {
          return item.name.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredData(filtered);
      };

    return {
        isLoading: isLoading,
        $userApis: $userApis,
        filteredData: filteredData,
        handleFilter: handleFilter
    }


}
export default useApiList