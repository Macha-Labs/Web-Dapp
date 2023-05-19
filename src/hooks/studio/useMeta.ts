import { useRef } from "react";

const useMeta = () => {
    const metaOverview = useRef<any>({});
    const metaTrigger = useRef<any>({});
    const metaOrigin = useRef<any>({});

    const publishMeta = () => {
        const metaPayload = {
            id: "",
            name: metaOverview.current["metaName"] ? metaOverview.current["metaName"].value : "testMeta1",
            description: metaOverview.current["metaDescription"] ? metaOverview.current["metaDescription"].value : "testMetaDescription1",
            image: metaOverview.current["metaImage"] ? metaOverview.current["metaImage"].value : "testMetaImage1",
            clientId: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
            triggers: [
                {
                    name: metaTrigger.current['triggerName'].value,
                    description: metaTrigger.current['triggerDescription'].value,
                    requestType: metaTrigger.current['requestType'].value,
                    requestMethod: metaTrigger.current['requestMethod'].value,
                    requestEndpoint: metaTrigger.current['requestEndpoint'].value,
                    requestParams: metaTrigger.current['requestParams'].value,
                    requestSchema: metaTrigger.current['requestSchema'].value,
                    responseSuccess: {},
                    responseError: {}
                }
            ],
            origin: [
                {
                    requestType: metaOrigin.current['requestType'].value,
                    requestMethod: metaOrigin.current['requestMethod'].value,
                    requestEndpoint: metaOrigin.current['requestEndpoint'].value,
                    requestParams: metaOrigin.current['requestParams'].value,
                    requestSchema: metaOrigin.current['requestSchema'].value,
                    requestHeaders: metaOrigin.current['requestHeaders'] ? metaOrigin.current['requestHeaders'].value : ""
                }
            ],
            prevIpfsCid: ""
        }
        console.log("Meta Overview ", metaOverview.current);
        console.log("Meta Trigger ", metaTrigger.current);
        console.log("Meta Origin ", metaOrigin.current);

        console.log("Logging Meta Payload ", metaPayload);
    }

    return {
        metaOverview: metaOverview,
        metaTrigger: metaTrigger,
        metaOrigin: metaOrigin,
        publishMeta: publishMeta
    }
}
export default useMeta;