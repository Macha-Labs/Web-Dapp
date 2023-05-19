import { useRef } from "react";


const useMeta = () => {
    const metaOverview = useRef<any>({});
    const metaTrigger = useRef<any>({});
    const metaOrigin = useRef<any>({});

    // have to make this
    // const metaPayload = {
    //     id: "",
    //     name: metaOverview.current['metaName'].value,
    //     description: metaOverview.current['metaDescription'].value,
    //     image: "",
    //     clientId: "",
    //     triggers: []
    // }

    const createMetaPayload = () => {
        console.log("Meta Overview ", metaOverview.current);
        console.log("Meta Trigger ", metaTrigger.current);
        console.log("Meta Origin ", metaOrigin.current);
    }

    return {
        metaOverview: metaOverview,
        metaTrigger: metaTrigger,
        metaOrigin: metaOrigin,
        createMetaPayload: createMetaPayload
    }
}
export default useMeta;