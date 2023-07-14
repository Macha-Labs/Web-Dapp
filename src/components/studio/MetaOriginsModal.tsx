import useApiCreate from "@/hooks/studio/useApiCreate";
import { useState } from "react";
import OriginModal from "../modals/studio/OriginModal";

type Props = {
  modal: any;
};

const MetaOriginsModal = ({ modal }: Props) => {
  const hookMetaCreate = useApiCreate();
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
