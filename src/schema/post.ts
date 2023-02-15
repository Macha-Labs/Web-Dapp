import { profile } from "console"
import { helperIPFS } from "../helpers"

export const Post$ = (data: any) => {
    return {
            id: data?.id,
            appId: data?.appId,
            createdAt: data?.createdAt,
            hidden: data?.hidden,
            hasCollectedByMe: data?.hasCollectedByMe,
        metadata: {
            content: data?.metadata?.content,
            media : data?.metadata?.media,
            },
            stats: {
                totalAmountOfCollects: data?.stats?.totalAmountOfCollects,
                totalAmountOfComments: data?.stats?.totalAmountOfComments,
                totalAmountOfMirrors: data?.stats?.totalAmountOfMirrors
            },
            profile: {
                bio: data?.profile?.bio,
                handle: data?.profile?.handle,
                id: data?.profile?.id,
                isFollowedByMe: data?.profile?.isFollowedByMe,
                isFollowing: data?.profile?.isFollowing,
                name: data?.profile?.name,
                image : helperIPFS(data?.profile?.picture.original.url),
        },

        }
}
