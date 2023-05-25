import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { useState } from "react";
import OriginModal from "../modals/studio/OriginModal";

type Props = {
  modal: any;
};

const MetaOriginsModal = ({ modal }: Props) => {
  const hookMetaCreate = useMetaCreate();
  const [originType, setOriginType] = useState<any>(null);
  const [originMethods, setOriginMethods] = useState<any>([]);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];

  const settingRequestMethods = (requestType: string) => {
    requestType == "GRAPH"
      ? setOriginMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setOriginMethods(["GET", "POST"])
      : setOriginType("CONTRACT");
  };

  return (
    // <ModalSlider
    //   event={modal}
    //   size="md"
    //   header={
    //     <FlexRow width="100%" hrAlign="space-between">
    //       <Text className="mb-0">Origins</Text>
    //       <IconImage slug="icon-close" onClick={() => modal.onClose()} />
    //     </FlexRow>
    //   }
    // >
    //   {/* ---------------------------------------------- Origin Start -------------------------------------------- */}

    //   <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
    //     <Heading
    //       as="h6"
    //       size="sm"
    //       bgGradient="linear(
    //               100.07deg,
    //               #2a85ff 0.39%,
    //               #2448c7 73.45%
    //             )"
    //       bgClip="text"
    //       marginTop={"20px"}
    //     >
    //       Request Type
    //     </Heading>
    //     <InputSelect
    //       elementRef={(element: any) =>
    //         (hookMetaCreate.metaOrigin.current["requestType"] = element)
    //       }
    //       placeholder="Select request Type"
    //       onChangeHandler={settingOriginType}
    //       options={requestTypeOptions}
    //       icon={{ slug: "icon-close" }}
    //       variant={"state_default_hover"}
    //       margin="0 0 20px 0"
    //     />

    //     <Heading
    //       as="h6"
    //       size="sm"
    //       bgGradient="linear(
    //               100.07deg,
    //               #2a85ff 0.39%,
    //               #2448c7 73.45%
    //             )"
    //       bgClip="text"
    //       marginTop={"20px"}
    //     >
    //       Request Method
    //     </Heading>

    //     <InputSelect
    //       elementRef={(element: any) =>
    //         (hookMetaCreate.metaOrigin.current["requestMethod"] = element)
    //       }
    //       placeholder="Select Request Method"
    //       options={originMethods}
    //       icon={{ slug: "icon-close" }}
    //       variant={"state_default_hover"}
    //       margin="0 0 20px 0"
    //     />

    //     {/* <InputLabel
    //               inputType="text"
    //               labelText="Request Schema CID"
    //               placeholder="Request Schema CID"
    //               defaultValue=""
    //               padding="20px 0px"
    //             /> */}
    //     {/* <InputLabel
    //               inputType="text"
    //               labelText="Request Headers"
    //               placeholder="Request Headers"
    //               defaultValue=""
    //               padding="20px 0px"
    //             /> */}

    //     <InputLabel
    //       elementRef={(element: any) =>
    //         (hookMetaCreate.metaOrigin.current["requestEndpoint"] = element)
    //       }
    //       inputType="text"
    //       labelText="Request Endpoint"
    //       placeholder="Request Endpoint"
    //       defaultValue=""
    //       padding="20px 0px"
    //     />

    //     <InputLabel
    //       elementRef={(element: any) =>
    //         (hookMetaCreate.metaOrigin.current["requestSchema"] = element)
    //       }
    //       inputType="textArea"
    //       labelText="Request Schema"
    //       placeholder="Request Schema"
    //       defaultValue=""
    //       padding="20px 0px"
    //     />

    //     <InputLabel
    //       elementRef={(element: any) =>
    //         (hookMetaCreate.metaOrigin.current["requestParams"] = element)
    //       }
    //       inputType="text"
    //       labelText="Request Parameter"
    //       placeholder="Provide Parameter"
    //       defaultValue=""
    //       padding="20px 0px"
    //     />

    //     <FlexRow width="100%" hrAlign="space-between">
    //       <ButtonNative variant={""}>Discard</ButtonNative>
    //       <ButtonNative
    //         variant={"state_brand"}
    //         onClick={() => {
    //           let originData = {
    //             requestEndpoint:
    //               hookMetaCreate.metaOrigin.current["requestEndpoint"].value,
    //             requestMethod:
    //               hookMetaCreate.metaOrigin.current["requestMethod"].value,
    //             requestParams:
    //               hookMetaCreate.metaOrigin.current["requestParams"].value,
    //             requestSchema:
    //               hookMetaCreate.metaOrigin.current["requestSchema"].value,
    //             requestType: hookMetaCreate.metaOrigin.current["requestType"].value,
    //           };

    //           const newKey = Object.keys($loadOriginData).length + 1;
    //           $loadOriginData(originData);
    //           modal.onClose();
    //           toast({
    //             title: "Origin Created",
    //             status: "success",
    //             duration: 3000,
    //             position: "bottom-right",
    //           });
    //         }}
    //       >
    //         Save
    //       </ButtonNative>
    //     </FlexRow>
    //   </FlexColumn>

    //   {/* ---------------------------------------------- Origin End -------------------------------------------- */}
    // </ModalSlider>
    <OriginModal
      modal={modal}
      header={"Origin"}
      hookMetaCreate={hookMetaCreate}
      requestTypeOptions={requestTypeOptions}
      settingRequestMethod={settingRequestMethods}
      originMethods={originMethods}
    />
  );
};

export default MetaOriginsModal;
