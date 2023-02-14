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
  LIKE_POST,
  MIRROR_POST,
  REFRESH_TOKEN,
  SET_METADATA,
  UNFOLLOW,
  VALIDATE,
} from "./query";
import { CreatePublicPostRequest } from "./lensInterfaces";

export const generateChallenge = async (address) => {
  console.log("generateChallenge got the address ", address);
  const res = await apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
  console.log("Returnin the res ", res.data.challenge);
  return res.data.challenge.text;
};

export const authenticate_user = async (address, signature) => {
  console.log("Got the address ", address);
  console.log("Got the signature ", signature);
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
    console.log("Got the return data ", data);
    return data.authenticate;
  } catch (error: any) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
  }
};

export const newRefreshToken = async (refreshtoken) => {
  const { data } = await apolloClient.mutate({
    mutation: gql(REFRESH_TOKEN),
    variables: {
      request: {
        refreshtoken,
      },
    },
  });
  return data.refresh;
};

/*
{
  "profileId": props.user.plugin_lens.id,
  "publicationTypes": ["POST", "COMMENT", "MIRROR"],
  "sortCriteria": "LATEST",
  "limit": 50
}
*/

export const getPublications = (getPublicationQuery) => {
  return apolloClient.query({
    query: gql(GET_PUBLICATIONS),
    variables: {
      request: getPublicationQuery,
    },
  });
};

export const getDefaultProfile = (ethereumAddress) => {
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
export const getProfiles = async (requestParams) => {
  return await apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request: requestParams,
    },
  });
};

export const getProfileForHandle = async (requestParams) => {
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
export const fetchFollowers = async (requestParams) => {
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
export const fetchFollowing = async (requestParams) => {
  return await apolloClient.query({
    query: gql(GET_FOLLOWING),
    variables: {
      request: requestParams,
    },
  });
};

export const explorePublications = (explorePublicationQueryRequest) => {
  return apolloClient.query({
    query: gql(EXPLORE_PUBLICATIONS),
    variables: {
      request: explorePublicationQueryRequest,
    },
  });
};

export const setMetaData = async (profileId, metadata, accessToken) => {
  const result = await apolloClient.mutate({
    mutation: gql(SET_METADATA),
    variables: {
      request: {
        profileId,
        metadata,
      },
    },
  });
  console.log(result);
};

export const followUser = async (requestParams) => {
  return apolloClient.mutate({
    mutation: gql(FOLLOW),
    variables: {
      request: requestParams,
    },
  });
};

export const unfollowUser = async (requestParams) => {
  return apolloClient.mutate({
    mutation: gql(UNFOLLOW),
    variables: {
      request: requestParams,
    },
  });
};

export const createNewPost = async (request: CreatePublicPostRequest) => {
  try {
    console.log(apolloClient);
    const result = await apolloClient.mutate({
      mutation: gql(CREATE_POST),
      variables: {
        request: request,
      },
    });
    return result;
  } catch (error: any) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
  }
  
};

export const validateMetadata = async (requestParams) => {
  try {
    const result = await apolloClient.query({
      query: gql(VALIDATE),
      variables: {
        request: requestParams,
      },
    });
    return result;
  } catch (error: any) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
  }
};

export const deletePost = async (requestParam) => {
  console.log("Request Param ", requestParam);
  const result = await apolloClient.mutate({
    mutation: gql(DELETE_POST),
    variables: {
      request: requestParam,
    },
  });
  return result.data!.hidePublication;
};

export const likePost = async (requestParam) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(LIKE_POST),
      variables: {
        request: requestParam,
      },
    });
    console.log("Liked Successfully..", result.data!.addReaction);
    return result.data!.addReaction;
  } catch (error: any) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
  }
};

export const mirrorPost = async (requestParam) => {
  try {
    const result = await apolloClient.mutate({
      mutation: gql(MIRROR_POST),
      variables: {
        request: requestParam,
      },
    });
    console.log("Mirror Successfully..", result.data!.addReaction);
    return result.data!.createMirrorTypedData;
  } catch (error: any) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
  }
};
