import MCard from "@/_sdk/MCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import useSearch from "@/hooks/studio/useSearch";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Search = () => {

    const router = useRouter()
    const hookSearch = useSearch()

    useEffect(() => {
        if (router.isReady) {
            hookSearch._fetch(String(router.query.searchString))
        }
    }, [router.query.searchString]);

    const renderNavLeft = () => {
        return <NavLeft />;
    };

    const renderNavTop = () => {
        return <NavMeta search={true} />;
    };

    const renderBody = () => {
        return (
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
                <Box
                    // paddingTop={style.margin["lg"]}
                    paddingTop={style.margin.navBoth}
                    display={"flex"}
                    width="100%"
                    justifyContent={"center"}
                >
                    <FlexRow
                        flexWrap={"wrap"}
                        width="100%"
                        vrAlign="flex-start"
                        hrAlign="flex-start"
                        height="fit-content"
                    >
                        {hookSearch.isLoading && <FlexRow height="200px" width="80vw">
                            <Loader size="lg" />
                        </FlexRow>}
                        {!hookSearch.isLoading && ((hookSearch.searchResults.length !== 0) ? hookSearch.searchResults.map((item: any, index: any) => (
                            <MCard
                                title={item?.meta?.data?.modified?.meta_title}
                                key={index}
                                image={item?.meta?.data?.modified?.meta_image}
                                slug={item?.meta_schema?.name}
                                width="30%"
                                description={item?.meta?.data?.modified?.meta_description}
                                onClick={() => {
                                    router.push(`/search/meta/${item?._id}`);
                                }}
                            />
                        )) :
                            <Box>
                                <Text>No results found</Text>
                            </Box>
                        )}
                    </FlexRow>
                </Box>
            </FlexColumn>
        );
    };

    return (
        <FlexWindow
            view="both"
            navLeft={renderNavLeft()}
            navTop={renderNavTop()}
            bodyElem={renderBody()}
        ></FlexWindow>
    );
};

export default Search;