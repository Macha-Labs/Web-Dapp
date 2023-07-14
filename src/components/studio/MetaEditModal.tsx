import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { deploytoLightHouse } from "@/helpers/storage/lightHouseStorage";
import { editPendingMeta } from "@/service/MetaService";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  metaModal?: any;
  hookMetaCreate?: any;
};
const MetaEditModal = ({ metaModal, hookMetaCreate }: Props) => {
  const $meta = useMetaStore((state: any) => state.meta);
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );

  const router = useRouter();

  const $overviewData = useMetaStore((state: any) => state.overviewData);
  const [imageEvent, setImageEvent] = useState<any>();
  console.log("metaaaa", $meta);
  return (
    <ModalSlider
      event={metaModal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">Edit Meta</Text>
          <IconImage slug="icon-close" onClick={() => metaModal.onClose()} />
        </FlexRow>
      }
    >
      <FlexColumn width="100%" hrAlign="space-between">
        <FlexColumn hrAlign="space-between" height="100%" marginTop={"sm"}>
          <InputLabel
            elementRef={(element: any) =>
              (hookMetaCreate.metaOverview.current["metaName"] = element)
            }
            inputType="text"
            labelText="Meta Name"
            placeholder="Name"
            defaultValue={$meta?.name}
          />
          <InputLabel
            marginTop="sm"
            elementRef={(element: any) =>
              (hookMetaCreate.metaOverview.current["metaDescription"] = element)
            }
            inputType="textArea"
            labelText="Description"
            placeholder="Description"
            defaultValue={$meta?.description}
          />
          {!imageEvent && (
            <InputLabel
              marginTop="sm"
              inputType="file"
              labelText="Attach Image For Meta"
              placeholder="Image"
              onChange={async (e?: any) => {
                console.log(e);
                setImageEvent(e);
              }}
            />
          )}
          {/* {imageEvent && (
            <Image
              src={URL.createObjectURL(imageEvent?.target?.files[0])}
              alt={imageEvent?.target?.files[0].name}
              width="300px"
              height={"fit-content"}
              className="m-t-1"
            />
          )} */}
        </FlexColumn>
        <Box width={"100%"} position={"relative"}>
          {imageEvent && (
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
                lineHeight={1.3}
                // className="m-b-1"
              >
                Attach Image For Meta
              </Heading>
              <Box
                // background="red"
                border="2px dashed #004AD9"
                minHeight="200px"
                width="100%"
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={style.input.borderRadius.default}
              >
                <Image
                  src={URL.createObjectURL(imageEvent?.target?.files[0])}
                  alt={imageEvent?.target?.files[0].name}
                  width="200px"
                  // className="m-t-1"
                />
              </Box>
            </>
          )}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="rgba(0, 0, 0, 0.9)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity="0"
            transition="opacity 0.3s"
            _hover={{ opacity: 1 }}
          >
            <IconImage
              slug="icon-changeImage"
              style={{ className: "state_hover" }}
            />
          </Box>
        </Box>
        <FlexRow>
          <ButtonNative
            variant="state_brand"
            width="100%"
            onClick={async (e: any) => {
              e.preventDefault();
              const cid = await deploytoLightHouse(imageEvent);
              let metaUpdateData = {
                name: hookMetaCreate.metaOverview.current["metaName"].value,
                description:
                  hookMetaCreate.metaOverview.current["metaDescription"].value,
                image: cid,
                createdAt: $meta?.state?.createdAt,
              };
              $loadOverviewData(metaUpdateData);
              await editPendingMeta($meta._id, metaUpdateData);
            }}
          >
            Save Changes
          </ButtonNative>
        </FlexRow>
      </FlexColumn>
    </ModalSlider>
  );
};

export default MetaEditModal;
