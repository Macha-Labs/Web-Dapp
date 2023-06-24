import MCard from "@/_sdk/MCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import { truncateString } from "@/helpers";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};
function MetaNewPlayground({ id }: Props) {
  const options = [
    { value: "snapshot", label: "SnapShot" },
    { value: "poap", label: "POAP" },
    { value: "paragraph.xyz", label: "Paragraph.xyz" },
  ];

  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const [selectedOption, setSelectedOption] = useState<any>(options[0].value);

  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  const [resultData, setResultData] = useState<any>({});

  const [query, setQuery] = useState("");

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const onSearch = async (query: any) => {
    const result = await $meta.fetchMetaOrigin(query, 0);
    console.log("Origin result", result);
    setResultData(result.data);
  };

  return (
    <FlexColumn
      width="100%"
      vrAlign="center"
      hrAlign="flex-start"
      height="100%"
    >
      <FlexRow>
        <Select
          // placeholder="Snapshot"
          size={"md"}
          width="20%"
          bg={style.card.bg.default}
          border={style.card.border.default}
          marginRight={style.margin["sm"]}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <InputGroup>
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search"
          />
          <InputRightElement width="4.5rem" pointerEvents="none">
            <IconBase slug="icon-search" />
          </InputRightElement>
        </InputGroup>
      </FlexRow>
      {console.log("resultData", resultData)}
      <FlexRow flexWrap={"wrap"} marginTop={"lg"} hrAlign="flex-start">
        {Object.keys(resultData).length > 0 ? (
          resultData.proposals.map((result: any, index: any) => {
            return (
              <MCard
                key={index}
                title={truncateString(result.author, 10)}
                description={truncateString(result.body, 150)}
                // floorPrice={item.floorPrice}
              />
            );
          })
        ) : (
          <Text>No result Found</Text>
        )}
      </FlexRow>
    </FlexColumn>
  );
}

export default MetaNewPlayground;
