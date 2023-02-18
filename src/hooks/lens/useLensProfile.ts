import { getProfiles } from "../../helpers/lens/lens";
import { useEffect, useMemo, useState } from "react";
import { UserLens$ } from "../../schema/user";
import { logger } from "@/helpers/logger";

const useLensProfile = (address: any) => {
    const [lensProfile, setLensProfile] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [loadingText, setLoadingText] = useState<any>('Fetching profile from lens');

    const getOwnedProfiles = async () => {
        setIsLoading(true);
        try {
            const userProfile = await getProfiles({
                "ownedBy": [address],
                "limit": 1
            });
            if (userProfile) {
                logger('lens', 'useLensProfile.getOwnedProfiles', 'Profiles fetched', [userProfile])
                setLensProfile(userProfile?.data?.profiles?.items[0]);
                // await updatePluginLens('wallet', address, userProfile?.data?.profiles?.items[0]);
            }
        } catch (error) {
            console.log("Error in fetching lens profile ", error);
        }
        setIsLoading(false);
    }

    useMemo(() => {
        if (address) {
            logger('lens', 'useLensProfile.useMemo[address]', 'Getting Profile for address', [address])
            getOwnedProfiles();
        }
    }, [address]);

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