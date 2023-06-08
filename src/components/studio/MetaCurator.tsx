import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import ChakraTable from "@/_ui/list/ChakraTable";
import React from "react";

function MetaCurator() {
  return (
    <FlexColumn vrAlign="flex-start">
      <InputSearch
        size="lg"
        placeholder="Search Studio"
        icon={{ slug: "icon-search" }}
        marginBottom="20px"
        marginTop="20px"
        width="40%"
      />
      <ChakraTable
        tableWidth="70%"
        th={["Curators", "Meta", "Curating Since"]}
        tr={[
          ["ABX_NAME", "Meta_war", "29-2-2020"],
          ["ABX_NAME", "Meta_war", "29-2-2020"],
          ["ABX_NAME", "Meta_war", "29-2-2020"],
        ]}
      />
    </FlexColumn>
  );
}

export default MetaCurator;
