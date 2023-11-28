import { useState, useRef } from "react";
import { embeddSearchResolver } from "../api";
import { useRouter } from "next/router";

const useEmbeddSearch = () => {

    const [searchResults, setSearchResults] = useState<any>()
    const [inputValue, setInputValue] = useState("");
    const regex = /@0x[0-9a-fA-F]{40}/g;
    const searchRef = useRef(null);
    const router = useRouter();
    const [isLoading,setIsLoading] = useState<Boolean>(false)


    const handleEmbeddSearch = async (query: String) => {
        setIsLoading(true)
        let res = await embeddSearchResolver(query);
        // console.log("check search results -> query", searchResults);
        if (res.data) {
            setSearchResults(res.data);
            setIsLoading(false)
        }
    };

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;

        // Check if the input value matches the regex pattern
        if (regex.test(newValue)) {
            // If it matches, use hookSearch1 and remove the first character

            setInputValue(newValue.substring(1));
        } else {
            // If it doesn't match, use hookSearch

            setInputValue(newValue);
        }
    };

    const handleRoute = (e: any) => {
        //console.log(router, "router value");
        if (e.key === "Enter") {
            e.preventDefault();
            const newValue = e.target.value;
            const searchValue = regex.test(inputValue)
                ? newValue.substring(1)
                : newValue;
            let url = `/embeddSearch/?search=${searchValue}`;
            // if (router?.query?.id) {
            //     url = `/embeddSearch/?id=${router?.query?.id}&search=${searchValue}`;
            // }
            router.push(url);
        }
    };

    return {
        handleEmbeddSearch: handleEmbeddSearch,
        handleInputChange: handleInputChange,
        inputValue: inputValue,
        searchRef: searchRef,
        handleRoute: handleRoute,
        searchResults: searchResults,
        isLoading: isLoading
    }
}

export default useEmbeddSearch