import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data?: any;
  hookMetasList: any;
};

const MetaList = ({ hookMetasList }: Props) => {
  const router = useRouter();
  return (
    <Box width="100%">
      <Grid templateColumns="repeat(3,1fr)" gap="10px" width="100%">
        {hookMetasList.isLoading && (
          <>
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
            <CardSkeleton width="100%" />
          </>
        )}
        {!hookMetasList.isLoading &&
          hookMetasList?.metaAll &&
          hookMetasList?.metaAll?.map((item: any, index: any) => {
            return (
              <GridItem key={index} colSpan={1}>
                {/* <Box bg="white" border="1px solid #000000">adsa</Box> */}
                <MCard
                  music={item?.meta?.data?.modified?.meta_audio?.substr(
                    5,
                    item?.meta?.data?.modified?.meta_audio.length - 5
                  )}
                  title={item?.meta?.data?.modified?.meta_title}
                  key={index}
                  image={item?.meta?.data?.modified?.meta_image}
                  slug={item?.meta?.slug}
                  // width="30%"
                  description={item?.meta?.data?.modified?.meta_description}
                  onClick={() => {
                    router.push(`/search/meta/${item?._id}`);
                  }}
                />
              </GridItem>
            );
          })}
      </Grid>
      <FlexRow marginBottom="lg" height="fit-content">
        {hookMetasList.showMoreLoading ? (
          <Loader size="sm" />
        ) : (
          !hookMetasList.lastPage && (
            <ButtonNative
              variant="state_brand"
              text="Show More"
              onClick={() => {
                if (router.isReady) {
                  if (window !== undefined) {
                    window.sessionStorage.setItem(
                      `${router.query.id ? router.query.id : "All"}_page`,
                      JSON.stringify(hookMetasList.pageNo)
                    );
                  }

                  hookMetasList._fetchMore(router.query.id, 30);
                }
              }}
            />
          )
        )}
      </FlexRow>
    </Box>
  );
};

export default MetaList;
