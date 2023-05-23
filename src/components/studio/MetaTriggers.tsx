import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useMetaStore from "@/store/useMetaStore";
import { Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  modal: any;
};

const MetaTriggers = ({ modal }: Props) => {
  const hookMeta = useMetaCreate();
  const [triggerMethods, setTriggerMethods] = useState<any>([]);
  const [triggerType, setTriggerType] = useState<any>(null);
  const requestTypeOptions = ["GRAPH", "REST", "CONTRACT"];
  const $loadTriggerData = useMetaStore((state: any) => state.loadTriggerData);

  const settingTriggerType = (requestType: string) => {
    requestType == "GRAPH"
      ? setTriggerMethods(["QUERY", "MUTATION"])
      : requestType == "REST"
      ? setTriggerMethods(["GET", "POST"])
      : setTriggerType("CONTRACT");
  };

  return (
    <ModalSlider
      event={modal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">Triggers</Text>
          <IconImage slug="icon-close" onClick={() => modal.onClose()} />
        </FlexRow>
      }
    >
      <FlexRow width="50%" hrAlign="space-between">
        <ButtonNative variant="state_brand">
          <FlexRow>
            <Text className="m-b-0">Get Request</Text>
            <IconImage slug="icon-close" />
          </FlexRow>
        </ButtonNative>

        <ButtonNative variant="state_brand">
          <FlexRow>
            <Text className="m-b-0">Post Request</Text>
            <IconImage slug="icon-close" />
          </FlexRow>
        </ButtonNative>
      </FlexRow>

      {/* ------------------------------------------ Trigger start ------------------------------------------ */}

      <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["triggerName"] = element)
          }
          inputType="text"
          labelText="Name"
          placeholder="Trigger Name"
          defaultValue=""
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["triggerDescription"] = element)
          }
          inputType="text"
          labelText="Description"
          placeholder="Description"
          defaultValue=""
          padding="20px 0px"
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
          Request Type
        </Heading>

        <InputSelect
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["requestType"] = element)
          }
          placeholder="search request type"
          options={requestTypeOptions}
          onChangeHandler={settingTriggerType}
          icon={{ slug: "icon-close" }}
          variant={"state_default_hover"}
          margin="0 0 20px 0"
        />

        {triggerMethods.length > 0 && (
          <>
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
                (hookMeta.metaTrigger.current["requestMethod"] = element)
              }
              placeholder="search request method"
              options={triggerMethods}
              icon={{ slug: "icon-close" }}
              variant={"state_default_hover"}
              margin="0 0 20px 0"
            />
          </>
        )}

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["requestEndpoint"] = element)
          }
          inputType="text"
          labelText="Request Endpoint"
          placeholder="Endpoint"
          defaultValue=""
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["requestSchema"] = element)
          }
          inputType="text"
          labelText="Trigger Schema"
          placeholder="Add your trigger schema"
          defaultValue=""
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMeta.metaTrigger.current["requestParams"] = element)
          }
          inputType="text"
          labelText="Request Parameter"
          placeholder="Provide Parameter"
          defaultValue=""
          padding="20px 0px"
        />

        <FlexRow width="100%" hrAlign="space-between">
          <ButtonNative text="Discard" />
          <ButtonNative
            variant={"state_brand"}
            onClick={() => {
              console.log(
                "logging trigger ",
                hookMeta.metaTrigger.current,
                hookMeta.metaTrigger.current["requestType"].value,
                hookMeta.metaTrigger.current["requestMethod"].value
              );
              $loadTriggerData(hookMeta.metaTrigger.current);
            }}
            text="Save"
          />
        </FlexRow>
      </FlexColumn>

      {/* ---------------------------------------------- Trigger End -------------------------------------------- */}
    </ModalSlider>
  );
};

export default MetaTriggers;
