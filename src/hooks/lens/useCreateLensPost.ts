import { BigNumber, ethers, utils } from "ethers";
import { splitSignature } from "ethers/lib/utils";
import { createNewPost, validateMetadata } from "../../helpers/lens/lens";
import { LENS_HUB_CONTRACT } from "../../helpers/lens/lensContract";
import  signedTypeData  from "../../helpers/lens/lensApiService";
import { CreatePublicPostRequest } from "../../helpers/lens/lensInterfaces";
import { PublicationMainFocus } from "../../helpers/lens/publication";
import { makeFileObjects, nonWrappedData } from "../../helpers/web3Storage";
import { useContext } from "react";
import { v4 } from "uuid";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { LensHubAbi } from "../../contracts/lens/lensHubContractAbi";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const useCreateLensPost = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const connector = useWalletConnect();

  const signCreatePostTypedData = async (request: CreatePublicPostRequest) => {
      const result = await createNewPost(request);
      console.log("create post: createPostTypedData", result);

      const typedData = result.data!.createPostTypedData.typedData;
      console.log("create post: typedData", typedData);
    try {
      const signature = await signedTypeData(
        typedData.domain,
        typedData.types,
        typedData.value,
        connector.accounts[0],
        connector
      );
      console.log("create post: signature", signature);

      return { result, signature };
    } catch (error) {
      console.log("Some error occured ", error);
    }

    
  };

  const validate = async (params) => {
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
      nonWrappedData([params?.file]).then((result) => {
        console.log("File uploaded to ipfs, cid ", result);
        fileCid = result;
      });
      if (fileCid != null) {
        fileObj = {
          // item: `ipfs://${fileCid}`,
          item: 'ipfs://bafkreiakj3oidnfr7kbv6k4fqgzg44it6how3d73zqfbzlkfb4kx7x2zke',
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
    console.log("Metadata", postMetadata);
    if (validateRes?.data?.validatePublicationMetadata?.valid) {
      console.log("Metadata validated");
      const lensPostId = await createPost(params, postMetadata);
      return lensPostId;
    } else {
      console.log("Metadata couldnot be validated");
      return;
    }
  };

  const createPost = async (params, postMetadata) => {
    console.log("Called the createPost function", params, postMetadata);
    let ipfsFileCid;
    makeFileObjects(postMetadata).then((result) => {
      console.log("Getting the result", result);
      ipfsFileCid = result;
    });
    console.log("create post: ipfs result", ipfsFileCid);

    const createPostRequest = {
      profileId: params.profileId,
      // contentURI: `ipfs://${ipfsFileCid}`,
      contentURI: 'ipfs://bafkreiakj3oidnfr7kbv6k4fqgzg44it6how3d73zqfbzlkfb4kx7x2zke',
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    console.log("createPostRequest ", createPostRequest);
    const signedResult = await signCreatePostTypedData(createPostRequest);
    console.log("signedResult", signedResult);
    console.log(
      "signedResult post ID",
      signedResult?.result.data?.createPostTypedData.id
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
    createPost: createPost,
    validate: validate,
  };
};

export default useCreateLensPost;
