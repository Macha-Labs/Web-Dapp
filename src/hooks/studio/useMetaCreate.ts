import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";

declare let window: any;
const useMetaCreate = () => {
  const metaOverview = useRef<any>({});
  const metaTrigger = useRef<any>({});
  const metaOrigin = useRef<any>({});
  const $loadOriginData = useMetaStore((state: any) => state.loadOriginData);
  const toast = useToast();

  const $macha = useAuthStore((state: any) => state.macha);

  const publishMeta = async (
    overview: any,
    originData: any,
    triggerData: any
  ) => {
    // const metaPayload = {
    //   id: "",
    //   name: metaOverview.current["metaName"]
    //     ? metaOverview.current["metaName"].value
    //     : "testMeta1",
    //   description: metaOverview.current["metaDescription"]
    //     ? metaOverview.current["metaDescription"].value
    //     : "testMetaDescription1",
    //   image: metaOverview.current["metaImage"]
    //     ? metaOverview.current["metaImage"].value
    //     : "testMetaImage1",
    //   clientId: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
    //   triggers: [
    //     {
    //       name: metaTrigger.current["triggerName"].value,
    //       description: metaTrigger.current["triggerDescription"].value,
    //       requestType: metaTrigger.current["requestType"].value,
    //       requestMethod: metaTrigger.current["requestMethod"].value,
    //       requestEndpoint: metaTrigger.current["requestEndpoint"].value,
    //       requestParams: metaTrigger.current["requestParams"].value,
    //       requestSchema: metaTrigger.current["requestSchema"].value,
    //       responseSuccess: {},
    //       responseError: {},
    //     },
    //   ],
    //   origin: [
    //     {
    //       requestType: metaOrigin.current["requestType"].value,
    //       requestMethod: metaOrigin.current["requestMethod"].value,
    //       requestEndpoint: metaOrigin.current["requestEndpoint"].value,
    //       requestParams: metaOrigin.current["requestParams"].value,
    //       requestSchema: metaOrigin.current["requestSchema"].value,
    //       requestHeaders: metaOrigin.current["requestHeaders"]
    //         ? metaOrigin.current["requestHeaders"].value
    //         : "",
    //     },
    //   ],
    //   prevIpfsCid: "",
    // };

    const metaPayload = {
      id: "",
      ...overview,
      clientId: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      origin: [originData],
      triggers: [triggerData],
      prevIpfsCid: "",
    };
    console.log("Meta Overview ", metaOverview.current);
    console.log("Meta Trigger ", metaTrigger.current);
    console.log("Meta Origin ", metaOrigin.current);

    console.log("Logging Meta Payload ", metaPayload);

    await $macha.publisher.metaCreation(metaPayload);
  };

  const settingRequestMethods = (requestType: string) => {
    let methods: string[] = [];
    requestType == "GRAPH"
      ? (methods = ["QUERY", "MUTATION"])
      : requestType == "REST"
      ? (methods = ["GET", "POST"])
      : "CONTRACT";

    return methods;
  };

  const executeOriginSave = () => {
    let originData = {
      requestEndpoint: metaOrigin.current["requestEndpoint"].value,
      requestMethod: metaOrigin.current["requestMethod"].value,
      requestParams: metaOrigin.current["requestParams"].value,
      requestSchema: metaOrigin.current["requestSchema"].value,
      requestType: metaOrigin.current["requestType"].value,
    };

    $loadOriginData(originData);
    // modal.onClose();
    toast({
      title: "Origin Created",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
  };

  return {
    metaOverview: metaOverview,
    metaTrigger: metaTrigger,
    metaOrigin: metaOrigin,
    publishMeta: publishMeta,
    settingRequestMethods: settingRequestMethods,
    executeOriginSave: executeOriginSave,
  };
};
export default useMetaCreate;
