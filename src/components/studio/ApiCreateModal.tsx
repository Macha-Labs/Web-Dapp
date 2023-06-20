import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ModalWindow from "@/_ui/modal/ModalWindow";
import useMachaApi from "@/hooks/studio/useMachaApi";
import { initialiseNewMeta } from "@/service/StudioService";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  modal: any;
  hookMetaCreate?: any;
};

const ApiCreateModal = ({ modal, hookMetaCreate }: Props) => {
  const $meta = useMetaStore((state: any) => state.meta);
  const hookMachaApi = useMachaApi();
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );

  const [apiType, setApiType] = useState("");

  const renderForm = (field: any) => {
    switch (field?.type) {
      case "input":
        return (
          <InputLabel
            elementRef={(element: any) =>
              (hookMetaCreate.apiDataRef.current["requestEndpoint"] = element)
            }
            labelText={field?.title}
            inputType={field?.inputType}
          />
        );
      case "select":
        return (
          <FlexColumn vrAlign="flex-start">
            <Heading
              as="h6"
              size="sm"
              bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
              bgClip="text"
            >
              {field?.title}
            </Heading>
            <InputSelect
              elementRef={(element: any) =>
                (hookMetaCreate.apiDataRef.current["requestMethod"] = element)
              }
              options={field?.options}
            />
          </FlexColumn>
        );
    }
  };

  return (
    <>
      <ModalWindow
        event={modal}
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Create API</Text>
            <IconImage slug="icon-close" onClick={() => modal.onClose()} />
          </FlexRow>
        }
        footer={
          <ButtonNative
            variant="state_brand"
            // marginTop={style.margin["lg"]}
            width="100%"
            onClick={async (e: any) => {
              e.preventDefault();
              await hookMetaCreate.publishApi();
              // console.log("Logging ", hookMetaCreate.apiDataRef.current["name"].value,
              // hookMetaCreate.apiDataRef.current["description"].value,
              // hookMetaCreate.apiDataRef.current["requestType"].value,
              // hookMetaCreate.apiDataRef.current["requestMethod"].value,
              // hookMetaCreate.apiDataRef.current["requestEndpoint"].value);
            }}
          >
            Create API
          </ButtonNative>
        }
      >
        <FlexColumn
          width="100%"
          hrAlign="space-between"
          height="100%"
          padding={style.padding["sm"]}
        >
          <FlexColumn hrAlign="space-between" height="35%">
            <InputLabel
              elementRef={(element: any) =>
                (hookMetaCreate.apiDataRef.current["name"] = element)
              }
              inputType="text"
              defaultValue={$meta.name}
              labelText="API Name"
              placeholder="Name"
            />
            <InputLabel
              elementRef={(element: any) =>
                (hookMetaCreate.apiDataRef.current["description"] = element)
              }
              inputType="text"
              labelText="Description"
              placeholder="Description"
              marginTop="sm"
            />
            <FlexColumn vrAlign="flex-start" marginTop={"sm"}>
              <Heading
                as="h6"
                size="sm"
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                API type
              </Heading>
              <FlexRow hrAlign="flex-start">
                {hookMachaApi?.apiTypes?.map((item: any) => {
                  console.log(item);
                  return (
                    <CardNative
                      margin="xs"
                      padding="1rem"
                      width="fit-content"
                      border={
                        apiType == item.slug
                          ? style.card.border.hover
                          : style.card.border.default
                      }
                      bg={
                        apiType == item.slug
                          ? style.card.bg.highlight
                          : style.card.bg.overview
                      }
                      onClick={() => {
                        hookMetaCreate.apiDataRef.current["requestType"] =
                          {value: item.slug};
                        console.log("clicked", item.slug);
                        setApiType(item.slug);
                      }}
                    >
                      <FlexRow>
                        <Heading
                          className="mb-0"
                          as="h5"
                          fontSize={style.font["h5"]}
                          //   marginRight={"0px"}
                        >
                          {item?.title}
                        </Heading>
                      </FlexRow>
                    </CardNative>
                  );
                })}
              </FlexRow>
            </FlexColumn>
            {/* Main Form */}
            {apiType == "https" && (
              <FlexColumn>
                {hookMachaApi?.apiForm[hookMachaApi.selectedType]?.map(
                  (item: any) => {
                    return (
                      <FlexRow
                        width="100%"
                        hrAlign="flex-start"
                        marginBottom={"sm"}
                      >
                        {renderForm(item)}
                      </FlexRow>
                    );
                  }
                )}
              </FlexColumn>
            )}
          </FlexColumn>
          {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}

          {/* </Link> */}
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default ApiCreateModal;
