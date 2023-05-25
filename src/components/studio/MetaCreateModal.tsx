import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useMetaStore from "@/store/useMetaStore";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  metaModal?: any;
  hookMeta?: any;
};
const MetaCreateModal = ({ metaModal, hookMeta }: Props) => {
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );
  const $overviewData = useMetaStore((state: any) => state.overviewData);
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
      children={
        <FlexColumn width="100%" hrAlign="space-between" height="100%">
          <FlexColumn hrAlign="space-between" height="35%">
            <InputLabel
              elementRef={(element: any) =>
                (hookMeta.metaOverview.current["metaName"] = element)
              }
              inputType="text"
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
            />
            <InputLabel
              inputType="file"
              labelText="Image"
              placeholder="Image"
            />
          </FlexColumn>
          {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}
          <ButtonNative
            variant="state_brand"
            width="100%"
            onClick={(e: any) => {
              e.preventDefault();
              let metaCreateData = {
                name: hookMeta.metaOverview.current["metaName"].value,
                description:
                  hookMeta.metaOverview.current["metaDescription"].value,
              };
              $loadOverviewData(metaCreateData);
            }}
          >
            Create Meta
          </ButtonNative>
          {/* </Link> */}
        </FlexColumn>
      }
    />
  );
};

export default MetaCreateModal;
