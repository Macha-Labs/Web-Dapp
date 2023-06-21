import { useState } from "react";

const useMachaApi = () => {
  const [selectedType, setSelectedType] = useState("https");
  const [params, setParams] = useState<any>([]);
  const [headers, setHeaders] = useState<any>([]);

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
      slug: "contract",
      title: "Contract",
    },
  ];

  const apiForm = {
    https: [
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
      {
        title: "URL",
        type: "input",
        inputType: "text",
      },
    ],
    graph: [],
    contract: [
      {
        title: "Contract Address",
        type: "input",
        inputType: "text",
      },
      {
        title: "Network",
        type: "select",
        options: [],
      },
    ],
  };

  return {
    apiTypes: apiTypes,
    apiForm: apiForm,
    selectedType: selectedType,
    setSelectedType: setSelectedType,
  };
};
export default useMachaApi;
