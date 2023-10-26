import { UserStream$ } from "@/schema/user";
import useMetaStore from "@/store/useMetaStore";
import { useState } from "react";

const useMachaSearch = () => {
  const options = [
    { value: "snapshot", label: "SnapShot" },
    { value: "poap", label: "POAP" },
    { value: "paragraph.xyz", label: "Paragraph.xyz" },
  ];

  const [query, setQuery] = useState("");
  const [resultData, setResultData] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const $meta = useMetaStore((state: any) => state.meta);

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const onSearch = async (query: any) => {
    // //console.log("query", query);
    // const result = await $meta?.fetchMetaOrigin(query, 0);
    // //console.log("Origin result", result);
    // setResultData(result.data);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };
  
  return {
    handleInputChange: handleInputChange,
    onSearch: onSearch,
    handleKeyPress: handleKeyPress,
    handleOptionChange: handleOptionChange,
    selectedOption: selectedOption,
    query: query,
    resultData: resultData,
    options: options,
  };
};

export default useMachaSearch;
