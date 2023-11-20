import PostCard from "@/components/cards/PostCard";
import React from "react";

const index = () => {
  return (
    <PostCard
      // title={item?.meta?.data?.modified?.meta_title}

      image="https://ipfs.io/ipfs/bafybeiaskk4ztqzslykrkb6y67htnqyvbwg6yh2dicyzzi6cjb2s47aom4"
      metaName="embed"
      slug="lens_post"
      description="sample desc"
      title="iframe"
      owner_name="0x26...e3"
      //   onClick={() => {
      //     router.push(`/search/meta/${item?._id}`);
      //   }}
      width="100%"
    />
    // <PostCard
    //   // title={item?.meta?.data?.modified?.meta_title}
    //   key={index}
    //   image={item?.meta?.data?.modified?.meta_image}
    //   metaName={item?.meta_schema?.name}
    //   slug={item?.meta?.slug}
    //   description={item?.meta?.data?.modified?.meta_description}
    //   title={item?.meta?.data?.ipfs?.contentURI?.name}
    //   owner_name={item?.metaOwner}
    //   onClick={() => {
    //     router.push(`/search/meta/${item?._id}`);
    //   }}
    //   width="100%"
    // />
  );
};

export default index;
