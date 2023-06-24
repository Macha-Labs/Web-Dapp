import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useMetaStore from "@/store/useMetaStore";
import { useState } from "react";
import TriggerModal from "../modals/studio/TriggerModal";

type Props = {
  modal: any;
  selectedTrigger: any;
};

const MetaEditTriggerModal = ({ modal, selectedTrigger }: Props) => {
  const hookMetaCreate = useMetaCreate();
  const [originType, setOriginType] = useState<any>(null);
  const [originMethods, setOriginMethods] = useState<any>([]);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];
  const $triggerData = useMetaStore((state: any) => state.triggerData);

  const settingRequestMethods = (requestType: string) => {
    requestType == "GRAPH"
      ? setOriginMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setOriginMethods(["GET", "POST"])
      : setOriginType("CONTRACT");
  };
  return (
    <TriggerModal
      modal={modal}
      header={"Origin Edit"}
      hookMetaCreate={hookMetaCreate}
      defaultData={$triggerData[selectedTrigger]}
      selectedTrigger={selectedTrigger}
      requestTypeOptions={requestTypeOptions}
      settingRequestMethod={settingRequestMethods}
      triggerMethods={originMethods}
    />
  );
};

export default MetaEditTriggerModal;
