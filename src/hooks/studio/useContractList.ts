import { allContracts } from "@/service/ApiService";
import { useState, useEffect } from "react"
const useContractList = () => {

    const [contractList, setContractList] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        _fetch()
    }, [])

    const _fetch = async () => {
        allContracts().then((res: any) => {
            console.log("all contract data from use transaction", res.data);
            setIsLoading(false)
            setContractList(res.data);
        });
    };

    return {
        contractList: contractList,
        isLoading: isLoading
    }
}
export default useContractList