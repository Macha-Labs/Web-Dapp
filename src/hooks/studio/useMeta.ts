import { useRef } from "react";


const useMeta = () => {
    const metaOverview = useRef<any>({});
    const metaTrigger = useRef<any>({});
    const metaOrigin = useRef<any>({});

    // have to make this
    const metaPayload = {
        id: "",
        name: metaOverview.current['metaName'].value,
        description: metaOverview.current['metaDescription'].value,
        image: "",
        clientId: "",
        triggers: {}
    }

    return {
        metaOverview: metaOverview,
        metaTrigger: metaTrigger,
        metaOrigin: metaOrigin
    }
}
export default useMeta;