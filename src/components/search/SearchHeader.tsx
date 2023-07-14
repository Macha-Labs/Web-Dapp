import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import useMachaSearch from "@/hooks/studio/useMachaSearch";
import { style } from "@/styles/StyledConstants";
import { Input, InputGroup, InputRightElement, Select } from "@chakra-ui/react";

type Props = {
  options?: any;
};

const SearchHeader = ({ options }: Props) => {
  const hookMachaSearch = useMachaSearch();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "300px",
        backgroundImage:
          "url(https://ik.imagekit.io/metaworkLabs/Studio/Twitter_headerbg.png?updatedAt=1686990048804)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <FlexRow width="50%">
        <Select
          // placeholder="Snapshot"
          size={"lg"}
          width="20%"
          bg={style.card.bg.default}
          border={style.card.border.default}
          marginRight={style.margin["sm"]}
          value={hookMachaSearch.selectedOption}
          onChange={hookMachaSearch.handleOptionChange}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <InputGroup>
          <Input
            type="text"
            value={hookMachaSearch.query}
            size={"lg"}
            onChange={hookMachaSearch.handleInputChange}
            onKeyPress={hookMachaSearch.handleKeyPress}
            placeholder="Search"
          />
          <InputRightElement width="4.5rem" pointerEvents="none">
            <IconBase slug="icon-search" />
          </InputRightElement>
        </InputGroup>
      </FlexRow>
    </div>
  );
};

export default SearchHeader;
