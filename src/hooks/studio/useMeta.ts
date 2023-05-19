import { useRef } from "react";


const useMeta = () => {
    const metaOverview = useRef<any>({});
    const metaTrigger = useRef<any>({});
    const metaOrigin = useRef<any>({});

    return {
        metaOverview: metaOverview,
        metaTrigger: metaTrigger,
        metaOrigin: metaOrigin
    }
}
export default useMeta;