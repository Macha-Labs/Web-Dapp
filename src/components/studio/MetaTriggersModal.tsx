import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { useState } from "react";
import OriginModal from "../modals/studio/OriginModal";
import TriggerModal from "../modals/studio/TriggerModal";

type Props = {
  modal: any;
};

const MetaTriggersModal = ({ modal }: Props) => {
  const hookMetaCreate = useMetaCreate();
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
