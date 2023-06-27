import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";

declare let window: any;
const useMetaCreate = () => {
  const metaOverview = useRef<any>({});
  const metaTrigger = useRef<any>({});
  const metaOrigin = useRef<any>({});

  const apiDataRef = useRef<any>({});

  const $loadOriginData = useMetaStore((state: any) => state.loadOriginData);
  const $loadTriggerData = useMetaStore((state: any) => state.loadTriggerData);
  const $updateTriggerData = useMetaStore(
    (state: any) => state.updateTriggerData
  );
  const toast = useToast();

  const $macha = useAuthStore((state: any) => state.macha);

  const publishMeta = async (
    overview: any,
    originData: any,
    triggerData: any
  ) => {
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

  const publishApi = async() => {
    const apiPayload = {
      name: apiDataRef.current["name"]?.value,
      description: apiDataRef.current["description"]?.value,
      clientId: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      request: {
        requestType: apiDataRef.current["requestType"]?.value,
        requestMethod: apiDataRef.current["requestMethod"]?.value,
        requestEndpoint: apiDataRef.current["requestEndpoint"]?.value,
        requestParams: apiDataRef.current["requestParams"]?.value,
        requestSchema: apiDataRef.current["requestSchema"]?.value,
        requestHeaders: apiDataRef.current["requestHeaders"]?.value
      }
    }

    console.log("The Api payload data is ", apiPayload);
    console.log("The macha instance is ", $macha);
    await $macha.publisher.apiCreation(apiPayload);
  }

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

  const executeTriggerSave = (selectedTrigger: any) => {
    let triggerData = {
      requestEndpoint: metaTrigger.current["requestEndpoint"].value,
      requestMethod: metaTrigger.current["requestMethod"].value,
      requestParams: metaTrigger.current["requestParams"].value,
      requestSchema: metaTrigger.current["requestSchema"].value,
      requestType: metaTrigger.current["requestType"].value,
      description: metaTrigger.current["triggerDescription"].value,
      name: metaTrigger.current["triggerName"].value,
    };
    if (selectedTrigger != null)
      $updateTriggerData(selectedTrigger, triggerData);
    else {
      $loadTriggerData(triggerData);
    }
    //
    toast({
      title: "Trigger Created",
      status: "success",
      duration: 3000,
      position: "bottom-right",
    });
  };

  return {
    metaOverview: metaOverview,
    metaTrigger: metaTrigger,
    metaOrigin: metaOrigin,
    apiDataRef: apiDataRef,
    publishMeta: publishMeta,
    publishApi: publishApi,
    settingRequestMethods: settingRequestMethods,
    executeOriginSave: executeOriginSave,
    executeTriggerSave: executeTriggerSave,
  };
};
export default useMetaCreate;
