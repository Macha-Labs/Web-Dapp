import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import useUserMeta from "@/hooks/studio/useUserMeta";
import { style } from "@/styles/StyledConstants";
import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
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
      {hookUserMeta?.userMeta && hookUserMeta?.userMeta.length !== 0 ? (
        <>
          <Grid templateColumns="repeat(3,1fr)" gap="10px" width="100%">
            {hookUserMeta?.userMeta?.map((item: any, index: any) => {
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
        </>
      ) : (
        <>
          <FlexColumn width="100%" hrAlign="center" vrAlign="center">
            <Image src="/assets/user-feed-empty-state.svg" />
            <Text fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>The feed is currently empty</Text>
            <Text mb={0}>Ready to share your Macha stories?</Text>
            <Text>This is where it all begins</Text>
          </FlexColumn>
        </>
      )}
    </Box>
  );
};

export default MetaUserList;
