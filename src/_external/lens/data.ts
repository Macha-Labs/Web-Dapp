export interface SearchProfile {
    heading: string;
    image: string;
    cover: string;
    description: string;
    externalLink: string;
}


export function mapToSearchProfile(dataList: any[]): SearchProfile[] {
    return dataList.map((item): SearchProfile => ({
      heading: item?.metadata?.displayName,
      image: item?.metadata?.picture?.optimized?.uri,
      cover: item?.cover,
      description: item?.handle?.localName,
      externalLink: `https://hey.xyz/u/${item?.handle?.localName}`
    }));
  }