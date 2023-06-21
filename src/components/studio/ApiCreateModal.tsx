import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import TableNative from "@/_ui/list/TableNative";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import useMachaApi from "@/hooks/studio/useMachaApi";
import useMetaStore from "@/store/useMetaStore";
import { StyledCard } from "@/styles/StyledComponents";
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

  const [tableRows, setTableRows] = useState([
    [
      <InputLabel inputType="text" />,
      "Meta_war",
      <IconImage
        slug="icon-delete-blue"
        size="sm"
        onClick={() => {
          // setTableRows(tableRows.splice(0, 1));
        }}
      />,
    ],
    [
      "ABX_NAME1",
      "Meta_war",
      <IconImage
        slug="icon-delete-blue"
        size="sm"
        onClick={() => {
          // setTableRows(tableRows.splice(1, 1));
        }}
      />,
    ],
    [
      "ABX_NAME",
      "Meta_war",
      <IconImage
        slug="icon-delete-blue"
        size="sm"
        onClick={() => {
          // setTableRows(tableRows.splice(2, 1));
        }}
      />,
    ],
  ]);

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

  const handleDeleteRow = (index: number) => {
    console.log("deleting", index);
    // setTableRows(tableRows.filter((_, i) => i !== index));
    const beforeArray = tableRows.slice(0, index);
    const afterArray = tableRows.slice(index + 1);

    console.log(
      "before",
      beforeArray,
      "after",
      afterArray,
      "tablerow",
      tableRows
    );
    setTableRows([...beforeArray, ...afterArray]);
  };

  const handleAddRow = () => {
    console.log(tableRows.length);
    const currentIndex = tableRows.length;
    // console.log(Date.now( ));
    const newRow = [
      <InputLabel id={Date.now()} inputType="text" />,
      "Meta_war",
    ];
    setTableRows([...tableRows, newRow]);
  };

  console.log("inapicreatecompoent");
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
                {hookMachaApi?.apiTypes?.map((item: any) => {
                  console.log(item);
                  return (
                    <CardNative
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
              <TableNative
                align="left"
                tableWidth="100%"
                th={["Key", "Value", "Action"]}
                tr={tableRows.map((row, index) => [
                  ...row.slice(0, 2),
                  <IconImage
                    slug="icon-delete-blue"
                    size="sm"
                    onClick={() => {
                      // console.log("deleting", index);
                      handleDeleteRow(index);
                    }}
                  />,
                ])}
              />
              <ButtonNative
                size="sm"
                width="100%"
                marginTop="sm"
                variant="state_default_hover"
                onClick={handleAddRow}
              >
                Add New Param
              </ButtonNative>
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
