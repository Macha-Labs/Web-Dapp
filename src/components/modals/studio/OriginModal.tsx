import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  modal: any;
  header: string;
  hookMetaCreate: any;
  requestTypeOptions: string[];
  settingRequestMethod: (e?: any) => void;
  originMethods: string[];
  defaultData?: any;
};

const OriginModal = ({
  modal,
  header,
  hookMetaCreate,
  requestTypeOptions,
  settingRequestMethod,
  originMethods,
  defaultData = null,
}: Props) => {

  useEffect(() => {
    if (defaultData) {
        console.log("Calling request method")
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
            (hookMetaCreate.metaOrigin.current["requestType"] = element)
          }
          placeholder="Select request Type"
          onChangeHandler={settingRequestMethod}
          defaultValue={defaultData?.requestType}
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
            (hookMetaCreate.metaOrigin.current["requestMethod"] = element)
          }
          placeholder="Select Request Method"
          options={originMethods}
          defaultValue={defaultData?.requestMethod}
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
            (hookMetaCreate.metaOrigin.current["requestEndpoint"] = element)
          }
          inputType="text"
          labelText="Request Endpoint"
          defaultValue={defaultData?.requestEndpoint}
          placeholder="Request Endpoint"
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaOrigin.current["requestSchema"] = element)
          }
          inputType="textArea"
          labelText="Request Schema"
          placeholder="Request Schema"
          defaultValue={defaultData?.requestSchema}
          padding="20px 0px"
        />

        <InputLabel
          elementRef={(element: any) =>
            (hookMetaCreate.metaOrigin.current["requestParams"] = element)
          }
          inputType="text"
          labelText="Request Parameter"
          placeholder="Provide Parameter"
          defaultValue={defaultData?.requestParams}
          padding="20px 0px"
        />

        <FlexRow width="100%" hrAlign="space-between">
          <ButtonNative variant={""}>Discard</ButtonNative>
          <ButtonNative
            variant={"state_brand"}
            onClick={() => {
              //
              hookMetaCreate.executeOriginSave();
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

export default OriginModal;
