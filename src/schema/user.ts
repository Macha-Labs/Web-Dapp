import { helperIPFS } from "../helpers/IpfsLink";

export const UserDb$ = (dbData: any) => {
  return {
    id: dbData?._id || dbData?.id,
    address: dbData?.address,
    lensId: dbData?.lensId,
    lensHandle: dbData?.lensHandle,
    tokens: {
      stream: dbData?.tokens?.stream,
    },
  };
};

export const UserStream$ = (streamData: any) => {
  return {
    id: streamData?.id,
    address: streamData?.address,
    lensHandle: streamData?.lensHandle,
    lensId: streamData?.lensId,
    lensImage: streamData?.lensImage,
    lensName: streamData?.lensName,    
    lensOwnedBy: streamData?.lensOwnedBy,
  };
};

export const UserLens$ = (lensData: any) => {
  let attributes: any = {
    website: {
      value: "",
    },
    twitter: {
      value: "",
    },
  };
  if (lensData?.attributes?.length > 0) {
    lensData?.attributes?.map((attribute: any) => {
      attributes[attribute.key] = attribute;
    });
  }

  return {
    id: lensData?.id,
    handle: lensData?.handle,
    ownedBy: lensData?.ownedBy,
    isDefault: lensData?.isDefault,
    name: lensData?.name,
    bio: lensData?.bio,
    image: helperIPFS(lensData?.picture?.original?.url) || helperIPFS(lensData?.image),
    isFollowedByMe: lensData?.isFollowedByMe,
    cover_picture: lensData?.cover_picture,
    attributes: lensData?.attributes,
    attributesObj: attributes,
    stats: {
      totalCollects: lensData?.stats?.totalCollects,
      totalComments: lensData?.stats?.totalComments,
      totalFollowers: lensData?.stats?.totalFollowers,
      totalFollowing: lensData?.stats?.totalFollowing,
      totalMirrors: lensData?.stats?.totalMirrors,
      totalPosts: lensData?.stats?.totalPosts,
      totalPublications: lensData?.stats?.totalPublications,
    },
    accessToken: lensData?.accessToken,
    refreshToken: lensData?.refreshToken,
  };
};

export class User$ {
  address;
  db;
  lens;
  stream;

  constructor(
    dbData: any = null,
    lensData: any = null,
    streamData: any = null
  ) {
    this.address = dbData?.address || lensData?.ownedBy || streamData?.id
    this.db = UserDb$(dbData);
    this.lens = UserLens$(lensData);
    this.stream = UserStream$(streamData);
  }

  setLensFromStream() {
    this.lens = UserLens$({ 
        handle: this.stream.lensHandle,
        ownedBy: this.stream.lensOwnedBy,
        name:this.stream.lensName, 
        image: this.stream.lensImage
    });
  }
}
