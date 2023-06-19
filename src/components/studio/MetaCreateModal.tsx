import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import ModalSlider from "@/_ui/modal/ModalSlider";
import { deploytoLightHouse } from "@/helpers/storage/lightHouseStorage";
import { initialiseNewMeta } from "@/service/StudioService";
import useMetaStore from "@/store/useMetaStore";
import { Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {
  metaModal?: any;
  hookMeta?: any;
};
const MetaCreateModal = ({ metaModal, hookMeta }: Props) => {
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );
  const [imageEvent, setImageEvent] = useState<any>();
  const $overviewData = useMetaStore((state: any) => state.overviewData);
  const $meta = useMetaStore((state: any) => state.meta);

  useEffect(() => {
    console.log("Logging pending meta ", $meta);
  }, []);

  return (
    <ModalSlider
      event={metaModal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">Create Meta</Text>
          <IconImage slug="icon-close" onClick={() => metaModal.onClose()} />
        </FlexRow>
      }
    >
      <FlexColumn width="100%" hrAlign="space-between" height="100%">
        <FlexColumn hrAlign="space-between" height="35%">
          <InputLabel
            elementRef={(element: any) =>
              (hookMeta.metaOverview.current["metaName"] = element)
            }
            inputType="text"
            defaultValue={$meta.name}
            labelText="Meta Name"
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
          <InputLabel
            inputType="file"
            labelText="Image"
            placeholder="Image"
            onChange={async (e?: any) => {
              console.log(e);
              setImageEvent(e);
            }}
          />
          {imageEvent && (
            <Image
              src={URL.createObjectURL(imageEvent?.target?.files[0])}
              alt={imageEvent?.target?.files[0].name}
              width="300px"
            />
          )}
        </FlexColumn>
        {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}
        <ButtonNative
          variant="state_brand"
          width="100%"
          onClick={async (e: any) => {
            e.preventDefault();
            const cid = await deploytoLightHouse(imageEvent);
            let metaCreateData = {
              name: hookMeta.metaOverview.current["metaName"].value,
              description:
                hookMeta.metaOverview.current["metaDescription"].value,
              image: cid,
              status: "PENDING",
              owner: "0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7",
            };
            await initialiseNewMeta(metaCreateData);
            $loadOverviewData(metaCreateData);
          }}
        >
          Create Meta
        </ButtonNative>
        {/* </Link> */}
      </FlexColumn>
    </ModalSlider>
  );
};

export default MetaCreateModal;
