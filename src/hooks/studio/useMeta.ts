import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { MachaClient } from "@metaworklabs/macha-dev-sdk/lib";

declare let window: any;
const useMeta = () => {
  let provider;
  let signer;
  const metaOverview = useRef<any>({});
  const metaTrigger = useRef<any>({});
  const metaOrigin = useRef<any>({});
  const [browserSigner, setBrowserSigner] = useState<any>();
  const [machaClient, setMachaClient] = useState<any>();

  const setInit = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = await provider.getSigner();
      setBrowserSigner(signer);
    }
  };

  useEffect(() => {
    setInit();
  }, []);

  useEffect(() => {
    if (browserSigner) {
      const macha = new MachaClient({
        owner: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
        secret: "",
        signer: browserSigner,
      }
      );
      console.log("Macha init ", macha);
      setMachaClient(macha);
    }
  }, [browserSigner]);

  const publishMeta = async() => {
    const metaPayload = {
      id: "",
      name: metaOverview.current["metaName"]
        ? metaOverview.current["metaName"].value
        : "testMeta1",
      description: metaOverview.current["metaDescription"]
        ? metaOverview.current["metaDescription"].value
        : "testMetaDescription1",
      image: metaOverview.current["metaImage"]
        ? metaOverview.current["metaImage"].value
        : "testMetaImage1",
      clientId: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      triggers: [
        {
          name: metaTrigger.current["triggerName"].value,
          description: metaTrigger.current["triggerDescription"].value,
          requestType: metaTrigger.current["requestType"].value,
          requestMethod: metaTrigger.current["requestMethod"].value,
          requestEndpoint: metaTrigger.current["requestEndpoint"].value,
          requestParams: metaTrigger.current["requestParams"].value,
          requestSchema: metaTrigger.current["requestSchema"].value,
          responseSuccess: {},
          responseError: {},
        },
      ],
      origin: [
        {
          requestType: metaOrigin.current["requestType"].value,
          requestMethod: metaOrigin.current["requestMethod"].value,
          requestEndpoint: metaOrigin.current["requestEndpoint"].value,
          requestParams: metaOrigin.current["requestParams"].value,
          requestSchema: metaOrigin.current["requestSchema"].value,
          requestHeaders: metaOrigin.current["requestHeaders"]
            ? metaOrigin.current["requestHeaders"].value
            : "",
        },
      ],
      prevIpfsCid: "",
    };
    console.log("Meta Overview ", metaOverview.current);
    console.log("Meta Trigger ", metaTrigger.current);
    console.log("Meta Origin ", metaOrigin.current);

    console.log("Logging Meta Payload ", metaPayload);
    
    await machaClient.publisher.metaCreation(metaPayload);
  };

  return {
    metaOverview: metaOverview,
    metaTrigger: metaTrigger,
    metaOrigin: metaOrigin,
    publishMeta: publishMeta,
  };
};
export default useMeta;
