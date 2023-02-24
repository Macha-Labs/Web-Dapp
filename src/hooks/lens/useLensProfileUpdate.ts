import { makeFileObjects } from "./../../helpers/storage/web3storage";
import { profile } from "console";
import { logger } from "@/helpers/logger";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { setMetaData } from "@/helpers/lens/lens";
import { v4 as uuidv4 } from "uuid";
const useLensProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [loadingText, setLoadingText] = useState<any>("Sending Request");
  const [userLens, setUserLens] = useState<any>();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    logger(
      "lens",
      "useLensProfileUpdate.useEffect[authContext.user?.lens]",
      "lens data",
      [authContext.user?.lens]
    );
    setUserLens(authContext.user?.lens);
  }, [authContext.user?.lens]);
  console.log("userLens", userLens);

  const updateLensProfile = async () => {
    const cid = await makeFileObjects({
      name: userLens?.name,
      bio: userLens?.bio,
      ownedBy: userLens?.ownedBy,
      handle: userLens?.handle,
      version: "2.0.0",
      metadata_id: uuidv4(),
      attributes: userLens?.attributes,
      cover_picture: userLens?.cover_picture,
    });

    console.log("cid", `ipfs://${cid}`);

    return await setMetaData(userLens?.id, cid);
  };
  return {
    isLoading: isLoading,
    loadingText: loadingText,
    userLens: userLens,
    setUserLens: setUserLens,
    updateLensProfile: updateLensProfile,
  };
};
export default useLensProfileUpdate;
