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
import { FormControl, Heading, Text } from "@chakra-ui/react";
import CustomTable from "./CustomTable";

type Props = {
  modal: any;
  hookContractCreate?: any;
};

const CreateContractModal = ({ modal, hookContractCreate }: Props) => {
  return (
    <>
      <ModalWindow
        event={modal}
        size="5xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Contract</Text>
            <IconImage slug="icon-close" onClick={() => modal.onClose()} />
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-start">
            <ButtonNative
              variant="state_brand"
              marginTop={style.margin["lg"]}
              onClick={async (e: any) => {
                e.preventDefault();
                await hookContractCreate.publishContract();
              }}
            >
              Create Contract
            </ButtonNative>

            <ButtonNative variant="state_default_hover" marginLeft="sm" onClick={() => modal.onClose()}>
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
            <Text
              fontSize={style.font.h7}
              textAlign="left" width="100%"
              bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
              bgClip="text"
            >All * marked fields are required</Text>
            <InputLabel
              elementRef={(element: any) =>
                (hookContractCreate.contractDataRef.current["name"] = element)
              }
              inputType="text"
              labelText="Contract Name *"
              placeholder="Name"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current["description"] =
                element)
              }
              inputType="text"
              labelText="Description *"
              placeholder="Description"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current["address"] =
                element)
              }
              inputType="text"
              labelText="Address *"
              placeholder="Address"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current["chainId"] =
                element)
              }
              inputType="text"
              labelText="Chain Id *"
              placeholder="Chain Id"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
                (hookContractCreate.contractDataRef.current["slug"] = element)
              }
              inputType="text"
              labelText="Slug *"
              placeholder="Slug"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current[
                "interested_methods"
              ] = element)
              }
              inputType="text"
              labelText="Interested Methods *"
              placeholder="Interested Methods"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current[
                "interested_events"
              ] = element)
              }
              inputType="text"
              labelText="Interested Events *"
              placeholder="Interested Events"
              marginTop="sm"
            />
            <InputLabel
              elementRef={(element: any) =>
              (hookContractCreate.contractDataRef.current[
                "read_abi_from"
              ] = element)
              }
              inputType="text"
              labelText="Read ABI From"
              placeholder="Read ABI From"
              marginTop="sm"
            />
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreateContractModal;
