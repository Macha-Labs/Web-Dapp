import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexRow from "@/_ui/flex/FlexRow";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data?: any;
  hookMetasList: any;
};

const MetaList = ({ hookMetasList }: Props) => {
  const router = useRouter();
  return (
    <Box>
      <FlexRow
        flexWrap={"wrap"}
        width="100%"
        vrAlign="flex-start"
        height="fit-content"
      >
        {hookMetasList.isLoading && (
          <>
            <CardSkeleton width="30%" />
            <CardSkeleton width="30%" />
            <CardSkeleton width="30%" />
            <CardSkeleton width="30%" />
            <CardSkeleton width="30%" />
            <CardSkeleton width="30%" />
          </>
        )}
        {!hookMetasList.isLoading &&
          hookMetasList?.metaAll &&
          hookMetasList?.metaAll?.map((item: any, index: any) => {
            return (
              <MCard
                title={item?.meta?.data?.modified?.meta_title}
                key={index}
                image={item?.meta?.data?.modified?.meta_image}
                width="30%"
                description={item?.meta?.data?.modified?.meta_description}
                onClick={() => {
                  router.push(`/search/meta/${item?._id}`);
                }}
              />
            );
          })}
      </FlexRow>
      <FlexRow marginBottom="lg" height="fit-content">
        {!hookMetasList.lastPage && (
          <ButtonNative
            variant="state_brand"
            text="Show More"
            onClick={() => {
              if (router.isReady) {
                hookMetasList._fetchMore(router.query.id, 30);
                hookMetasList.setPageNo(hookMetasList.pageNo + 1);
                if (window !== undefined) {
                  window.sessionStorage.setItem(
                    `${router.query.id ? router.query.id : "All"}_page`,
                    JSON.stringify(hookMetasList.pageNo + 1)
                  );
                }
              }
            }}
          />
        )}
      </FlexRow>
    </Box>
  );
};

export default MetaList;
