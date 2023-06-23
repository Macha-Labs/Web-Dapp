import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import useMachaApi from "@/hooks/studio/useMachaApi";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import EditableTable from "./CustomeTable";

type Props = {
  modal: any;
  hookMetaCreate?: any;
};

const ApiCreateModal = ({ modal, hookMetaCreate }: Props) => {
  const $meta = useMetaStore((state: any) => state.meta);
  const hookMachaApi = useMachaApi();

  const [tableRows, setTableRows] = useState<any>([]);

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

  const handleAddRow = () => {
    console.log(tableRows.length);
    const newRow = [
      <InputLabel
        key={tableRows.length}
        id={tableRows.length}
        defaultValue=""
        placeholder="Key"
        inputType="text"
      />,
      `Meta_war ${tableRows.length}`,
    ];
    setTableRows([...tableRows, newRow]);
  };

  return (
    <>
      <ModalWindow
        event={modal}
        size="5xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0"> API</Text>
            <IconImage slug="icon-close" onClick={() => modal.onClose()} />
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-start">
            <ButtonNative
              variant="state_brand"
              // marginTop={style.margin["lg"]}

              onClick={async (e: any) => {
                e.preventDefault();
                await hookMetaCreate.publishApi();
              }}
            >
              Create API
            </ButtonNative>

            <ButtonNative variant="state_default_hover" marginLeft="sm">
              Cancel
            </ButtonNative>
          </FlexRow>
        }
      >
        <FlexColumn
          width="100%"
          hrAlign="space-between"
          height="100%"
          padding={style.padding["sm"]}
        >
          <FlexColumn hrAlign="space-between" height="35%">
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
              <FlexRow hrAlign="flex-start" marginBottom={"sm"}>
                {hookMachaApi?.apiTypes?.map((item: any, index: number) => {
                  console.log(item);
                  return (
                    <CardNative
                      key={index}
                      marginRight="xs"
                      padding="1rem"
                      width="fit-content"
                      border={
                        hookMachaApi.selectedType == item.slug
                          ? style.card.border.hover
                          : style.card.border.default
                      }
                      bg={
                        hookMachaApi.selectedType == item.slug
                          ? style.card.bg.highlight
                          : style.card.bg.overview
                      }
                      onClick={() => {
                        hookMetaCreate.apiDataRef.current["requestType"] = {
                          value: item.slug,
                        };
                        console.log("clicked", item.slug);
                        hookMachaApi.setSelectedType(item.slug);
                      }}
                    >
                      <Heading
                        className="mb-0"
                        as="h5"
                        fontSize={style.font["h5"]}
                        textAlign="left"
                        // width={"100%"}
                        //   marginRight={"0px"}
                      >
                        {item?.title}
                      </Heading>
                    </CardNative>
                  );
                })}
              </FlexRow>
            </FlexColumn>
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
          </FlexColumn>
          <FlexColumn vrAlign="flex-start" marginTop={"sm"} width="100%">
            {/* Main Form */}
            <FlexColumn>
              {hookMachaApi.apiForm[hookMachaApi.selectedType].map(
                (item: any, index: number) => {
                  return (
                    <FlexRow
                      key={index}
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
            {/* Params */}
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
                Params
              </Heading>
              <EditableTable />
            </FlexColumn>
          </FlexColumn>
          {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}

          {/* </Link> */}
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default ApiCreateModal;
