import { dataPlugins } from "@/data/dataPlugins";
import { style } from "@/styles/StyledConstants";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader1 from "@/_ui/loader/Loader1";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SearchCol from "../search/SearchCol";
import SearchHeader from "../search/SearchHeader";
import SearchPlugins from "../search/SearchPlugins";
type Props = {
  hookSearch?: any;
};

const Msearch = ({ hookSearch }: Props) => {
  const router = useRouter();
  return (
    <Box width={"100%"} padding={style.padding.md} height={"80%"} zIndex="1000">
      <FlexRow marginBottom={"md"}>
        <SearchHeader
            height={"3rem"}
            hookSearch={hookSearch}
          />
      </FlexRow>
      <Box height={"100%"} overflowY={"scroll"}>
        { !hookSearch.isLoading && !hookSearch?.plugin &&
          <SearchPlugins hookSearch={hookSearch}/>
        }
        <SearchCol
          plugin={hookSearch?.plugin}
          next={() => {
            hookSearch?.handleNext({
              searchQuery: router?.query?.search,
              category: router?.query?.id,
            });
          }}
          isLoading={hookSearch?.isLoading}
          results={hookSearch?.searchResults}
          router={router}
        />
      </Box>
    </Box>
  );
};

export default Msearch;
