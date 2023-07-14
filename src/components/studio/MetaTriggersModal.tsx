import useApiCreate from "@/hooks/studio/useApiCreate";
import { useState } from "react";
import TriggerModal from "../modals/studio/TriggerModal";

type Props = {
  modal: any;
};

const MetaTriggersModal = ({ modal }: Props) => {
  const hookMetaCreate = useApiCreate();
  const [triggerType, setTriggerType] = useState<any>(null);
  const [triggerMethods, setTriggerMethods] = useState<any>([]);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];

  const settingRequestMethods = (requestType: string) => {
    requestType == "GRAPH"
      ? setTriggerMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setTriggerMethods(["GET", "POST"])
      : setTriggerType("CONTRACT");
  };

  return (
    <TriggerModal
      modal={modal}
      header={"Trigger"}
      hookMetaCreate={hookMetaCreate}
      requestTypeOptions={requestTypeOptions}
      settingRequestMethod={settingRequestMethods}
      triggerMethods={triggerMethods}
    />
  );
};

export default MetaTriggersModal;
