import { Result } from "../interface";

export function mapToSearchPosts(dataList: any[]): Result[] {
  return dataList.map((item): Result => ({
    heading: `${item?.metadata?.appId} - ${item?.__typename}`,
    image: item?.metadata?.__typename == "ImageMetadataV3" ? item?.metadata?.asset?.image?.optimized?.uri : null,
    cover: item?.cover,
    description: item?.metadata?.content,
    externalLink: `https://hey.xyz/posts/${item?.handle?.localName}`
  }));
}

export function mapToSearchProfile(dataList: any[]): Result[] {
    return dataList.map((item): Result => ({
      heading: item?.metadata?.displayName,
      image: item?.metadata?.picture?.optimized?.uri,
      cover: item?.cover,
      description: item?.handle?.localName,
      externalLink: `https://hey.xyz/u/${item?.handle?.localName}`
    }));
  }