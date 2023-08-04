import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import IconBase from "@/_ui/icons/IconsBase";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import {
  deploytoLightHouse,
  displayImage,
} from "@/helpers/storage/lightHouseStorage";
import { style } from "@/styles/StyledConstants";
import { Box, Divider, Heading, Image, Text } from "@chakra-ui/react";

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
                    <IconBase size="xl" slug="icon-blue-tick" />
                  ) : (
                    <Text
                      rounded="full"
                      style={{
                        border: `${
                          hookContractCreate.formStep == 1
                            ? style.card.border.meta
                            : style.card.border.default
                        }`,
                        paddingLeft: `${style.padding.xxs}`,
                        paddingRight: `${style.padding.xxs}`,
                        color: `${
                          hookContractCreate.formStep == 1
                            ? ""
                            : style.color.disabled
                        }`,
                        backgroundColor: `${
                          hookContractCreate.formStep == 1 ? "" : "#18203A"
                        }`,
                      }}
                    >
                      1
                    </Text>
                  )}
                </Box>
                <Text
                  style={{
                    color: `${
                      hookContractCreate.formStep == 1
                        ? ""
                        : style.color.disabled
                    }`,
                  }}
                >
                  First
                </Text>
              </Box>
              <Divider
                marginX="8px"
                border={
                  hookContractCreate.formStep > 1
                    ? style.card.border.meta
                    : style.card.border.disabled
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
                  <IconBase size="xl" slug="icon-blue-tick" />
                ) : (
                  <Text
                    rounded="full"
                    style={{
                      border: `${
                        hookContractCreate.formStep == 2
                          ? style.card.border.meta
                          : style.card.border.default
                      }`,
                      paddingLeft: `${style.padding.xxs}`,
                      paddingRight: `${style.padding.xxs}`,
                      color: `${
                        hookContractCreate.formStep == 2
                          ? ""
                          : style.color.disabled
                      }`,
                      backgroundColor: `${
                        hookContractCreate.formStep == 2 ? "" : "#18203A"
                      }`,
                    }}
                  >
                    2
                  </Text>
                )}
                <Text
                  style={{
                    color: `${
                      hookContractCreate.formStep == 2
                        ? ""
                        : style.color.disabled
                    }`,
                  }}
                >
                  Second
                </Text>
              </Box>
              <Divider
                marginX="8px"
                border={
                  hookContractCreate.formStep > 2
                    ? style.card.border.meta
                    : style.card.border.disabled
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
                  <IconBase size="xl" slug="icon-blue-tick" />
                ) : (
                  <Text
                    rounded="full"
                    style={{
                      border: `${
                        hookContractCreate.formStep == 3
                          ? style.card.border.meta
                          : style.card.border.default
                      }`,
                      paddingLeft: `${style.padding.xxs}`,
                      paddingRight: `${style.padding.xxs}`,
                      color: `${
                        hookContractCreate.formStep == 3
                          ? ""
                          : style.color.disabled
                      }`,
                      backgroundColor: `${
                        hookContractCreate.formStep == 3 ? "" : "#18203A"
                      }`,
                    }}
                  >
                    3
                  </Text>
                )}
                <Text
                  style={{
                    color: `${
                      hookContractCreate.formStep == 3
                        ? ""
                        : style.color.disabled
                    }`,
                  }}
                >
                  Third
                </Text>
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
            >
              All * marked fields are required
            </Text>
            {hookContractCreate.formStep == 1 && (
              <>
                <InputLabel
                  value={hookContractCreate.$contractFormData.address}
                  inputType="text"
                  labelText="Address *"
                  placeholder="0x0fea00feb84ad311Cc6E9d042f7753484D78f4F0"
                  onChange={(e: any) =>
                    hookContractCreate.$loadContractFormData({
                      address: e.target.value,
                    })
                  }
                />
                {/* <InputSelect value={hookContractCreate.$contractFormData.chain_id} placeholder="Chain Id" 
                defaultValue={1} onChange={(e: any) => hookContractCreate.$loadContractFormData({ chain_id: e.target.value })}
                marginTop="sm" labelText="Chain Id *" options={[
                  {
                    value: 1,
                    title: "Ethereum"
                  },
                  {
                    value: 137,
                    title: "Polygon"
                  }
                ]}
              /> */}
                <InputLabel
                  value={hookContractCreate.$contractFormData.read_abi_from}
                  onChange={(e: any) =>
                    hookContractCreate.$loadContractFormData({
                      read_abi_from: e.target.value,
                    })
                  }
                  inputType="text"
                  labelText="Read ABI From"
                  placeholder="0x04dd2568fb6A1AA9D560b3F450a2bFBA29Cf32ca"
                  marginTop="sm"
                  tooltipLabel="If you are using proxy contracts or have the ABI of the above mentioned contract, please fill up this field for proper indexing."
                />
              </>
            )}
            {hookContractCreate.formStep == 2 && (
              <>
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box width="47%">
                    <InputLabel
                      value={hookContractCreate.$contractFormData.name}
                      onChange={(e: any) =>
                        hookContractCreate.$loadContractFormData({
                          name: e.target.value,
                        })
                      }
                      inputType="text"
                      labelText="Contract Name *"
                      placeholder="ENS"
                    />
                  </Box>
                  <Box width="47%">
                    <InputLabel
                      value={hookContractCreate.$contractFormData.slug}
                      onChange={(e: any) =>
                        hookContractCreate.$loadContractFormData({
                          slug: e.target.value,
                        })
                      }
                      inputType="text"
                      labelText="Slug *"
                      placeholder="ens_ethereum"
                    />
                  </Box>
                </Box>
                <InputLabel
                  value={hookContractCreate.$contractFormData.description}
                  onChange={(e: any) =>
                    hookContractCreate.$loadContractFormData({
                      description: e.target.value,
                    })
                  }
                  inputType="text"
                  labelText="Description *"
                  placeholder="Ethereum Name Service on ethereum chain..."
                  marginTop="sm"
                />
                {hookContractCreate.$contractFormData.image == "" ? (
                  <>
                    <InputLabel
                      inputType="dropFile"
                      fileDropMinHeight="80px"
                      inputLogoSize="lg"
                      labelText="Image *"
                      marginTop="sm"
                      onChange={async (e?: any) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          console.log("Selected file:", file);
                          const cid = await deploytoLightHouse(
                            e,
                            hookContractCreate.setLoadingCallback
                          );
                          hookContractCreate.$loadContractFormData({
                            image: displayImage(cid),
                          });
                        }
                      }}
                    />
                    {hookContractCreate.ipfsLoading != 0 && (
                      <Box
                        width="100%"
                        bgColor="#00040d"
                        height={1}
                        mt={style.margin.sm}
                      >
                        <Box
                          bgColor="#0f172e"
                          width={`${hookContractCreate.ipfsLoading}%`}
                          height={1}
                        ></Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box width="100%">
                    <Heading
                      as="h6"
                      size="sm"
                      marginTop={style.margin.md}
                      marginBottom={style.margin.xs}
                      bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                      bgClip="text"
                    >
                      Image
                    </Heading>
                    <Box
                      width="100%"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        height={100}
                        width="80%"
                        objectFit="contain"
                        src={hookContractCreate.$contractFormData.image}
                        alt=""
                      />
                    </Box>
                  </Box>
                )}
              </>
            )}
            {hookContractCreate.formStep == 3 && (
              <>
                <InputLabel
                  value={
                    hookContractCreate.$contractFormData.interested_methods
                  }
                  onChange={(e: any) =>
                    hookContractCreate.$loadContractFormData({
                      interested_methods: e.target.value,
                    })
                  }
                  inputType="text"
                  labelText="Interested Methods *"
                  placeholder="register, renew"
                  marginTop="sm"
                  tooltipLabel="You can mention more than one method(s) using comma seperated values."
                />
                <InputLabel
                  value={hookContractCreate.$contractFormData.interested_events}
                  onChange={(e: any) =>
                    hookContractCreate.$loadContractFormData({
                      interested_events: e.target.value,
                    })
                  }
                  inputType="text"
                  labelText="Interested Events *"
                  placeholder="deposit, withdraw"
                  marginTop="sm"
                  tooltipLabel="You can mention more than one event(s) using comma seperated values."
                />
              </>
            )}
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreateContractModal;
