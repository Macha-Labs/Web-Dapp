import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { getProfiles } from "../../helpers/lens/lens";
import { UserLens$ } from "../../schema/user";

const useLensProfile = () => {
  const [lensProfile, setLensProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [loadingText, setLoadingText] = useState<any>(
    "Fetching profile from lens"
  );
  const authContext = useContext(AuthContext);
  const address = authContext.address;

  const getOwnedProfiles = async (address: any) => {
    setIsLoading(true);
    try {
      const userProfile = await getProfiles({
        ownedBy: [address],
        limit: 1,
      });
      console.log(userProfile, "userProfile");
      if (userProfile) {
        setLensProfile(userProfile?.data?.profiles?.items[0]);
        // await updatePluginLens('wallet', address, userProfile?.data?.profiles?.items[0]);
      }
      setIsLoading(false);
      return UserLens$(userProfile?.data?.profiles?.items[0]);
    } catch (error: any) {
      setIsLoading(false);
      console.log("Error in fetching lens profile ", error);
      return null;
    }
  };

  useEffect(() => {
    if (address) {
      getOwnedProfiles(address);
    }
  }, [address]);

  return {
    userLens: UserLens$(lensProfile),
    setLensProfile: setLensProfile,
    isLoading: isLoading,
    loadingText: loadingText,
    getOwnedProfiles: getOwnedProfiles,
  };
};
export default useLensProfile;
