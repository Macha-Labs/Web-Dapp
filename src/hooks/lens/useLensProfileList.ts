import { useState } from "react";
import { getProfiles } from "../../helpers/lens/lens";
import { User$} from "../../schema/user";

const useLensProfileList = () => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [loadingText, setLoadingText] = useState<any>(
    "Fetching profile from lens"
  );

  const _fetch = async (address: any) => {
    setIsLoading(true);
    try {
      const userProfile = await getProfiles({
        ownedBy: [address],
        limit: 1,
      });

      setIsLoading(false);
      const result = new User$(null, userProfile?.data?.profiles?.items[0], null);
      console.log("Userprofile xmtp schema", result);
      return result;
    } catch (error: any) {
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading: isLoading,
    loadingText: loadingText,
    fetch: _fetch,
  };
};
export default useLensProfileList;
