import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import IconBase from "@/_ui/icons/IconsBase";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import { style } from "@/styles/StyledConstants";
import { Box, Divider, Text } from "@chakra-ui/react";

type Props = {
  modal: any;
  hookContractCreate?: any;
};

const CreateContractModal = ({ modal, hookContractCreate }: Props) => {
  return (
    <>
      <ModalWindow
        event={modal}
        size="2xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Contract</Text>
            <IconImage slug="icon-close" onClick={() => modal.onClose()} />
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-end">
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {hookContractCreate.formStep == 1 && <Box></Box>}

              {hookContractCreate.formStep > 1 && (
                <ButtonNative
                  variant="state_default_hover"
                  marginTop={style.margin["lg"]}
                  onClick={hookContractCreate.prevFormStep}
                >
                  Back
                </ButtonNative>
              )}

              {hookContractCreate.formStep < 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={hookContractCreate.nextFormStep}
                >
                  Next
                </ButtonNative>
              )}

              {hookContractCreate.formStep == 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={async (e: any) => {
                    e.preventDefault();
                    await hookContractCreate.publishContract();
                  }}
                >
                  Create
                </ButtonNative>
              )}
            </Box>
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
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  {hookContractCreate.formStep > 1 ? (
                    <IconBase size="xl" slug="icon-success" />
                  ) : (
                    <Text
                      rounded="full"
                      style={{
                        border: `${style.card.border.meta}`,
                        paddingLeft: `${style.padding.xxs}`,
                        paddingRight: `${style.padding.xxs}`,
                      }}
                    >
                      1
                    </Text>
                  )}
                </Box>
                <Text>First</Text>
              </Box>
              <Divider
                marginX="8px"
                border={
                  hookContractCreate.formStep > 1 && style.card.border.meta
                }
              />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {hookContractCreate.formStep > 2 ? (
                  <IconBase size="xl" slug="icon-success" />
                ) : (
                  <Text
                    rounded="full"
                    style={{
                      border: `${style.card.border.meta}`,
                      paddingLeft: `${style.padding.xxs}`,
                      paddingRight: `${style.padding.xxs}`,
                    }}
                  >
                    2
                  </Text>
                )}
                <Text>Second</Text>
              </Box>
              <Divider
                marginX="8px"
                border={
                  hookContractCreate.formStep > 2 && style.card.border.meta
                }
              />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {hookContractCreate.formStep > 3 ? (
                  <IconBase size="xl" slug="icon-success" />
                ) : (
                  <Text
                    rounded="full"
                    style={{
                      border: `${style.card.border.meta}`,
                      paddingLeft: `${style.padding.xxs}`,
                      paddingRight: `${style.padding.xxs}`,
                    }}
                  >
                    3
                  </Text>
                )}
                <Text>Third</Text>
              </Box>
            </Box>

            <Text
              fontSize={style.font.h7}
              textAlign="left"
              width="100%"
              bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
              bgClip="text"
            >All * marked fields are required</Text>
            {hookContractCreate.formStep == 1 && <>
              <InputLabel
                value={hookContractCreate.$contractFormData.address}
                inputType="text"
                labelText="Address *"
                placeholder="Address"
                onChange={(e: any) => hookContractCreate.$loadContractFormData({ address: e.target.value })}
              />
              <InputLabel
                value={hookContractCreate.$contractFormData.chain_id}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({ chain_id: e.target.value })}
                inputType="text"
                labelText="Chain Id *"
                placeholder="Chain Id"
                marginTop="sm"
              />
              <InputLabel
                value={hookContractCreate.$contractFormData.read_abi_from}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({ read_abi_from: e.target.value })}
                inputType="text"
                labelText="Read ABI From"
                placeholder="Read ABI From"
                marginTop="sm"
              />
            </>}
            {hookContractCreate.formStep == 2 && <>
              <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Box width="47%">
                  <InputLabel
                    value={hookContractCreate.$contractFormData.name}
                    onChange={(e: any) => hookContractCreate.$loadContractFormData({ name: e.target.value })}
                    inputType="text"
                    labelText="Contract Name *"
                    placeholder="Name"
                  />
                </Box>
                <Box width="47%">
                  <InputLabel
                    value={hookContractCreate.$contractFormData.slug}
                    onChange={(e: any) => hookContractCreate.$loadContractFormData({ slug: e.target.value })}
                    inputType="text"
                    labelText="Slug *"
                    placeholder="Slug"
                  />
                </Box>
              </Box>
              <InputLabel
                value={hookContractCreate.$contractFormData.description}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({description: e.target.value})}
                inputType="text"
                labelText="Description *"
                placeholder="Description"
                marginTop="sm"
              />
              <InputLabel
                value={hookContractCreate.$contractFormData.image}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({image: e.target.value})}
                inputType="text"
                labelText="Image *"
                placeholder="Image"
                marginTop="sm"
              />
            </>}
            {hookContractCreate.formStep == 3 && <>
              <InputLabel
                value={hookContractCreate.$contractFormData.interested_methods}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({interested_methods: e.target.value})}
                inputType="text"
                labelText="Interested Methods *"
                placeholder="Interested Methods"
                marginTop="sm"
              />
              <InputLabel
                value={hookContractCreate.$contractFormData.interested_events}
                onChange={(e: any) => hookContractCreate.$loadContractFormData({interested_events: e.target.value})}
                inputType="text"
                labelText="Interested Events *"
                placeholder="Interested Events"
                marginTop="sm"
              />
            </>}
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreateContractModal;
