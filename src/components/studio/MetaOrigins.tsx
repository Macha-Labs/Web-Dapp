import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useMetaStore from "@/store/useMetaStore";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  modal: any;
};

const MetaOrigins = ({ modal }: Props) => {
  const hookMeta = useMetaCreate();
  const [originType, setOriginType] = useState<any>(null);
  const [originMethods, setOriginMethods] = useState<any>([]);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];
  const $loadOriginData = useMetaStore((state: any) => state.loadOriginData);

  const settingOriginType = (requestType: string) => {
    requestType == "GRAPH"
      ? setOriginMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setOriginMethods(["GET", "POST"])
      : setOriginType("CONTRACT");
  };

  return (
    <ModalSlider
      event={modal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">Origins</Text>
          <IconImage slug="icon-close" onClick={() => modal.onClose()} />
        </FlexRow>
      }
    >
      {/* ---------------------------------------------- Origin Start -------------------------------------------- */}

      <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
        <Heading
          as="h6"
          size="sm"
          bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
          bgClip="text"
          marginTop={"20px"}
        >
          Request Type
        </Heading>
        <InputSelect
          elementRef={(element: any) =>
            (hookMeta.metaOrigin.current["requestType"] = element)
          }
          placeholder="Select request Type"
          onChangeHandler={settingOriginType}
          options={requestTypeOptions}
          icon={{ slug: "icon-close" }}
          variant={"state_default_hover"}
          margin="0 0 20px 0"
        />

        <Heading
          as="h6"
          size="sm"
          bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
          bgClip="text"
          marginTop={"20px"}
        >
          Request Method
        </Heading>

        <InputSelect
          elementRef={(element: any) =>
            (hookMeta.metaOrigin.current["requestMethod"] = element)
          }
          placeholder="Select Request Method"
          options={originMethods}
          icon={{ slug: "icon-close" }}
          variant={"state_default_hover"}
          margin="0 0 20px 0"
        />

        {/* <InputLabel
                  inputType="text"
                  labelText="Request Schema CID"
                  placeholder="Request Schema CID"
                  defaultValue=""
                  padding="20px 0px"
                /> */}
        {/* <InputLabel
                  inputType="text"
                  labelText="Request Headers"
                  placeholder="Request Headers"
                  defaultValue=""
                  padding="20px 0px"
                /> */}

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaOrigin.current["requestEndpoint"] = element)
          }
          inputType="text"
          labelText="Request Endpoint"
          placeholder="Request Endpoint"
          defaultValue=""
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaOrigin.current["requestSchema"] = element)
          }
          inputType="text"
          labelText="Request Schema"
          placeholder="Request Schema"
          defaultValue=""
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaOrigin.current["requestParams"] = element)
          }
          inputType="text"
          labelText="Request Parameter"
          placeholder="Provide Parameter"
          defaultValue=""
          padding="20px 0px"
        />

        <FlexRow width="100%" hrAlign="space-between">
          <ButtonNative variant={""}>Discard</ButtonNative>
          <ButtonNative
            variant={"state_brand"}
            onClick={() => {
              $loadOriginData(hookMeta.metaOrigin.current);
            }}
          >
            Save
          </ButtonNative>
        </FlexRow>
      </FlexColumn>

      {/* ---------------------------------------------- Origin End -------------------------------------------- */}
    </ModalSlider>
  );
};

export default MetaOrigins;
