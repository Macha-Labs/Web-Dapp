import { LensHubAbi } from "@/contracts/lens/lensHubContractAbi";
import { createNewPost, validateMetadata } from "@/helpers/lens/lens";
import signedTypeData from "@/helpers/lens/lensApiService";
import { LENS_HUB_CONTRACT } from "@/helpers/lens/lensContract";
import { CreatePublicPostRequest } from "@/helpers/lens/lensInterfaces";
import { PublicationMainFocus } from "@/helpers/lens/publication";
import { nonWrappedData, makeFileObjects } from "@/helpers/web3Storage";
import { AuthContext } from "@/providers/AuthProvider";
import { BigNumber, ethers, utils } from "ethers";
import { splitSignature } from "ethers/lib/utils";
import { useContext } from "react";
import { v4 } from "uuid";

const useCreateLensPost = () => {
  const authContext = useContext(AuthContext);

  const signCreatePostTypedData = async (request: CreatePublicPostRequest) => {
    console.log("create post: request", request);
    const result = await createNewPost(request);
    console.log("create post: createPostTypedData", result);

    const typedData = result.data!.createPostTypedData.typedData;
    console.log("create post: typedData", typedData);

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    console.log("create post: signature", signature);

    return { result, signature };
  };

  const validateMetadataAndPostOnLens = async (params: any) => {
    if (!params.profileId) {
      throw new Error("Missing Profile id");
    }

    if (params?.postContent == null && params?.file == null) {
      console.log("Content is missing");
      return;
    }

    let fileCid: any = null;
    let fileObj: any = null;
    if (params?.file?.type) {
      fileCid = await nonWrappedData([params?.file]);
      if (fileCid != null) {
        fileObj = {
          item: `ipfs://${fileCid}`,
          type: params?.file?.type,
        };
      }
    }
    console.log("Got file cid ", fileCid);

    const postMetadata = {
      version: "2.0.0",
      mainContentFocus: params?.file?.type
        ? PublicationMainFocus[params?.file?.type]
        : PublicationMainFocus.TEXT_ONLY,
      metadata_id: v4(),
      description: params?.postContent,
      locale: "en-US",
      content: params?.postContent,
      external_url: null,
      image: params?.imageFileCid
        ? "ipfs://" + (await nonWrappedData([params?.imageFile]))
        : null,
      imageMimeType: params?.imageFileCid ? params?.imageFile?.type : null,
      name: `Post by ${params?.profileId}`,
      attributes: [],
      tags: ["using_api_examples"],
      appId: "api_metawork",
      media: fileCid ? [fileObj] : null,
    };

    const validateRes = await validateMetadata({
      metadatav2: postMetadata,
    });

    console.log("Response:", validateRes);
    if (validateRes?.data?.validatePublicationMetadata?.valid) {
      console.log("Metadata validated");
      const lensPostId = await createPost(params, postMetadata);
      return lensPostId;
    } else {
      console.log("Metadata couldnot be validated");
      return;
    }
  };

  const createPost = async (params: any, postMetadata: any) => {
    // const ipfsFileCid = await makeFileObjects(postMetadata);
    const ipfsFileCid = await makeFileObjects(postMetadata);
    console.log("create post: ipfs result", ipfsFileCid);

    const createPostRequest = {
      profileId: params.profileId,
      contentURI: `ipfs://${ipfsFileCid}`,
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    const signedResult = await signCreatePostTypedData(createPostRequest);
    console.log("signedResult", signedResult);
    console.log(
      "signedResult post ID",
      signedResult.result.data?.createPostTypedData.id
    );

    const typedData = signedResult.result.data!.createPostTypedData.typedData;

    const { v, r, s } = splitSignature(signedResult.signature);
    const lensHub = new ethers.Contract(
      LENS_HUB_CONTRACT,
      LensHubAbi,
      authContext.signer
    );
    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    const receipt = await tx.wait();
    console.log("Tx receipt:", receipt);
    const logs = receipt.logs;

    const topicId = utils.id(
      "PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)"
    );
    console.log("topicid we care about", topicId);

    const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
    console.log("create post: created log", profileCreatedLog);

    let profileCreatedEventLog = profileCreatedLog!.topics;
    console.log("create post: created event logs", profileCreatedEventLog);

    const publicationId = utils.defaultAbiCoder.decode(
      ["uint256"],
      profileCreatedEventLog[2]
    )[0];

    console.log(
      "create post: contract publication id",
      BigNumber.from(publicationId).toHexString()
    );
    console.log(
      "create post: internal publication id",
      params.profileId + "-" + BigNumber.from(publicationId).toHexString()
    );
    const lensPostID =
      params.profileId + "-" + BigNumber.from(publicationId).toHexString();

    return lensPostID;
  };
  return {
    // createPost: createPost,
    validateMetadataAndPostOnLens: validateMetadataAndPostOnLens,
  };
};

export default useCreateLensPost;
