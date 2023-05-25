import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useMetaStore from "@/store/useMetaStore";
import { useState } from "react";
import OriginModal from "../modals/studio/OriginModal";

type Props = {
  modal: any;
  selectedOrigin: any;
};

const MetaEditOriginsModal = ({ modal, selectedOrigin }: Props) => {
  const hookMetaCreate = useMetaCreate();
  const [originType, setOriginType] = useState<any>(null);
  const [originMethods, setOriginMethods] = useState<any>([]);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];
  const $originData = useMetaStore((state: any) => state.originData);

  const settingRequestMethods = (requestType: string) => {
    requestType == "GRAPH"
      ? setOriginMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setOriginMethods(["GET", "POST"])
      : setOriginType("CONTRACT");
  };
  return (
    <OriginModal
      modal={modal}
      header={"Origin Edit"}
      hookMetaCreate={hookMetaCreate}
      defaultData={$originData[selectedOrigin]}
      requestTypeOptions={requestTypeOptions}
      settingRequestMethod={settingRequestMethods}
      originMethods={originMethods}
    />
  );
};

export default MetaEditOriginsModal;
