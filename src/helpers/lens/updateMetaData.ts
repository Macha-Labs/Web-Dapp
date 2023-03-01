import { CreatePublicSetProfileMetadataUriRequest } from "./lensInterfaces";
import { ethers } from "ethers";

import { v4 } from "uuid";
// import { getSigner, signedTypeData, splitSignature } from "./lensApiService";
import { apolloClient } from "./apollo";
import { gql } from "@apollo/client";
import { makeFileObjects } from "../web3Storage";
import { SET_METADATA } from "./query";

const TESTNET_PROFILE_ID = "0x49cd";
const MAINNET_PROFILE_ID = "0x010fd8";

const PROFILE_ID = MAINNET_PROFILE_ID;

const TESTNET_CONTRACT = "0xD5037d72877808cdE7F669563e9389930AF404E8";
const MAINNET_CONTRACT = "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f";

let ethersProvider: ethers.providers.Web3Provider;
if (window.ethereum) {
  // ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
}

export const createSetProfileMetadataTypedData = async (
  request: CreatePublicSetProfileMetadataUriRequest
) => {
  const result = await apolloClient.mutate({
    mutation: gql(SET_METADATA),
    variables: {
      request,
    },
  });

  return result.data!.createSetProfileMetadataTypedData;
};
export const setProfileMetadata = async (metaData: any, profileId: any) => {
  if (!profileId) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  // export const signCreateSetProfileMetadataTypedData = async (
  //   request: CreatePublicSetProfileMetadataUriRequest
  // ) => {
  //   const result = await createSetProfileMetadataTypedData(request);
  //   const typedData = result.typedData;
  //   // const signature = await signedTypeData(
  //   //   typedData.domain,
  //   //   typedData.types,
  //   //   typedData.value
  //   // );

  //   // return { result, signature };
  // };

  // for Mainnet
  // const lensPeriphery = new ethers.Contract(MAINNET_CONTRACT, abi, getSigner());

  // export const setProfileMetadata = async (metaData: any, profileId: any) => {
  //   if (!profileId) {
  //     throw new Error("Must define PROFILE_ID in the .env to run this");
  //   }

  const address = await ethersProvider.getSigner().getAddress();
  // we have to pass all of these fields
  const ipfsResult = await makeFileObjects({
    ...metaData,
    version: "1.0.0",
    metadata_id: v4(),
  });

  // hard coded to make the code example clear
  const createProfileMetadataRequest = {
    profileId,
    metadata: `ipfs://${ipfsResult}`,
  };

  // const signedResult = await signCreateSetProfileMetadataTypedData(
  //   createProfileMetadataRequest
  // );
  // const typedData = signedResult.result.typedData;
  // const { v, r, s } = splitSignature(signedResult.signature);

  // return await lensPeriphery.setProfileMetadataURIWithSig({
  //   profileId: createProfileMetadataRequest.profileId,
  //   metadata: createProfileMetadataRequest.metadata,
  //   sig: {
  //     v,
  //     r,
  //     s,
  //     deadline: typedData.value.deadline,
  //   },
  // });
};
