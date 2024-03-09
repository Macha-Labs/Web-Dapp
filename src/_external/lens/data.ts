import { Result } from "../interface";

export function mapToSearchPosts(dataList: any[]): Result[] {
  return dataList.map((item): Result => ({
    id: item?.id,
    heading: `${item?.metadata?.appId} - ${item?.__typename}`,
    image: item?.metadata?.__typename == "ImageMetadataV3" ? item?.metadata?.asset?.image?.optimized?.uri : null,
    cover: item?.cover,
    description: item?.metadata?.content,
    externalLink: `https://hey.xyz/posts/${item?.id}`,
    author: {
      image: item?.by?.metadata?.picture?.optimized?.uri,
      name: item?.by?.handle?.localName,
      externalLink: undefined
    }
  }));
}

export function mapToSearchProfile(dataList: any[]): Result[] {
    return dataList.map((item): Result => ({
      id: item?.handle?.localName,
      heading: item?.metadata?.displayName,
      image: item?.metadata?.picture?.optimized?.uri,
      cover: item?.cover,
      description: item?.handle?.localName,
      externalLink: `https://hey.xyz/u/${item?.handle?.localName}`,
      author: undefined
    }));
  }