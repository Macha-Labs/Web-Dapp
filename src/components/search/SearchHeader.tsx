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
    <FlexRow width="50%" height="fit-content">
      <InputGroup>
        <Input
          height={"5rem"}
          type="text"
          value={hookMachaSearch.query}
          size={"lg"}
          borderRadius={style.card.borderRadius.default}
          fontSize={style.font.h4}
          onChange={hookMachaSearch.handleInputChange}
          onKeyPress={hookMachaSearch.handleKeyPress}
          placeholder="Try Spectacular Search Now"
          paddingX={style.padding.xl}
        />
        <InputRightElement width="4.5rem" pointerEvents="none">
          <IconBase slug="icon-search" />
        </InputRightElement>
      </InputGroup>
    </FlexRow>
  );
};

export default SearchHeader;
