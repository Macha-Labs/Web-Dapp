import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  modal: any;
  header: string;
  hookMetaCreate: any;
  requestTypeOptions: string[];
  settingRequestMethod: (e?: any) => void;
  triggerMethods: string[];
  defaultData?: any;
  selectedTrigger?: any;
};

const TriggerModal = ({
  modal,
  header,
  hookMetaCreate,
  requestTypeOptions,
  settingRequestMethod,
  triggerMethods,
  defaultData = null,
  selectedTrigger = null,
}: Props) => {
  useEffect(() => {
    if (defaultData) {
      console.log("Calling request method");
      settingRequestMethod(defaultData?.requestType);
    }
  }, []);
  return (
    <ModalSlider
      event={modal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">{header}</Text>
          <IconImage slug="icon-close" onClick={() => modal.onClose()} />
        </FlexRow>
      }
    >
      {/* ------------------------------------------ Trigger start ------------------------------------------ */}

      <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["triggerName"] = element)
          }
          inputType="text"
          labelText="Name"
          placeholder="Trigger Name"
          defaultValue={defaultData?.name}
          // padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["triggerDescription"] = element)
          }
          inputType="textArea"
          labelText="Description"
          placeholder="Description"
          defaultValue={defaultData?.description}
          // padding="20px 0px"
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
          // marginTop={"20px"}
          marginTop={style.margin["sm"]}
        >
          Request Type
        </Heading>

        <InputSelect
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["requestType"] = element)
          }
          placeholder="Search request type"
          options={requestTypeOptions}
          onChangeHandler={settingRequestMethod}
          defaultValue={defaultData?.requestType}
          icon={{ slug: "icon-chevron-down" }}
          variant={"state_default_hover"}
          // margin="0 0 10px 0"
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
              // marginTop={"20px"}
              marginTop={style.margin["sm"]}
            >
              Request Method
            </Heading>
            <InputSelect
              elementRef={(element: any) =>
                (hookMetaCreate.metaTrigger.current["requestMethod"] = element)
              }
              placeholder="search request method"
              options={triggerMethods}
              defaultValue={defaultData?.requestMethod}
              icon={{ slug: "icon-chevron-down" }}
              variant={"state_default_hover"}
              margin="0 0 10px 0"
            />
          </>
        )}

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["requestEndpoint"] = element)
          }
          inputType="text"
          labelText="Request Endpoint"
          defaultValue={defaultData?.requestEndpoint}
          placeholder="Endpoint"
          marginTop="sm"
          // padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["requestSchema"] = element)
          }
          inputType="textArea"
          labelText="Trigger Schema"
          placeholder="Add your trigger schema"
          defaultValue={defaultData?.requestSchema}
          // padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaTrigger.current["requestParams"] = element)
          }
          inputType="text"
          labelText="Request Parameter"
          placeholder="Provide Parameter"
          defaultValue={defaultData?.requestParams}
          marginTop="sm"
          // padding="20px 0px"
        />

        <FlexRow width="100%" hrAlign="space-between" marginTop={"sm"}>
          <ButtonNative text="Discard" marginRight="0px" />
          <ButtonNative
            variant={"state_brand"}
            onClick={() => {
              hookMetaCreate.executeTriggerSave(selectedTrigger);
              modal.onClose();
            }}
            text="Save"
            marginRight="0px"
          />
        </FlexRow>
      </FlexColumn>

      {/* ---------------------------------------------- Trigger End -------------------------------------------- */}
    </ModalSlider>
  );
};

export default TriggerModal;
