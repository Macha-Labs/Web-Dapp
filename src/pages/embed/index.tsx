"use client";
import MiCard from "@/_ui/cards/MiCard";
import FlexColumn from "../../_ui/flex/FlexColumn";
import useMeta from "@/hooks/meta/useMeta";
import useGraph from "@/hooks/other/useGraph";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  const hookGraph = useGraph();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      hookGraph._fetch(router.query.id, router.query.type);
    }
  }, [router.query.id]);

  const sample_images = [
    "https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2022/06/17/186446-l1.jpg?itok=JbCGzL61",
    "https://imgd.aeplcdn.com/600x600/n/cw/ec/48687/lamborghini-aventador-left-front-three-quarter0.jpeg?wm=0",
  ];

  return (
    <FlexColumn height="100vh" vrAlign="center" hrAlign="center" width="100%">
      <Box
        height={"100%"}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        background={
          router.query.theme == "light" ? "rgba(255,255,255,1)" : "#030c1a"
        }
      >
        <MiCard
          slug={hookGraph?.mData?.document?.slug}
          colorMode={router.query.theme}
          cardHeight="100vh"
          action_name="Collect"
          loading={hookGraph?.isLoading}
          title={hookGraph?.mData?.document?.modified?.title}
          description={hookGraph?.mData?.document?.modified?.desc}
          media={hookGraph?.mData?.document?.modified?.media}
          audioURL={hookGraph?.audioUrl}
          audioCover={hookGraph?.audioCover}
          // music={hookGraph?.mData?.meta?.data?.modified?.meta_audio?.substr(
          //   5
          // )}
          // musicplayer={hookGraph?.mData?.meta?.data?.modified?.meta_audio}
          // video={hookGraph?.mData?.meta?.data?.modified?.meta_video}
          // video="https://ipfs.io/ipfs/bafybeihbbkfthpouunrprad6s73dqykwlasd7eznk3vrlh6cft7pr3y3ae"
          // image={hookGraph?.mData?.meta?.data?.modified?.meta_image}
          // carousel_images={sample_images}
        />
      </Box>
    </FlexColumn>
  );
};

export default Index;
