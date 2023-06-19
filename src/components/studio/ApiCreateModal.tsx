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
  hookMeta?: any;
};

const ApiCreateModal = ({ modal, hookMeta }: Props) => {
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
          <InputLabel labelText={field?.title} inputType={field?.inputType} />
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
            <InputSelect options={field?.options} />
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
              //   const cid = await deploytoLightHouse(imageEvent);
              let metaCreateData = {
                name: hookMeta.metaOverview.current["metaName"].value,
                description:
                  hookMeta.metaOverview.current["metaDescription"].value,
                // image: cid,
                status: "PENDING",
                owner: "0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7",
              };
              await initialiseNewMeta(metaCreateData);
              $loadOverviewData(metaCreateData);
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
                (hookMeta.metaOverview.current["metaName"] = element)
              }
              inputType="text"
              defaultValue={$meta.name}
              labelText="API Name"
              placeholder="Name"
            />
            <InputLabel
              elementRef={(element: any) =>
                (hookMeta.metaOverview.current["metaDescription"] = element)
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
