import { getProfiles } from "../../helpers/lens/lens";
import { useEffect, useMemo, useState } from "react";
import { UserLens$ } from "../../schema/user";
import { logger } from "@/helpers/logger";

const useLensProfile = () => {
    const [lensProfile, setLensProfile] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [loadingText, setLoadingText] = useState<any>('Fetching profile from lens');

    const getOwnedProfiles = async (address: any) => {
        setIsLoading(true);
        try {
            const userProfile = await getProfiles({
                "ownedBy": [address],
                "limit": 1
            });
            if (userProfile) {
                setLensProfile(userProfile?.data?.profiles?.items[0]);
                // await updatePluginLens('wallet', address, userProfile?.data?.profiles?.items[0]);
            }
            setIsLoading(false);
            return UserLens$(userProfile?.data?.profiles?.items[0]);
        } catch (error) {
            console.log("Error in fetching lens profile ", error);
            setIsLoading(false);
            return ;
        }
    }

    // useMemo(() => {
    //     if (address) {
    //         logger('lens', 'useLensProfile.useMemo[address]', 'Getting Profile for address', [])
    //         getOwnedProfiles();
    //     }
    // }, [address]);

    return ({
        userLens: UserLens$(lensProfile),
        setLensProfile: setLensProfile,
        isLoading: isLoading,
        loadingText: loadingText,
        getOwnedProfiles: getOwnedProfiles
    }
    )

}
export default useLensProfile;