import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import InputLabel from "@/_ui/input/InputLabel";
import Loader from "@/_ui/loader/Loader";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import {
  deploytoLightHouse,
  displayImage,
} from "@/helpers/storage/lightHouseStorage";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text, useColorMode, useToast } from "@chakra-ui/react";
import { fetchBalance } from "@wagmi/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  modal: any;
  hookPublisherCreate?: any;
};

const CreatePublisherModal = ({ modal, hookPublisherCreate }: Props) => {
  const hookMacha = useMacha();
  const toast = useToast();
  const $address = useAuthStore((state: any) => state.address);
  const [lowBalance, setLowBalance] = useState<boolean>(false);
  const router = useRouter();
  const { colorMode } = useColorMode()
  const checkBalance = async () => {
    try {
      const balance = await fetchBalance({
        address: $address,
      });
      if (parseInt(balance.formatted) <= 1) {
        setLowBalance(true);
      } else {
        setLowBalance(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if ($address) {
      checkBalance();
    }
  }, [$address]);

  return (
    <>
      <ModalWindow
        event={modal}
        size="2xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            {hookPublisherCreate.formStep == 3 && (
              <Box>
                <Text color={colorMode == "light" ? "#282828" : ""} className="mb-0">
                  Choose the type of publisher account{" "}
                </Text>
                {/* <Text
                  className="mb-0"
                  style={{
                    fontSize: `${style.font.h6}`,
                    fontWeight: `${style.fontWeight.medium}`,
                    marginTop: `${style.margin.xxs}`,
                  }}
                >
                  For Individual Plan is good when you have, Something like this
                  a text.
                </Text> */}
              </Box>
            )}
            {hookPublisherCreate.formStep == 4 &&
              hookPublisherCreate.publisherType == "Individual" && (
                <Box>
                  <Text color={colorMode == "light" ? "#282828" : ""} className="mb-0">Individual Publisher Account </Text>
                </Box>
              )}
            {hookPublisherCreate.formStep == 4 &&
              hookPublisherCreate.publisherType == "Organization" && (
                <Box>
                  <Text color={colorMode == "light" ? "#282828" : ""} className="mb-0">Organization Publisher Account </Text>
                </Box>
              )}
            {hookPublisherCreate.formStep != 3 &&
              hookPublisherCreate.formStep != 4 && (
                <Box>
                  <Text color={colorMode == "light" ? "#282828" : ""} className="mb-0">Create a Publisher Account</Text>
                </Box>
              )}
            {hookPublisherCreate.formStep != 5 &&
              hookPublisherCreate.formStep != 6 && (
                <Image
                  src={GlobalIcons["icon-close"]}
                  onClick={() => modal.onClose()}
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
              )}
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-end">
            {hookPublisherCreate.formStep == 6 && (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ButtonNative
                  variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                  height="2rem"
                  width="5.5rem"
                  marginTop={style.margin["lg"]}
                  disabled={hookPublisherCreate.isTransactionPending}
                  onClick={() => {
                    hookPublisherCreate.setClear();
                    modal.onClose();
                  }}
                >
                  Skip
                </ButtonNative>
                <ButtonNative
                  variant={"state_brand"}
                  height="2rem"
                  width="5.5rem"
                  marginTop={style.margin["lg"]}
                  onClick={async () => {
                    hookPublisherCreate.setClear();
                    await hookMacha.connectMachaPublisher();
                    modal.onClose();
                    router.push("/indexers");
                  }}
                >
                  Create
                </ButtonNative>
              </Box>
            )}
            {hookPublisherCreate.formStep != 6 && (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {hookPublisherCreate.formStep == 1 &&
                  (lowBalance ? <></> : <Box></Box>)}

                {hookPublisherCreate.formStep > 1 &&
                  hookPublisherCreate.formStep <= 4 && (
                    <ButtonNative
                      variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                      height="2rem"
                      width="5.5rem"
                      marginTop={style.margin["lg"]}
                      onClick={hookPublisherCreate.prevFormStep}
                    >
                      Back
                    </ButtonNative>
                  )}

                {hookPublisherCreate.formStep <= 3 &&
                  (lowBalance ? (
                    <>
                      <ButtonNative
                        variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                        height="2rem"
                        width="5.5rem"
                        marginTop={style.margin["lg"]}
                        onClick={() => modal.onClose()}
                      >
                        Close
                      </ButtonNative>

                      <Box>
                        <Text color={colorMode == "light" ? "#282828" : ""} width="100%" textAlign="center" mb={0}>
                          You do not have enough TFIL Balance
                        </Text>
                        <Text
                          fontSize={style.font.h7}
                          textAlign="center"
                          mb={0}
                          color={colorMode == "light" ? "#282828" : style.color["white.5"]}
                        >
                          If you do, please refresh the page and try again.
                        </Text>
                      </Box>

                      <ButtonNative
                        variant={colorMode == "light" ? "state_brand" : "state_default_hover"}
                        height="2rem"
                        width="7rem"
                        marginTop={style.margin["lg"]}
                        onClick={() => {
                          window.open(
                            "https://faucet.calibration.fildev.network/funds.html",
                            "_blank"
                          );
                        }}
                      >
                        Get TFIL
                      </ButtonNative>
                    </>
                  ) : (
                    <ButtonNative
                      variant="state_brand"
                      height="2rem"
                      width="5.5rem"
                      marginTop={style.margin["lg"]}
                      onClick={hookPublisherCreate.nextFormStep}
                      disabled={lowBalance}
                    >
                      Next
                    </ButtonNative>
                  ))}

                {/* {hookPublisherCreate.formStep == 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={hookPublisherCreate.nextFormStep}
                >
                  Next
                </ButtonNative>
              )} */}

                {hookPublisherCreate.formStep == 4 && (
                  <ButtonNative
                    variant="state_brand"
                    height="2rem"
                    width="5.5rem"
                    marginTop={style.margin["lg"]}
                    onClick={() => {
                      hookPublisherCreate.nextFormStep();
                    }}
                  >
                    Save
                  </ButtonNative>
                )}

                {hookPublisherCreate.formStep == 5 && (
                  <ButtonNative
                    variant={colorMode == "light" ? "state_light" : "state_default_hover"}
                    height="2rem"
                    width="5.5rem"
                    marginTop={style.margin["lg"]}
                    disabled={hookPublisherCreate.isTransactionPending}
                    onClick={() => {
                      hookPublisherCreate.setClear();
                      modal.onClose();
                    }}
                  >
                    Cancel
                  </ButtonNative>
                )}

                {hookPublisherCreate.formStep == 5 && (
                  <ButtonNative
                    variant="state_brand"
                    height="2rem"
                    width="5.5rem"
                    marginTop={style.margin["lg"]}
                    onClick={hookPublisherCreate.createPublisher}
                    disabled={
                      lowBalance || hookPublisherCreate.isTransactionPending
                    }
                  >
                    Confirm
                  </ButtonNative>
                )}
              </Box>
            )}
          </FlexRow>
        }
      >
        <FlexColumn width="100%" hrAlign="space-between" height="100%">
          {hookPublisherCreate.isTranactionPending && (
            <FlexColumn height="12rem">
              <Loader size="lg" />
              <Box marginTop={style.margin.lg}>
                <Text color={colorMode == "light" ? "#282828" : "whiteAlpha.800"} textAlign="center" mb={0} >
                  Please wait for the transaction to confirm.
                </Text>
                <Text
                  color={colorMode == "light" ? "#282828" : "whiteAlpha.800"}
                  textAlign="center"
                  marginBottom={style.margin.lg}
                >
                  This usually takes a few minutes.
                </Text>
              </Box>
            </FlexColumn>
          )}
          {hookPublisherCreate.isTransactionPending ? (
            <FlexColumn height="12rem">
              <Loader size="lg" />
              <Box marginTop={style.margin.lg}>
                <Text textAlign="center" mb={0} color={colorMode == "light" ? "#282828" : "whiteAlpha.800"}>
                  Please wait for the transaction to confirm.
                </Text>
                <Text
                  textAlign="center"
                  marginBottom={style.margin.lg}
                  color={colorMode == "light" ? "#282828" : "whiteAlpha.800"}
                >
                  This usually takes a few minutes.
                </Text>
              </Box>
            </FlexColumn>
          ) : (
            <Box width="100%">
              <FlexColumn hrAlign="space-between">
                {hookPublisherCreate.formStep == 1 && (
                  <>
                    <Box
                      paddingTop={style.padding.xxs}
                      paddingBottom={style.padding.xl}
                      width="100%"
                      height="100%"
                    >
                      <Text color={colorMode == "light" ? "#282828" : ""}>
                        As a publisher you will get access to the following on
                        Macha Studio
                      </Text>
                      <Image
                        src={colorMode == "light" ? "/assets/publisher-intro.svg" : "/assets/publisher-intro-dark.svg"}
                        alt="txn-icon"
                      />
                    </Box>
                  </>
                )}
                {hookPublisherCreate.formStep == 2 && (
                  <>
                    <Box
                      paddingTop={style.padding.xl}
                      paddingBottom={style.padding.xl}
                    >
                      <Image
                        src="/assets/icons/coloredIpfs.svg"
                        alt="txn-icon"
                        height="6rem"
                      />
                    </Box>
                    <Box>
                      <Text
                        color={colorMode == "light" ? "#282828" : ""}
                        style={{
                          fontWeight: `${style.fontWeight.dark}`,
                          fontSize: `${style.font.h4}`,
                          textAlign: "center",
                        }}
                      >
                        Trust in Every Byte
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        textAlign="center"
                        style={{ color: "grey" }}
                        marginBottom={0}
                        color={colorMode == "light" ? "#282828" : ""}
                      >
                        Your data is backed up on IPFS, so its always
                        retainable.
                      </Text>
                      <Text
                        textAlign="center"
                        style={{ color: `${style.color["white.7"]}` }}
                        color={colorMode == "light" ? "#282828" : ""}
                      >
                        Sign in with your wallet and start the journey of
                        indexing through Macha
                      </Text>
                    </Box>
                  </>
                )}
                {/* {hookPublisherCreate.formStep == 3 && (
                  <>
                    <Box
                      paddingTop={style.padding.xl}
                      paddingBottom={style.padding.xl}
                    >
                      <Image
                        src="https://ik.imagekit.io/macha/studio%20logo/fvm.svg?updatedAt=1690788568643"
                        alt="txn-icon"
                        height="6rem"
                      />
                    </Box>
                    <Box>
                      <Text
                        style={{
                          fontWeight: `${style.fontWeight.dark}`,
                          fontSize: `${style.font.h4}`,
                        }}
                      >
                        Take the Leap into Decentralization
                      </Text>
                    </Box>
                    <Box>
                      <Text textAlign="center" style={{ color: "grey" }}>
                        Sign the transaction with your wallet, and let&#39;s
                        embark on the journey of indexing your contracts through
                        Macha
                      </Text>
                    </Box>
                  </>
                )} */}
                {hookPublisherCreate.formStep == 3 && (
                  <>
                    <Box
                      paddingBottom={style.padding.md}
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Box
                        style={{
                          borderRadius: `${style.card.borderRadius.default}`,
                          padding: `${style.padding.md}`,
                          display: "flex",
                          alignItems: "center",
                          width: "48%",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background: `${colorMode == "light" ? "" : "#000a24"}`,
                          border: `${colorMode == "light" ? hookPublisherCreate.publisherType == "Individual" ? "1.5px solid #197cec" : "1px solid #e2e2e2" : hookPublisherCreate.publisherType == "Individual" ? "1.5px solid #197cec" : style.card.border.publisher}`,
                        }}
                        onClick={() =>
                          hookPublisherCreate.selectPublisher("Individual")
                        }
                        _hover={{
                          transform: "scale(1.01,1.01)",
                          border: "1px solid #197cec !important",
                          cursor: "pointer",
                        }}
                      >
                        <Box height={"20%"}>
                          <IconBase
                            // style={{ marginRight: "sm" }}
                            size="2xl"
                            slug="icon-dark-user"
                          />
                        </Box>
                        <Box
                          height="80%"
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"flex-end"}
                          alignItems={"center"}
                        >
                          <Text
                            color={colorMode == "light" ? "#282828" : ""}
                            textAlign={"center"}
                            marginBottom="0"
                            style={{
                              fontWeight: `${style.fontWeight.dark}`,
                              fontSize: `${style.font.h4}`,
                            }}
                          >
                            Individual
                          </Text>
                          <Text
                            color={colorMode == "light" ? "#282828" : ""}
                            marginBottom={0}
                            textAlign={"center"}
                            height={"4rem"}
                          >
                            Register as an individual to publish your contract
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        _hover={{
                          transform: "scale(1.01,1.01)",
                          border: "1px solid #197cec !important",
                          cursor: "pointer",
                        }}
                        style={{
                          width: "48%",
                          background: `${colorMode == "light" ? "" : "#000a24"}`,
                          height: "100%",
                          border: `${colorMode == "light" ? hookPublisherCreate.publisherType == "Organization" ? "1.5px solid #197cec" : "1px solid #e2e2e2" : hookPublisherCreate.publisherType == "Organization" ? "1.5px solid #197cec" : style.card.border.publisher}`,
                          borderRadius: `${style.card.borderRadius.default}`,
                          padding: `${style.padding.md}`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "space-between",
                          justifyContent: "space-between",
                          // marginTop: `${style.margin.sm}`,
                        }}
                        onClick={() =>
                          hookPublisherCreate.selectPublisher("Organization")
                        }
                      >
                        <Box
                          height={"20%"}
                          display={"flex"}
                          justifyContent={"center"}
                          marginBottom={"1rem"}
                        >
                          <IconBase
                            // style={{ marginRight: "sm" }}
                            size="2xl"
                            slug="icon-dark-enterprise"
                          />
                        </Box>
                        <Box
                          height="80%"
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"flex-end"}
                        >
                          <Text
                            color={colorMode == "light" ? "#282828" : ""}
                            marginBottom="0"
                            textAlign={"center"}
                            style={{
                              fontWeight: `${style.fontWeight.dark}`,
                              fontSize: `${style.font.h4}`,
                            }}
                          >
                            Organization
                          </Text>
                          <Text
                            color={colorMode == "light" ? "#282828" : ""}
                            marginBottom={"0px"}
                            textAlign={"center"}
                            height={"4rem"}
                          >
                            Register as an organization to publish contracts for
                            your company.
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
                {hookPublisherCreate.formStep == 4 &&
                  hookPublisherCreate.publisherType == "Individual" && (
                    <Box width="100%">
                      <Text>All * marked fields are required</Text>
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$publisherFormData.name}
                        inputType="text"
                        labelText="Name *"
                        placeholder="Enter your name"
                        onChange={(e: any) =>
                          hookPublisherCreate.$loadPublisherFormData({
                            name: e.target.value,
                          })
                        }
                        marginTop="sm"
                      />
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$address}
                        inputType="text"
                        labelText="Wallet Address *"
                        placeholder="Wallet Address"
                        defaultValue={hookPublisherCreate.$address}
                        marginTop="sm"
                        disabled
                      />
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$publisherFormData.email}
                        onChange={(e: any) =>
                          hookPublisherCreate.$loadPublisherFormData({
                            email: e.target.value,
                          })
                        }
                        inputType="text"
                        labelText="Email *"
                        placeholder="Enter your email Address"
                        marginTop="sm"
                      />
                    </Box>
                  )}
                {hookPublisherCreate.formStep == 4 &&
                  hookPublisherCreate.publisherType == "Organization" && (
                    <Box width="100%">
                      <Text color={colorMode == "light" ? "#282828" : ""}>All * marked fields are required</Text>
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$publisherFormData.address}
                        inputType="text"
                        labelText="Wallet Address *"
                        placeholder="Wallet Address"
                        defaultValue={hookPublisherCreate.$address}
                        marginTop="sm"
                        disabled
                      />
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$publisherFormData.name}
                        onChange={(e: any) =>
                          hookPublisherCreate.$loadPublisherFormData({
                            name: e.target.value,
                          })
                        }
                        inputType="text"
                        labelText="Organization Name *"
                        placeholder="Enter your organization name"
                        marginTop="sm"
                      />
                      {hookPublisherCreate.$publisherFormData.logo == "" ? (
                        <>
                          <InputLabel
                            variant={colorMode == "light" ? "light" : "normal"}
                            inputType="file"
                            fileDropMinHeight="80px"
                            inputLogoSize="lg"
                            labelText="Organization Logo*"
                            marginTop="sm"
                            onChange={async (e?: any) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                console.log("Selected file:", file);
                                const cid = await deploytoLightHouse(
                                  e,
                                  hookPublisherCreate.setLoadingCallback
                                );
                                hookPublisherCreate.$loadPublisherFormData({
                                  logo: displayImage(cid),
                                });
                              }
                            }}
                          />
                          {hookPublisherCreate.ipfsLoading != 0 && (
                            <Box
                              width="100%"
                              bgColor="#00040d"
                              height={1}
                              mt={style.margin.sm}
                            >
                              <Box
                                bgColor="#0f172e"
                                width={`${hookPublisherCreate.ipfsLoading}%`}
                                height={1}
                              ></Box>
                            </Box>
                          )}
                        </>
                      ) : (
                        <Box>
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
                            Organization Logo
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
                              alt="img"
                              height={100}
                              width="80%"
                              objectFit="contain"
                              src={hookPublisherCreate.$publisherFormData.logo}
                            />
                          </Box>
                        </Box>
                      )}
                      <InputLabel
                        variant={colorMode == "light" ? "light" : "normal"}
                        value={hookPublisherCreate.$publisherFormData.website}
                        onChange={(e: any) =>
                          hookPublisherCreate.$loadPublisherFormData({
                            website: e.target.value,
                          })
                        }
                        inputType="text"
                        labelText="Organization Website URL *"
                        placeholder="Enter your organization website link"
                        marginTop="sm"
                      />
                    </Box>
                  )}
                {hookPublisherCreate.formStep == 5 &&
                  (lowBalance ? (
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                      }}
                      backgroundSize="100% 100%"
                    >
                      <Box>
                        <Text
                          color={colorMode == "light" ? "#282828" : ""}
                          style={{
                            fontWeight: `${style.fontWeight.dark}`,
                            fontSize: `${style.font.h4}`,
                          }}
                        >
                          Insufficient Balance in Wallet
                        </Text>
                      </Box>
                      <Box>
                        <Text color={colorMode == "light" ? "#282828" : ""} textAlign="center" style={{}}>
                          Fill in your wallet and try again
                        </Text>
                        <Text color={colorMode == "light" ? "#282828" : ""} textAlign="center" style={{}}>
                          Please visit:{" "}
                          <Link
                            color={colorMode == "light" ? "#282828" : ""}
                            target="_blank"
                            href="https://faucet.calibration.fildev.network/funds.html"
                            style={{ textDecoration: "underline" }}
                          >
                            https://faucet.calibration.fildev.network/funds.html
                          </Link>
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      backgroundImage={"/assets/Almost-there-bg.svg"}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                      }}
                      backgroundSize="100% 100%"
                      borderRadius="20px"
                    >
                      <Box
                        paddingTop={style.padding.xl}
                        paddingBottom={style.padding.xl}
                      >
                        <IconBase slug={colorMode == "light" ? "icon-almost-there-light" : "icon-almost-there"} size="3xl" />
                      </Box>
                      <Box>
                        <Text
                          color={colorMode == "light" ? "#282828" : ""}
                          style={{
                            fontWeight: `${style.fontWeight.dark}`,
                            fontSize: `${style.font.h4}`,
                          }}
                        >
                          Almost There
                        </Text>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        <Text color={colorMode == "light" ? "#282828" : ""} textAlign="center" style={{ width: "80%" }}>
                          Cheers to the successful publication on IPFS - a leap
                          into a decentralized and innovative future!
                        </Text>
                      </Box>
                    </Box>
                  ))}
                {hookPublisherCreate.formStep == 6 && (
                  <Box
                    backgroundImage="/assets/Almost-there-bg.svg"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                    backgroundSize="100% 100%"
                    borderRadius="20px"
                  >
                    <Box
                      paddingTop={style.padding.xl}
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
                        Congrats!
                      </Text>
                    </Box>
                    <Box>
                      <Text color={colorMode == "light" ? "#282828" : "whiteAlpha.800"} textAlign="center" mb={0}>
                        Your publisher account has been created successfully.
                      </Text>
                      <Text
                        textAlign="center"
                        marginBottom={style.margin.lg}
                        color={colorMode == "light" ? "#282828" : "whiteAlpha.800"}
                      >
                        Now you can create contracts on Macha.
                      </Text>
                    </Box>
                  </Box>
                )}
              </FlexColumn>
            </Box>
          )}
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreatePublisherModal;
