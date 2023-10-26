import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import useMachaApi from "@/hooks/studio/useMachaApi";
import useMetaStore from "@/store/useMetaStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Heading, Image, Text } from "@chakra-ui/react";
import CustomTable from "./CustomTable";

type Props = {
  modal: any;
  hookApiCreate?: any;
};

const ApiCreateModal = ({ modal, hookApiCreate }: Props) => {
  const $meta = useMetaStore((state: any) => state.meta);
  const hookMachaApi = useMachaApi();

  const renderForm = (field: any) => {
    switch (field?.type) {
      case "input":
        return (
          <InputLabel
            elementRef={(element: any) =>
              (hookApiCreate.apiDataRef.current["requestEndpoint"] = element)
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
            {/* <InputSelect
              elementRef={(element: any) =>
                (hookApiCreate.apiDataRef.current["requestMethod"] = element)
              }
              options={field?.options}
            /> */}
          </FlexColumn>
        );
    }
  };

  return (
    <>
      <ModalWindow
        event={modal}
        size="5xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0"> API</Text>
            <Image src={GlobalIcons["icon-close"]} onClick={() => modal.onClose()} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
              width: "fit-content",
              height: "fit-content",
              background: `${style.icon.bg.default}`,
              borderRadius: `${style.icon.borderRadius}`,
              boxShadow: `${style.icon.shadow.default}`,
              marginLeft: `${style.margin[style?.marginLeft]}`,
              marginRight: `${style.margin[style?.marginRight]}`,
              marginBottom: `${style.margin[style?.marginBottom]}`,
              marginTop: `${style.margin[style?.marginTop]}`,
            }} />
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-start">
            <ButtonNative
              variant="state_brand"
              // marginTop={style.margin["lg"]}

              onClick={async (e: any) => {
                e.preventDefault();
                await hookApiCreate.publishApi();
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
                  //console.log(item);
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
                        hookApiCreate.apiDataRef.current["requestType"] = {
                          value: item.slug,
                        };
                        //console.log("clicked", item.slug);
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
                (hookApiCreate.apiDataRef.current["name"] = element)
              }
              inputType="text"
              defaultValue={$meta.name}
              labelText="API Name"
              placeholder="Name"
            />
            <InputLabel
              elementRef={(element: any) =>
                (hookApiCreate.apiDataRef.current["description"] = element)
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
              <CustomTable />
            </FlexColumn>
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default ApiCreateModal;
