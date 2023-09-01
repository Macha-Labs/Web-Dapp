import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";
import useUserMeta from "@/hooks/studio/useUserMeta";
import { Box, Heading } from "@chakra-ui/react";
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
      hookUserMeta?.fetchMetas("0x57b7bf6f792a6181ec5afb88ce7bce330a9d1b67");
    }
  }, []);
  return (
    <Box marginLeft={"-1.2rem"} marginRight={"-1.2rem"}>
      <FlexRow
        flexWrap={"wrap"}
        width="100%"
        vrAlign="flex-start"
        height="fit-content"
        hrAlign="flex-start"
      >
        {hookUserMeta?.userMeta &&
          hookUserMeta?.userMeta?.map((item: any, index: any) => {
            return (
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
            );
          })}
      </FlexRow>
    </Box>
  );
};

export default MetaUserList;
