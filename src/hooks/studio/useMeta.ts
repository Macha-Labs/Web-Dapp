import { useRef } from "react";


const useMeta = () => {
    const metaOverview = useRef<any>({});

    return {
        metaOverview: metaOverview
    }
}
export default useMeta;