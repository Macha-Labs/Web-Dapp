import { apolloClient } from "./apollo";
import { gql } from "@apollo/client";
import {
  AUTHENTICATION,
  CREATE_POST,
  DELETE_POST,
  EXPLORE_PUBLICATIONS,
  FOLLOW,
  GET_CHALLENGE,
  GET_DEFAULT_PROFILES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_PROFILE,
  GET_PROFILES,
  GET_PUBLICATIONS,
  HAVE_I_LIKED_POST,
  LIKE_POST,
  MIRROR_POST,
  REFRESH_TOKEN,
  SET_METADATA,
  UNFOLLOW,
  UNLIKE_POST,
  VALIDATE,
} from "./query";
import { CreatePublicPostRequest } from "./lensInterfaces";
import { logger } from "../logger";

export const generateChallenge = async (address: string) => {
  const res = await apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
  return res.data.challenge.text;
};

export const authenticate_user = async (address: any, signature: any) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: gql(AUTHENTICATION),
      variables: {
        request: {
          address,
          signature,
        },
      },
    });
    return data.authenticate;
  } catch (error: any) {
    logger(
      "lens",
      "lens.authenticate_user",
      "Error in authenticating user with Lens",
      [error]
    );
  }
};

export const newRefreshToken = async (refreshToken: string) => {
  console.log("Refresh token for accessToken", refreshToken);
  try {
    const { data } = await apolloClient.mutate({
      mutation: gql(REFRESH_TOKEN),
      variables: {
        request: {
          refreshToken,
        },
      },
    });
    console.log("The response for the Refresh token ", data);
    return data.refresh;
  } catch (error: any) {
    console.log("Error in re-generating lens_access_token", error);
    console.log(error?.networkError?.result?.errors);
  }
  
};

/*
{
  "profileId": props.user.plugin_lens.id,
  "publicationTypes": ["POST", "COMMENT", "MIRROR"],
  "sortCriteria": "LATEST",
  "limit": 50
}
*/

export const getPublications = (getPublicationQuery: any) => {
  return apolloClient.query({
    query: gql(GET_PUBLICATIONS),
    variables: {
      request: getPublicationQuery,
    },
  });
};

export const getDefaultProfile = (ethereumAddress: string) => {
  return apolloClient.query({
    query: gql(GET_DEFAULT_PROFILES),
    variables: {
      request: {
        ethereumAddress,
      },
    },
  });
};

/*
{ ownedBy: ["0xD020E01C0c90Ab005A01482d34B808874345FD82"], limit: 10 }
*/
export const getProfiles = async (requestParams: any) => {
  return await apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request: requestParams,
    },
  });
};

export const getProfileForHandle = async (requestParams: any) => {
  return await apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      request: requestParams,
    },
  });
};

/*
{
  address: "0xD020E01C0c90Ab005A01482d34B808874345FD82",
  limit: 10
}
*/
export const fetchFollowers = async (requestParams: any) => {
  return await apolloClient.query({
    query: gql(GET_FOLLOWERS),
    variables: {
      request: requestParams,
    },
  });
};

/*
{
  address: "0xD020E01C0c90Ab005A01482d34B808874345FD82",
  limit: 10
}
*/
export const fetchFollowing = async (requestParams: any) => {
  return await apolloClient.query({
    query: gql(GET_FOLLOWING),
    variables: {
      request: requestParams,
    },
  });
};

export const explorePublications = (explorePublicationQueryRequest: any) => {
  return apolloClient.query({
    query: gql(EXPLORE_PUBLICATIONS),
    variables: {
      request: explorePublicationQueryRequest,
    },
  });
};

export const setMetaData = async (profileId: string, metadata: any) => {
  return apolloClient.mutate({
    mutation: gql(SET_METADATA),
    variables: {
      request: {
        profileId,
        metadata,
      },
    },
  });
};

export const followUser = async (requestParams: any) => {
  return apolloClient.mutate({
    mutation: gql(FOLLOW),
    variables: {
      request: requestParams,
    },
  });
};

export const unfollowUser = async (requestParams: any) => {
  return apolloClient.mutate({
    mutation: gql(UNFOLLOW),
    variables: {
      request: requestParams,
    },
  });
};

export const createNewPost = async (request: CreatePublicPostRequest) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(CREATE_POST),
      variables: {
        request: request,
      },
    });
    return result;
  } catch (error: any) {
    console.log("Error in creaing new Lens Post ", error);
    throw new Error("Error in creaing new Lens Post ", error);
  }
};

export const validateMetadata = async (requestParams: any) => {
  try {
    const result = await apolloClient.query({
      query: gql(VALIDATE),
      variables: {
        request: requestParams,
      },
    });
    return result;
  } catch (error: any) {
    throw new Error(
      "Error in validating Metadata ",
      error?.networkError?.result?.errors
    );
  }
};

export const deletePost = async (requestParam: any) => {
  const result = await apolloClient.mutate({
    mutation: gql(DELETE_POST),
    variables: {
      request: requestParam,
    },
  });
  return result.data!.hidePublication;
};

export const likePost = async (requestParam: any) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(LIKE_POST),
      variables: {
        request: requestParam,
      },
    });
    return result.data!.addReaction;
  } catch (error: any) {
    console.log(
      "Error in Liking Lens post ", error,
      error?.networkError?.result?.errors
    );
  }
};

export const unlikePost = async (requestParam: any) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(UNLIKE_POST),
      variables: {
        request: requestParam,
      },
    });
    return result.data!.removeReaction;
  } catch (error: any) {
    console.log(
      "Error in Unliking Lens post ", error, 
      error?.networkError?.result?.errors
    );
  }
};

export const mirrorPost = async (requestParam: any) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(MIRROR_POST),
      variables: {
        request: requestParam,
      },
    });
    return result.data!.createMirrorTypedData;
  } catch (error: any) {
    throw new Error(
      "Error in Mirroring Lens Post ",
      error?.networkError?.result?.errors
    );
  }
};

export const haveILikedPost = async (requestParam: any) => {
  try {
    const result = await apolloClient.query({
      query: gql(HAVE_I_LIKED_POST),
      variables: {
        request: requestParam,
      },
    });
    return result.data!.whoReactedPublication;
  } catch (error: any) {
    throw new Error(
      "Error in getting like status of Lens post ",
      error?.networkError?.result?.errors
    );
  }
};
