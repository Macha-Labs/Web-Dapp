import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import { deploytoLightHouse, displayImage } from "@/helpers/storage/lightHouseStorage";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

type Props = {
  modal: any;
  hookPublisherCreate?: any;
};

const CreatePublisherModal = ({ modal, hookPublisherCreate }: Props) => {
  return (
    <>
      <ModalWindow
        event={modal}
        size="2xl"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            {hookPublisherCreate.formStep == 4 && <Box>
              <Text className="mb-0">Choose the type of publisher account </Text>
              <Text className="mb-0" style={{ fontSize: `${style.font.h6}`, fontWeight: `${style.fontWeight.medium}` }}>For  Individual Plan is good when you have, Something like this a text.</Text>
            </Box>}
            {hookPublisherCreate.formStep == 5 && hookPublisherCreate.publisherType == "Individual" && <Box>
              <Text className="mb-0">Individual Publisher Account </Text>
            </Box>}
            {hookPublisherCreate.formStep == 5 && hookPublisherCreate.publisherType == "Organization" && <Box>
              <Text className="mb-0">Organization Publisher Account </Text>
            </Box>}
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
                  marginTop={style.margin["lg"]}
                  onClick={() => {
                    hookPublisherCreate.setClear()
                    modal.onClose()
                  }}
                >
                  Okay
                </ButtonNative>
              </Box>
            )}
            {hookPublisherCreate.formStep != 7 && <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {hookPublisherCreate.formStep == 1 && <Box></Box>}

              {hookPublisherCreate.formStep > 1 && (
                <ButtonNative
                  variant="state_default_hover"
                  marginTop={style.margin["lg"]}
                  onClick={hookPublisherCreate.prevFormStep}
                >
                  Back
                </ButtonNative>
              )}

              {hookPublisherCreate.formStep <= 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={hookPublisherCreate.nextFormStep}
                >
                  Next
                </ButtonNative>
              )}

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
                  marginTop={style.margin["lg"]}
                  onClick={hookPublisherCreate.nextFormStep}
                >
                  Save
                </ButtonNative>
              )}

              {hookPublisherCreate.formStep == 6 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={async (e: any) => {
                    e.preventDefault();
                    await hookPublisherCreate.createPublisher();
                    hookPublisherCreate.nextFormStep()
                  }}
                >
                  Confirm
                </ButtonNative>
              )}
            </Box>}
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
            {hookPublisherCreate.formStep == 1 && (
              <>
                <Box
                  paddingTop={style.padding.xl}
                  paddingBottom={style.padding.xl}
                >
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quae aut quos qui? Repudiandae velit incidunt repellendus
                    ipsa magnam, impedit quo, fugit et corporis odio est facere,
                    modi porro. Unde, commodi!
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
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
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
                    Welcome to 2nd Slide
                  </Text>
                </Box>
                <Box>
                  <Text textAlign="center" style={{ color: "grey" }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quae aut quos qui? Repudiandae velit incidunt repellendus
                    ipsa magnam, impedit quo, fugit et corporis odio est facere,
                    modi porro. Unde, commodi!
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
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
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
                    Welcome to 3rd step
                  </Text>
                </Box>
                <Box>
                  <Text textAlign="center" style={{ color: "grey" }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quae aut quos qui? Repudiandae velit incidunt repellendus
                    ipsa magnam, impedit quo, fugit et corporis odio est facere,
                    modi porro. Unde, commodi!
                  </Text>
                </Box>
              </>
            )}
            {hookPublisherCreate.formStep == 4 && (
              <>
                <Box
                  paddingTop={style.padding.lg}
                  paddingBottom={style.padding.lg}
                >
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
                    <Text textAlign="left">For individual plan is good</Text>
                  </Box>
                  <Box
                    style={{
                      border: `${style.card.border.contract}`,
                      borderRadius: `${style.card.borderRadius.default}`,
                      padding: `${style.padding.md}`,
                    }}
                    onClick={() => hookPublisherCreate.selectPublisher("Individual")}
                    _hover={{
                      transform: "scale(1.01,1.01)",
                      border: "1px solid #197cec !important",
                      cursor: "pointer"
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: `${style.fontWeight.dark}`,
                        fontSize: `${style.font.h4}`,
                      }}
                    >
                      Individual
                    </Text>
                    <Text>
                      For Individual Plan is good when you have, Something like
                      this a text
                    </Text>
                  </Box>
                  <Box
                    _hover={{
                      transform: "scale(1.01,1.01)",
                      border: "1px solid #197cec !important",
                      cursor: "pointer"
                    }}
                    style={{
                      border: `${style.card.border.contract}`,
                      borderRadius: `${style.card.borderRadius.default}`,
                      padding: `${style.padding.md}`,
                      marginTop: `${style.margin.sm}`,
                    }}
                    onClick={() => hookPublisherCreate.selectPublisher("Organization")}
                  >
                    <Text
                      style={{
                        fontWeight: `${style.fontWeight.dark}`,
                        fontSize: `${style.font.h4}`,
                      }}
                    >
                      Organization
                    </Text>
                    <Text>
                      For Organization Plan is good when you have, Something
                      like this a text
                    </Text>
                  </Box>
                </Box>
              </>
            )}
            {(hookPublisherCreate.formStep == 5 && hookPublisherCreate.publisherType == "Individual") && (
              <Box width="100%">
                <Text>All * marked fields are required</Text>
                <InputLabel
                  value={hookPublisherCreate.$publisherFormData.name}
                  inputType="text"
                  labelText="Name *"
                  placeholder="Enter your name"
                  onChange={(e: any) => hookPublisherCreate.$loadPublisherFormData({ name: e.target.value })}
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
                  onChange={(e: any) => hookPublisherCreate.$loadPublisherFormData({ email: e.target.value })}
                  inputType="text"
                  labelText="Email *"
                  placeholder="Enter your email Address"
                  marginTop="sm"
                />
              </Box>
            )}
            {(hookPublisherCreate.formStep == 5 && hookPublisherCreate.publisherType == "Organization") && (
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
                  onChange={(e: any) => hookPublisherCreate.$loadPublisherFormData({ name: e.target.value })}
                  inputType="text"
                  labelText="Organization Name *"
                  placeholder="Enter your organization name"
                  marginTop="sm"
                />
                {hookPublisherCreate.$publisherFormData.logo == "" ? <InputLabel
                  inputType="file"
                  fileDropMinHeight="80px"
                  inputLogoSize="lg"
                  labelText="Organization Logo*"
                  marginTop="sm"
                  onChange={async (e?: any) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      console.log("Selected file:", file);
                      const cid = await deploytoLightHouse(e)
                      hookPublisherCreate.$loadPublisherFormData({ logo: displayImage(cid)})
                    }
                  }}
                /> : <Box>
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
                  <Box width="100%" style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                    <Image height={100} width="80%" objectFit="contain" src={hookPublisherCreate.$publisherFormData.logo} />
                  </Box>
                </Box>}
                <InputLabel
                  value={hookPublisherCreate.$publisherFormData.website}
                  onChange={(e: any) => hookPublisherCreate.$loadPublisherFormData({ website: e.target.value })}
                  inputType="text"
                  labelText="Organization Website URL *"
                  placeholder="Enter your organization website link"
                  marginTop="sm"
                />
              </Box>
            )}
            {hookPublisherCreate.formStep == 6 && (
              <>
                <Box
                  paddingTop={style.padding.xl}
                  paddingBottom={style.padding.xl}
                >
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
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
                    Almost There
                  </Text>
                </Box>
                <Box>
                  <Text textAlign="center" style={{ color: "grey" }}>
                    All Publisher Information will be saved on IPFS for better Operation
                  </Text>
                </Box>
              </>
            )}
            {hookPublisherCreate.formStep == 7 && (
              <>
                <Box
                  paddingTop={style.padding.xl}
                  paddingBottom={style.padding.xl}
                >
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
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
                    Congrats!
                  </Text>
                </Box>
                <Box>
                  <Text textAlign="center" style={{ color: "grey" }}>
                    Your publisher request has been received. We will get in touch soon.
                  </Text>
                </Box>
              </>
            )}
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreatePublisherModal;
