import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { deploytoLightHouse } from "@/helpers/storage/lightHouseStorage";
import useMetaStore from "@/store/useMetaStore";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  metaModal?: any;
  hookMetaCreate?: any;
};
const MetaEditModal = ({ metaModal, hookMetaCreate }: Props) => {
  const $meta = useMetaStore((state: any) => state.meta);
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );
  const $overviewData = useMetaStore((state: any) => state.overviewData);
  const [imageEvent, setImageEvent] = useState<any>();
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
      children={
        <FlexColumn width="100%" hrAlign="space-between">
          <FlexColumn hrAlign="space-between" height="35%" marginTop={"sm"}>
            <InputLabel
              elementRef={(element: any) =>
                (hookMetaCreate.metaOverview.current["metaName"] = element)
              }
              inputType="text"
              labelText="Meta Name"
              placeholder="Name"
              defaultValue={$meta?.data?.name}
            />
            <InputLabel
              elementRef={(element: any) =>
                (hookMetaCreate.metaOverview.current["metaDescription"] =
                  element)
              }
              inputType="text"
              labelText="Description"
              placeholder="Description"
              defaultValue={$meta?.data?.description}
            />
            <InputLabel
              inputType="file"
              labelText="Image"
              placeholder="Image"
              onChange={async (e?: any) => {
                console.log(e);
                setImageEvent(e);
              }}
            />
          </FlexColumn>
          {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}
          <ButtonNative
            variant="state_brand"
            width="100%"
            onClick={async (e: any) => {
              e.preventDefault();
              const cid = await deploytoLightHouse(imageEvent);
              let metaCreateData = {
                name: hookMetaCreate.metaOverview.current["metaName"].value,
                description:
                  hookMetaCreate.metaOverview.current["metaDescription"].value,
                image: cid,
              };
              $loadOverviewData(metaCreateData);
            }}
          >
            Save Changes
          </ButtonNative>
          {/* </Link> */}
        </FlexColumn>
      }
    />
  );
};

export default MetaEditModal;
