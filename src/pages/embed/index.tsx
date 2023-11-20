import MCard from "@/_sdk/MCard";
import useSearch from "@/_sdk/hooks/useSearch";
import FlexColumn from "@/_ui/flex/FlexColumn";
import PostCard from "@/components/cards/PostCard";
import useMeta from "@/hooks/meta/useMeta";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  const hookMeta = useMeta();
  console.log("metas from embed : ", hookMeta?.metaData?.meta);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      hookMeta._fetch(router.query.id);
    }
  }, [router.query.id]);
  return (
    <FlexColumn height="100vh" vrAlign="center" hrAlign="center">
      {/* <PostCard
        image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
        metaName={hookMeta?.metaData?.meta?.slug}
        slug={hookMeta?.metaData?.meta?.slug}
        description={hookMeta?.metaData?.meta?.data?.modified?.meta_description}
        title={hookMeta?.metaData?.meta?.data?.ipfs?.contentURI?.name}
        owner_name={hookMeta?.metaData?.metaOwner}
        width="100%"
      /> */}
      <MCard
        music={hookMeta?.metaData?.meta?.data?.modified?.meta_audio?.substr(5)}
        title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
        image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
        slug={hookMeta?.metaData?.meta?.slug}
        description={hookMeta?.metaData?.meta?.data?.modified?.meta_description}
        cardHeight="450px"
      />
    </FlexColumn>
  );
};

export default Index;
