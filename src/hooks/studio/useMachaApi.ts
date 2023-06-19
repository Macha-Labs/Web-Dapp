import { useState } from "react";

const useMachaApi = () => {
  const [selectedType, setSelectedType] = useState("https");

  const apiTypes = [
    {
      slug: "https",
      title: "HTTPS",
    },
    {
      slug: "graph",
      title: "Graph",
    },
    {
      slug: "contracts",
      title: "Contract",
    },
  ];

  const apiForm = {
    https: [
      {
        title: "URL",
        type: "input",
        inputType: "text",
      },
      {
        title: "Method",
        type: "select",
        inputType: null,
        options: [
          { slug: "get", title: "GET" },
          { slug: "post", title: "POST" },
          { slug: "push", title: "PUSH" },
          { slug: "delete", title: "DELETE" },
        ],
      },
    ],
    graph: [],
    contract: [],
  };

  return {
    apiTypes: apiTypes,
    apiForm: apiForm,
    selectedType: selectedType,
    setSelectedType: setSelectedType,
  };
};
export default useMachaApi;
