import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import Loader from "@/_ui/loader/Loader";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import {
  deploytoLightHouse,
  displayImage,
} from "@/helpers/storage/lightHouseStorage";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Divider, Heading, Image, Text, useColorMode } from "@chakra-ui/react";

type Props = {
  modal: any;
  hookContractCreate: any;
  hookContract?: any;
  isEdit: boolean;
};

const ContractCreateEditModal = ({
  modal,
  hookContractCreate,
  hookContract,
  isEdit,
}: Props) => {

  const { colorMode } = useColorMode()

  return (
    <ModalWindow
      event={modal}
      size="2xl"
      header={
        <FlexRow width="100%" hrAlign="space-between">
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} className="mb-0">
            {isEdit ? "Edit Contract" : "Create Contract"}
          </Text>
          <Image
            src={GlobalIcons["icon-close"]}
            onClick={() => {
              hookContractCreate.setClear();
              modal.onClose();
            }}
            alt=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
              width: "fit-content",
              height: "fit-content",
              background: `${colorMode == "light" ? "" : style.icon.bg.default}`,
              borderRadius: `${style.icon.borderRadius}`,
              boxShadow: `${style.icon.shadow.default}`,
              marginLeft: `${style.margin[style?.marginLeft]}`,
              marginRight: `${style.margin[style?.marginRight]}`,
              marginBottom: `${style.margin[style?.marginBottom]}`,
              marginTop: `${style.margin[style?.marginTop]}`,
            }}
          />
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

            {hookContractCreate.formStep > 1 &&
              hookContractCreate.formStep != 4 && (
                <ButtonNative
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
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
                onClick={
                  isEdit
                    ? hookContractCreate.nextFormEditStep
                    : hookContractCreate.nextFormStep
                }
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
                  if (isEdit) {
                    if (hookContract.contractDetails._id) {
                      await hookContractCreate.editContract(
                        hookContract.contractDetails?._id
                      );
                    }
                  } else {
                    await hookContractCreate.publishContract();
                  }
                }}
              >
                {isEdit ? "Save" : "Create"}
              </ButtonNative>
            )}

            {hookContractCreate.formStep == 4 && (
              <ButtonNative
              variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                marginTop={style.margin["lg"]}
                onClick={() => {
                  hookContractCreate.setClear();
                  modal.onClose();
                }}
              >
                Close
              </ButtonNative>
            )}
            {hookContractCreate.formStep == 4 && (
              <ButtonNative
                variant="state_brand"
                marginTop={style.margin["lg"]}
                onClick={hookContractCreate.lastStep}
              >
                Preview
              </ButtonNative>
            )}
          </Box>
        </FlexRow>
      }
    >
      {isEdit &&
        (hookContract.isLoading || hookContract.contractDetails == undefined) ? (
        <FlexRow height="18rem">
          <Loader size="lg" />
        </FlexRow>
      ) : (
        <FlexColumn
          width="100%"
          hrAlign="space-between"
          height="100%"
          padding={style.padding["sm"]}
        >
          <FlexColumn hrAlign="space-between" height="35%">
            {hookContractCreate.formStep != 4 && (
              <>
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
                          color={colorMode == "light" ? "#3d3d3d" : ""}
                          rounded="full"
                          style={{
                            border: `${hookContractCreate.formStep == 1
                              ? style.card.border.meta
                              : style.card.border.default
                              }`,
                            paddingLeft: `${style.padding.xxs}`,
                            paddingRight: `${style.padding.xxs}`,
                            color: `${hookContractCreate.formStep == 1
                              ? ""
                              : style.color.disabled
                              }`,
                            backgroundColor: `${hookContractCreate.formStep == 3 ? "" : colorMode == "light" ? "" : "#18203A"}`,
                          }}
                        >
                          1
                        </Text>
                      )}
                    </Box>
                    <Text
                      color={colorMode == "light" ? "#3d3d3d" : ""}
                      style={{
                        color: `${hookContractCreate.formStep == 1
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
                        color={colorMode == "light" ? "#3d3d3d" : ""}
                        rounded="full"
                        style={{
                          border: `${hookContractCreate.formStep == 2
                            ? style.card.border.meta
                            : style.card.border.default
                            }`,
                          paddingLeft: `${style.padding.xxs}`,
                          paddingRight: `${style.padding.xxs}`,
                          color: `${hookContractCreate.formStep == 2
                            ? ""
                            : style.color.disabled
                            }`,
                          backgroundColor: `${hookContractCreate.formStep == 3 ? "" : colorMode == "light" ? "" : "#18203A"}`,
                        }}
                      >
                        2
                      </Text>
                    )}
                    <Text
                      color={colorMode == "light" ? "#3d3d3d" : ""}
                      style={{
                        color: `${hookContractCreate.formStep == 2
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
                        color={colorMode == "light" ? "#3d3d3d" : ""}
                        rounded="full"
                        style={{
                          border: `${hookContractCreate.formStep == 3
                            ? style.card.border.meta
                            : style.card.border.default
                            }`,
                          paddingLeft: `${style.padding.xxs}`,
                          paddingRight: `${style.padding.xxs}`,
                          color: `${hookContractCreate.formStep == 3
                            ? ""
                            : style.color.disabled
                            }`,
                          backgroundColor: `${hookContractCreate.formStep == 3 ? "" : colorMode == "light" ? "" : "#18203A"}`,
                        }}
                      >
                        3
                      </Text>
                    )}
                    <Text
                      color={colorMode == "light" ? "#3d3d3d" : ""}
                      style={{
                        color: `${hookContractCreate.formStep == 3
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
              </>
            )}
            {hookContractCreate.isLoading && (
              <FlexRow height="12rem">
                <Loader size="lg" />
              </FlexRow>
            )}
            {hookContractCreate.formStep == 1 &&
              !hookContractCreate.isLoading && (
                <>
                  <InputLabel
                    variant={colorMode == "light" ? "light" : "normal"}
                    value={hookContractCreate.$contractFormData.address}
                    inputType="text"
                    labelText="Contract Address *"
                    placeholder="0x0fea00feb84ad311Cc6E9d042f7753484D78f4F0"
                    onChange={(e: any) =>
                      hookContractCreate.$loadContractFormData({
                        address: e.target.value,
                      })
                    }
                  />
                  <InputSelect
                    value={
                      isEdit
                        ? Number(hookContractCreate.$contractFormData.chain_id)
                        : hookContractCreate.$contractFormData.chain_id
                    }
                    placeholder="Chain Id"
                    onChange={(e: any) =>
                      hookContractCreate.$loadContractFormData({
                        chain_id: e.target.value,
                      })
                    }
                    marginTop="sm"
                    labelText="Chain Id *"
                    options={[
                      {
                        value: 1,
                        title: "Ethereum",
                      },
                      {
                        value: 137,
                        title: "Polygon",
                      },
                      {
                        value: 10,
                        title: "Optimism",
                      },
                      {
                        value: 8453,
                        title: "Base",
                      },
                    ]}
                  />
                  <InputLabel
                    variant={colorMode == "light" ? "light" : "normal"}
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
            {hookContractCreate.formStep == 1.5 &&
              !hookContractCreate.isLoading && (
                <>
                  <InputLabel
                    // variant={colorMode == "light" ? "light" : "normal"}
                    value={hookContractCreate.contractAbiText}
                    // value=""
                    inputType="textArea"
                    labelText="Contract ABI"
                    placeholder=" To enable your verification , you can enter your ABI manually here "
                    onChange={async (e: any) => {
                      hookContractCreate.setContractAbiText(e.target.value);
                    }}
                  />
                </>
              )}
            {hookContractCreate.formStep == 2 &&
              !hookContractCreate.isLoading && (
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
                        variant={colorMode == "light" ? "light" : "normal"}
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
                        variant={colorMode == "light" ? "light" : "normal"}
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
                    variant={colorMode == "light" ? "light" : "normal"}
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
                        variant={colorMode == "light" ? "light" : "normal"}
                        inputType="dropFile"
                        fileDropMinHeight="80px"
                        inputLogoSize="lg"
                        labelText="Image *"
                        marginTop="sm"
                        onChange={async (e?: any) => {
                          if (e.target.files && e.target.files[0]) {
                            // const file = e.target.files[0];
                            // //console.log("Selected file:", file);
                            // const element = document.createElement("a");
                            // element.href = URL.createObjectURL(file);
                            const cid = await deploytoLightHouse(
                              e.target.files,
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
            {hookContractCreate.formStep == 3 &&
              !hookContractCreate.isLoading && (
                <>
                  <InputLabel
                    variant={colorMode == "light" ? "light" : "normal"}
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
                    variant={colorMode == "light" ? "light" : "normal"}
                    value={
                      hookContractCreate.$contractFormData.interested_events
                    }
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
            {hookContractCreate.formStep == 4 &&
              !hookContractCreate.isLoading && (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    paddingTop={style.padding.md}
                    paddingBottom={style.padding.md}
                  >
                    <IconBase slug="icon-congrats" size="4xl" />
                  </Box>
                  <Box>
                    <Text
                      color={colorMode == "light" ? "#282828" : ""}
                      style={{
                        fontWeight: `700`,
                        fontSize: `${style.font.h2}`,
                        marginBottom: "1rem",
                      }}
                    >
                      Voila!
                    </Text>
                  </Box>
                  <Box>
                    <Text color={colorMode == "light" ? "#282828" : "whiteAlpha.800"} textAlign="center" mb={0}>
                      You have successfully created your contact on Macha.
                    </Text>
                    <Text
                      color={colorMode == "light" ? "#282828" : "whiteAlpha.800"}
                      textAlign="center"
                      marginBottom={style.margin.lg}
                    >
                      Wait for approval from our side and your contract will be
                      published.
                    </Text>
                  </Box>
                </Box>
              )}
          </FlexColumn>
        </FlexColumn>
      )}
    </ModalWindow>
  );
};

export default ContractCreateEditModal;
