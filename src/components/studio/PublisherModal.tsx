import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
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
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { fetchBalance } from "@wagmi/core";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import Link from "next/link";

type Props = {
  modal: any;
  hookPublisherCreate?: any;
};

const CreatePublisherModal = ({ modal, hookPublisherCreate }: Props) => {
  const hookMacha = useMacha();
  const toast = useToast();
  const $address = useAuthStore((state: any) => state.address);
  const [lowBalance, setLowBalance] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const checkBalance = async () => {
    const balance = await fetchBalance({
      address: $address,
    });
    if (parseInt(balance.formatted) <= 1) {
      setLowBalance(true);
    } else {
      setLowBalance(false);
    }
  };

  return (
    <>
      <ModalWindow
        event={modal}
        size="2xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            {hookPublisherCreate.formStep == 4 && (
              <Box>
                <Text className="mb-0">
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
            {hookPublisherCreate.formStep == 5 &&
              hookPublisherCreate.publisherType == "Individual" && (
                <Box>
                  <Text className="mb-0">Individual Publisher Account </Text>
                </Box>
              )}
            {hookPublisherCreate.formStep == 5 &&
              hookPublisherCreate.publisherType == "Organization" && (
                <Box>
                  <Text className="mb-0">Organization Publisher Account </Text>
                </Box>
              )}
            {hookPublisherCreate.formStep != 4 &&
              hookPublisherCreate.formStep != 5 && (
                <Box>
                  <Text className="mb-0">Become a Publisher </Text>
                </Box>
              )}
            {hookPublisherCreate.formStep != 6 &&
              hookPublisherCreate.formStep != 7 && (
                <IconImage slug="icon-close" onClick={() => modal.onClose()} />
              )}
          </FlexRow>
        }
        footer={
          <FlexRow hrAlign="flex-end">
            {hookPublisherCreate.formStep == 7 && (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ButtonNative
                  variant="state_brand"
                  height="2rem"
                  width="5rem"
                  marginTop={style.margin["lg"]}
                  onClick={async () => {
                    hookPublisherCreate.setClear();
                    modal.onClose();
                    await hookMacha.connectMachaPublisher();
                  }}
                >
                  Okay
                </ButtonNative>
              </Box>
            )}
            {hookPublisherCreate.formStep != 7 && (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {hookPublisherCreate.formStep == 1 && (lowBalance ? (
                    <>
                    
                    </>
                  ) : (
                    <Box></Box>
                  ))}

                {hookPublisherCreate.formStep > 1 &&
                  hookPublisherCreate.formStep <= 5 && (
                    <ButtonNative
                      variant="state_default_hover"
                      height="2rem"
                      width="5rem"
                      marginTop={style.margin["lg"]}
                      onClick={hookPublisherCreate.prevFormStep}
                    >
                      Back
                    </ButtonNative>
                  )}

                {hookPublisherCreate.formStep <= 4 &&
                  (lowBalance ? (
                    <>
                    <Text width="100%" textAlign="center">You do not have enough TFIL Balance</Text>
                    </>
                  ) : (
                    <ButtonNative
                      variant="state_brand"
                      height="2rem"
                      width="5rem"
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

                {hookPublisherCreate.formStep == 5 && (
                  <ButtonNative
                    variant="state_brand"
                    height="2rem"
                    width="5rem"
                    marginTop={style.margin["lg"]}
                    onClick={() => {
                      hookPublisherCreate.nextFormStep();
                    }}
                  >
                    Save
                  </ButtonNative>
                )}

                {hookPublisherCreate.formStep == 6 && (
                  <ButtonNative
                    variant="state_default_hover"
                    height="2rem"
                    width="5rem"
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

                {hookPublisherCreate.formStep == 6 && (
                  <ButtonNative
                    variant="state_brand"
                    height="2rem"
                    width="5rem"
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
            <FlexRow height="100px">
              <Loader size="lg" />
            </FlexRow>
          )}
          {hookPublisherCreate.isTransactionPending ? (
            <FlexRow height="100px">
              <Loader size="lg" />
            </FlexRow>
          ) : (
            <Box width="100%">
              <FlexColumn hrAlign="space-between" height="55%">
                {hookPublisherCreate.formStep == 1 && (
                  <>
                    <Box
                      paddingTop={style.padding.xl}
                      paddingBottom={style.padding.xl}
                    >
                      <Image
                        src="https://ik.imagekit.io/macha/icons/svg/Dark_icons/dark-Txn%20Hash.svg?updatedAt=1690622510375"
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
                        Welcome to Publisher
                      </Text>
                    </Box>
                    <Box>
                      <Text textAlign="center" style={{ color: "grey" }}>
                        Experience On-Chain Transactions with This Flow!
                      </Text>
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
                        src="https://ik.imagekit.io/macha/studio%20logo/coloredIpfs.svg?updatedAt=1690524148908"
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
                        Trust in Every Byte
                      </Text>
                    </Box>
                    <Box>
                      <Text textAlign="center" style={{ color: "grey" }}>
                        Your data is backed up on IPFS, so its always retainable
                      </Text>
                    </Box>
                  </>
                )}
                {hookPublisherCreate.formStep == 3 && (
                  <>
                    <Box
                      paddingTop={style.padding.xl}
                      paddingBottom={style.padding.xl}
                    >
                      <Image
                        src="https://ik.imagekit.io/macha/studio%20logo/coloredFilecoin.svg?updatedAt=1690524145269"
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
                        Register to become a publisher to upload your contract
                        for indexing
                      </Text>
                    </Box>
                  </>
                )}
                {hookPublisherCreate.formStep == 4 && (
                  <>
                    <Box paddingBottom={style.padding.md}>
                      <Box>
                        {/* <Text
                      textAlign="left"
                      style={{
                        fontWeight: `${style.fontWeight.dark}`,
                        fontSize: `${style.font.h4}`,
                      }}
                    >
                      Choose the type of publisher account
                    </Text> */}
                        {/* <Text textAlign="left">For individual plan is good</Text> */}
                      </Box>
                      <Box
                        style={{
                          borderRadius: `${style.card.borderRadius.default}`,
                          padding: `${style.padding.md}`,
                          display: "flex",
                          alignItems: "center",
                          border: `${
                            hookPublisherCreate.publisherType == "Individual"
                              ? "1px solid #197cec"
                              : style.card.border.contract
                          }`,
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
                        <IconBase
                          style={{ marginRight: "sm" }}
                          size="2xl"
                          slug="icon-dark-user"
                        />
                        <Box>
                          <Text
                            style={{
                              fontWeight: `${style.fontWeight.dark}`,
                              fontSize: `${style.font.h4}`,
                            }}
                          >
                            Individual
                          </Text>
                          <Text>
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
                          border: `${
                            hookPublisherCreate.publisherType == "Organization"
                              ? "1px solid #197cec"
                              : style.card.border.contract
                          }`,
                          borderRadius: `${style.card.borderRadius.default}`,
                          padding: `${style.padding.md}`,
                          display: "flex",
                          alignItems: "center",
                          marginTop: `${style.margin.sm}`,
                        }}
                        onClick={() =>
                          hookPublisherCreate.selectPublisher("Organization")
                        }
                      >
                        <IconBase
                          style={{ marginRight: "sm" }}
                          size="2xl"
                          slug="icon-dark-enterprise"
                        />
                        <Box>
                          <Text
                            style={{
                              fontWeight: `${style.fontWeight.dark}`,
                              fontSize: `${style.font.h4}`,
                            }}
                          >
                            Organization
                          </Text>
                          <Text>
                            Register as an organization to publish contracts for
                            your company.
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
                {hookPublisherCreate.formStep == 5 &&
                  hookPublisherCreate.publisherType == "Individual" && (
                    <Box width="100%">
                      <Text>All * marked fields are required</Text>
                      <InputLabel
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
                        value={hookPublisherCreate.$address}
                        inputType="text"
                        labelText="Wallet Address *"
                        placeholder="Wallet Address"
                        defaultValue={hookPublisherCreate.$address}
                        marginTop="sm"
                        disabled
                      />
                      <InputLabel
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
                {hookPublisherCreate.formStep == 5 &&
                  hookPublisherCreate.publisherType == "Organization" && (
                    <Box width="100%">
                      <Text>All * marked fields are required</Text>
                      <InputLabel
                        value={hookPublisherCreate.$publisherFormData.address}
                        inputType="text"
                        labelText="Wallet Address *"
                        placeholder="Wallet Address"
                        defaultValue={hookPublisherCreate.$address}
                        marginTop="sm"
                        disabled
                      />
                      <InputLabel
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
                        <InputLabel
                          inputType="file"
                          fileDropMinHeight="80px"
                          inputLogoSize="lg"
                          labelText="Organization Logo*"
                          marginTop="sm"
                          onChange={async (e?: any) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              console.log("Selected file:", file);
                              const cid = await deploytoLightHouse(e);
                              hookPublisherCreate.$loadPublisherFormData({
                                logo: displayImage(cid),
                              });
                            }
                          }}
                        />
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
                {(!isLoading && hookPublisherCreate.formStep == 6) && (lowBalance ? <Box
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
                      style={{
                        fontWeight: `${style.fontWeight.dark}`,
                        fontSize: `${style.font.h4}`,
                      }}
                    >
                      Insufficient Balance in Wallet
                    </Text>
                  </Box>
                  <Box>
                    <Text textAlign="center" style={{}}>
                      Fill in your wallet and try again
                    </Text>
                    <Text textAlign="center" style={{}}>
                      Please visit: <Link target="_blank" href="https://faucet.calibration.fildev.network/funds.html" style={{ textDecoration: "underline" }}>https://faucet.calibration.fildev.network/funds.html</Link>
                    </Text>
                  </Box>
                </Box> : (<Box
                  backgroundImage="https://ik.imagekit.io/macha/studio/Almost%20there%20image-no%20icon.png?updatedAt=1690523918606"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                  backgroundSize="100% 100%"
                >
                  <Box
                    paddingTop={style.padding.xl}
                    paddingBottom={style.padding.xl}
                  >
                    <IconBase slug="icon-almost-there" size="3xl" />
                  </Box>
                  <Box>
                    <Text
                      style={{
                        fontWeight: `${style.fontWeight.dark}`,
                        fontSize: `${style.font.h4}`,
                      }}
                    >
                      Almost There
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Text textAlign="center" style={{ width: "80%" }}>
                      Cheers to the successful publication on IPFS - a leap into a decentralized and innovative future!
                    </Text>
                  </Box>
                </Box>
                ))}
                {hookPublisherCreate.formStep == 7 && (
                  <Box
                    backgroundImage="https://ik.imagekit.io/macha/studio/Almost%20there%20image-no%20icon.png?updatedAt=1690523918606"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                    backgroundSize="100% 100%"
                  >
                    <Box
                      paddingTop={style.padding.xl}
                      paddingBottom={style.padding.xl}
                    >
                      <IconBase slug="icon-congrats" size="3xl" />
                    </Box>
                    <Box>
                      <Text
                        style={{
                          fontWeight: `${style.fontWeight.dark}`,
                          fontSize: `${style.font.h4}`,
                        }}
                      >
                        Congrats!
                      </Text>
                    </Box>
                    <Box>
                      <Text textAlign="center" style={{}}>
                        Your publisher account has been created successfully.
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
