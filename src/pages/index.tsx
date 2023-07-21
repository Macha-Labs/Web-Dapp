import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavTop from "@/_ui/nav/NavTop";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import SearchHeader from "@/components/search/SearchHeader";
import SearchList from "@/components/search/SearchList";
import useMachaSearch from "@/hooks/studio/useMachaSearch";
import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Search = () => {
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const $address = useAuthStore((state: any) => state.address);

  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedTrigger, setSelectedTrigger] = useState<string>("");

  const hookMachaSearch = useMachaSearch();

  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  const renderNav = () => {
    return (
      <NavTop
        rightElem={
          <FlexRow hrAlign="flex-end">
            {$address && (
              <NavButton
                marginRight={style.margin["xxs"]}
                marginLeft={style.margin["xxs"]}
                width="fit-content"
              />
            )}
            <Box>
            <ConnectWalletButton />
            </Box>
          </FlexRow>
        }
      />
    );
  };

  const renderBody = () => {
    return (
      <FlexBody header={<SearchHeader options={hookMachaSearch.options} />}>
        <FlexColumn
          width="100%"
          vrAlign="center"
          hrAlign="flex-start"
          height="100%"
        >
          <SearchList data={hookMachaSearch.resultData} />
        </FlexColumn>
      </FlexBody>
    );
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Search;
