
import { logger } from "@/helpers/logger";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";

const useLensProfileUpdate = () => {
    const [isLoading, setIsLoading] = useState<any>(false);
    const [loadingText, setLoadingText] = useState<any>("Sending Request");
    const [userLens, setUserLens] = useState<any>();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        logger('lens', 'useLensProfileUpdate.useEffect[authContext.user?.lens]', 'lens data', [authContext.user?.lens])
        setUserLens(authContext.user?.lens)
    }, [authContext.user?.lens])

    
    return {
        isLoading: isLoading,
        loadingText: loadingText,
        userLens: userLens
    }
}
export default useLensProfileUpdate;