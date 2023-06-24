import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import useMachaApi from "@/hooks/studio/useMachaApi";
import { initialiseNewMeta } from "@/service/studio/MetaService";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";

type Props = {
  modal: any;
  hookMeta?: any;
};

const ClientCreateModal = ({ modal, hookMeta }: Props) => {
  //   const $meta = useMetaStore((state: any) => state.meta);
  const hookMachaApi = useMachaApi();
  const $loadOverviewData = useMetaStore(
    (state: any) => state.loadOverviewData
  );

  return (
    <>
      <ModalWindow
        event={modal}
        size="5xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Client</Text>
            <IconImage slug="icon-close" onClick={() => modal.onClose()} />
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-start">
            <ButtonNative
              variant="state_brand"
              // marginTop={style.margin["lg"]}
              // width="50%"
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
              Create
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
          <FlexColumn width="100%">
            <InputLabel
              inputType="text"
              //   defaultValue={}
              labelText="Name"
              placeholder="Name"
            />
            <InputLabel
              inputType="text"
              labelText="Description"
              placeholder="Description"
              marginTop="sm"
            />
          </FlexColumn>
          <FlexColumn vrAlign="flex-start" marginTop={"sm"} width="100%">
            {/* Main Form */}

            {/* Params */}
          </FlexColumn>
          {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}

          {/* </Link> */}
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default ClientCreateModal;
