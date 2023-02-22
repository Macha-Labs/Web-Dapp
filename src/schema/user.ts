import { helperIPFS } from "../helpers/IpfsLink";

export const UserDb$ = (dbData: any) => {
    return ( {
        id: dbData?._id || dbData?.id,
        address: dbData?.address,
        lensId: dbData?.lensId,
        lensHandle: dbData?.lensHandle,
        tokens: {
            stream: dbData?.tokens?.stream
        },
    })
}

export const UserStream$ = (dbData: any) => {
  return {
    id: dbData?._id || dbData?.id,
    address: dbData?.address, 
    image:dbData?.lensImage,   
    handle: dbData?.lensHandle,
    ownedBy: dbData?.id,
    tokens: {
      stream: dbData?.tokens?.stream,
    },
  };
};

export const UserLens$ = (lensData: any) => {
    let attributes: any = {
        "website": {
            value: ""
        },
        "twitter": {
            value: ""
        }
    };
    if (lensData?.attributes?.length > 0) {
        lensData?.attributes?.map((attribute: any) => {
            attributes[attribute.key] = attribute
        });
    }

    return ( {
        id: lensData?.id,
        handle: lensData?.handle,
        ownedBy: lensData?.ownedBy,
        isDefault: lensData?.isDefault,
        name: lensData?.name,
        bio: lensData?.bio,
        image: helperIPFS(lensData?.picture?.original?.url),
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
    })
}
 
 
export const User$ = (dbData=null, lensData=null) => {
    
    return (
        {   
            db: dbData,
            lens: lensData
        }
    )
}