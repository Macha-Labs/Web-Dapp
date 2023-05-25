import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useMetaStore from "@/store/useMetaStore";
import { Button, Heading, Text, useToast } from "@chakra-ui/react";
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
