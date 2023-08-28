import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import useMachaSearch from "@/hooks/studio/useMachaSearch";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  options?: any;
};

const SearchHeader = ({ options }: Props) => {
  const hookMachaSearch = useMachaSearch();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // if (document && document.activeElement == searchRef.current) {
    //   setShowSuggestions(true);
    //   console.log("element has focus");
    // } else {
    //   setShowSuggestions(false);
    //   console.log("element does NOT have focus");
    // }
  });

  return (
    <>
      <FlexColumn width="50%" height="fit-content">
        <InputGroup>
          <input
            value={hookMachaSearch.query}
            type="text"
            ref={searchRef}
            className="searchHeader"
            onChange={hookMachaSearch.handleInputChange}
            onKeyPress={hookMachaSearch.handleKeyPress}
            placeholder="Try Spectacular Search Now"
            style={{
              height: "5rem",
              borderRadius: `${style.card.borderRadius.default}`,
              fontSize: `${style.font.h4}`,
              paddingRight: `${style.padding.xl}`,
              paddingLeft: `${style.padding.xl}`,
              background: `${style.input.bg.default}`,
              border: `${style.input.border.default}`,
              width: "100%",
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          {/* <Input
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
          ref={searchRef}
        /> */}
          <InputRightElement width="4.5rem" pointerEvents="none">
            <IconBase slug="icon-search" />
          </InputRightElement>
        </InputGroup>
        {showSuggestions && (
          <Box
            height={"10rem"}
            width={"100%"}
            marginTop={style.margin.sm}
            borderRadius={style.card.borderRadius.default}
            background={style.card.bg.default}
          ></Box>
        )}
      </FlexColumn>
      <style jsx>{`
        .searchHeader {
          border: 1px solid #0f172e !important;
        }
        input[type="text"]:focus {
          border: 1px solid rgba(15, 23, 46, 1) !important;
        }
        .searchHeader:hover {
          background: linear-gradient(
            141.09deg,
            rgba(10, 19, 51, 0.5) 11.08%,
            rgba(0, 15, 44, 0.38) 89.68%
          ) !important;
          border: 1px solid rgba(15, 23, 46, 1) !important;
        }
      `}</style>
    </>
  );
};

export default SearchHeader;
