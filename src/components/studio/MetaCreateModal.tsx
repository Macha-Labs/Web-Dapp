import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import ModalSlider from "@/_ui/modal/ModalSlider";
import useMetaStore from "@/store/useMetaStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
    //console.log("Logging pending meta ", $meta);
  }, [$meta]);

  return (
    <ModalSlider
      event={metaModal}
      size="md"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text className="mb-0">Create Meta</Text>
          <Image src={GlobalIcons["icon-close"]} onClick={() => metaModal.onClose()} style={{
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
              //console.log(e);
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
        {/* <ButtonNative
          variant="state_brand"
          width="100%"
          onClick={async (e: any) => {
            e.preventDefault();
            const cid = await deploytoLightHouse(imageEvent,);
            let metaCreateData = {
              name: hookMeta.metaOverview.current["metaName"].value,
              description:
                hookMeta.metaOverview.current["metaDescription"].value,
              image: cid,
              status: "PENDING",
              owner: "0x4eff290c1a734411b39aaA96eAbE1E25f0E223ae",
            };
            await initialiseNewMeta(metaCreateData);
            $loadOverviewData(metaCreateData);
          }}
        >
          Create Meta
        </ButtonNative> */}
        {/* </Link> */}
      </FlexColumn>
    </ModalSlider>
  );
};

export default MetaCreateModal;
