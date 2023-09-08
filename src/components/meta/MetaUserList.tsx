import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import useUserMeta from "@/hooks/studio/useUserMeta";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  data?: any;
  hookData: any;
};

const MetaUserList = ({ hookData }: Props) => {
  const router = useRouter();
  const hookUserMeta = useUserMeta();

  useEffect(() => {
    if (router.isReady) {
      hookUserMeta?.fetchMetas(String(router.query.userId));
    }
  }, []);
  return (
    <Box marginLeft={"-1.2rem"} marginRight={"-1.2rem"}>
      <Grid templateColumns="repeat(3,1fr)" gap="10px" width="100%">
        {hookUserMeta?.userMeta &&
          hookUserMeta?.userMeta?.map((item: any, index: any) => {
            return (
              <GridItem key={index} colSpan={1}>
              <MCard
                title={item?.meta?.data?.modified?.meta_title}
                key={index}
                image={item?.meta?.data?.modified?.meta_image}
                slug={item?.meta_schema?.name}
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
    </Box>
  );
};

export default MetaUserList;
