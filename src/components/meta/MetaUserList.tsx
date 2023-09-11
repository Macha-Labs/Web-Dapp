import MCard from "@/_sdk/MCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import useUserMeta from "@/hooks/studio/useUserMeta";
import { style } from "@/styles/StyledConstants";
import { Box, Grid, GridItem, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  data?: any;
  hookData: any;
};

const MetaUserList = ({ hookData }: Props) => {
  const router = useRouter();
  const hookUserMeta = useUserMeta();
  const { colorMode } = useColorMode()
  useEffect(() => {
    if (router.isReady) {
      hookUserMeta?.fetchMetas(String(router.query.userId));
    }
  }, []);
  return (
    <Box marginLeft={"-1.2rem"} marginRight={"-1.2rem"} width="100%">
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
        <FlexColumn width="100%" hrAlign="center" vrAlign="center">
          <Image src={colorMode == "light" ? "/assets/userFeed-emptyState_light.svg" : "/assets/user-feed-empty-state.svg"} />
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>The feed is currently empty</Text>
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} mb={0}>Ready to share your Macha stories?</Text>
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} >This is where it all begins</Text>
        </FlexColumn>
      )}
    </Box>
  );
};

export default MetaUserList;
