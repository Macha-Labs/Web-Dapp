import { searchAllMetas } from "@/service/ApiService";
import { useState,useEffect } from "react";


const useSearch = () => {
    const [searchResults, setSearchResults] = useState<any>([])
    const [searchString,setSearchString] = useState<any>()
    const [isLoading,setIsLoading] = useState<any>(true)

    const _fetch = async (searchTerm: string) => {
        setIsLoading(true)
        const res = await searchAllMetas(searchTerm)
        if(res.data){
            setSearchResults(res.data)
        }
        else{
            console.log("search results not found")
            setSearchResults([])
        }
        setIsLoading(false)
    }

    return {
        _fetch: _fetch,
        searchResults: searchResults,
        searchString: searchString,
        setSearchString: setSearchString,
        isLoading: isLoading
    };
};

export default useSearch;
