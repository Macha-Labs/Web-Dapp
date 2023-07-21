import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import IconBase from "@/_ui/icons/IconsBase";
import InputLabel from "@/_ui/input/InputLabel";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import { style } from "@/styles/StyledConstants";
import { Box, Divider, Image, Text } from "@chakra-ui/react";

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

              {hookPublisherCreate.formStep < 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={hookPublisherCreate.nextFormStep}
                >
                  Next
                </ButtonNative>
              )}

              {hookPublisherCreate.formStep == 3 && (
                <ButtonNative
                  variant="state_brand"
                  marginTop={style.margin["lg"]}
                  onClick={async (e: any) => {
                    e.preventDefault();
                    await hookPublisherCreate.publishContract();
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
            {/* <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  {hookPublisherCreate.formStep > 1 ? <IconBase size="xl" slug="icon-success" /> : <Text rounded="full" style={{ border: `${style.card.border.meta}`, paddingLeft: `${style.padding.xxs}`, paddingRight: `${style.padding.xxs}` }} >
                    1
                  </Text>}
                </Box>
                <Text>
                  First
                </Text>
              </Box>
              <Divider marginX="8px" border={hookPublisherCreate.formStep > 1 && style.card.border.meta} />
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                {hookPublisherCreate.formStep > 2 ? <IconBase size="xl" slug="icon-success" /> : <Text rounded="full" style={{ border: `${style.card.border.meta}`, paddingLeft: `${style.padding.xxs}`, paddingRight: `${style.padding.xxs}` }} >
                  2
                </Text>}
                <Text>
                  Second
                </Text>
              </Box>
              <Divider marginX="8px" border={hookPublisherCreate.formStep > 2 && style.card.border.meta} />
              <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
                {hookPublisherCreate.formStep > 3 ? <IconBase size="xl" slug="icon-success" /> : <Text rounded="full" style={{ border: `${style.card.border.meta}`, paddingLeft: `${style.padding.xxs}`, paddingRight: `${style.padding.xxs}` }} >
                  3
                </Text>}
                <Text>
                  Third
                </Text>
              </Box>
            </Box> */}

            {hookPublisherCreate.formStep == 1 && (
              <>
                <Box paddingTop={style.padding.xl} paddingBottom={style.padding.xl}>
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
                    alt="txn-icon"
                    height="6rem"
                  />
                </Box>
                <Box>
                  <Text style={{ fontWeight: `${style.fontWeight.dark}`, fontSize: `${style.font.h4}` }}>
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
            //   <>
            //     <Box
            //       style={{
            //         width: "100%",
            //         display: "flex",
            //         flexDirection: "row",
            //         justifyContent: "space-between",
            //         alignItems: "center",
            //       }}
            //     >
            //       <Box width="47%">
            //         <InputLabel
            //           elementRef={(element: any) =>
            //             (hookPublisherCreate.contractDataRef.current["name"] =
            //               element)
            //           }
            //           inputType="text"
            //           labelText="Contract Name *"
            //           placeholder="Name"
            //         />
            //       </Box>
            //       <Box width="47%">
            //         <InputLabel
            //           elementRef={(element: any) =>
            //             (hookPublisherCreate.contractDataRef.current["slug"] =
            //               element)
            //           }
            //           inputType="text"
            //           labelText="Slug *"
            //           placeholder="Slug"
            //         />
            //       </Box>
            //     </Box>
            //     <InputLabel
            //       elementRef={(element: any) =>
            //         (hookPublisherCreate.contractDataRef.current[
            //           "description"
            //         ] = element)
            //       }
            //       inputType="text"
            //       labelText="Description *"
            //       placeholder="Description"
            //       marginTop="sm"
            //     />
            //     <InputLabel
            //       elementRef={(element: any) =>
            //         (hookPublisherCreate.contractDataRef.current["image"] =
            //           element)
            //       }
            //       inputType="text"
            //       labelText="Image *"
            //       placeholder="Image"
            //       marginTop="sm"
            //     />
            //   </>
            <>
                <Box paddingTop={style.padding.xl} paddingBottom={style.padding.xl}>
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
                    alt="txn-icon"
                    height="6rem"
                  />
                </Box>
                <Box>
                  <Text style={{ fontWeight: `${style.fontWeight.dark}`, fontSize: `${style.font.h4}` }}>
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
            //   <>
            //     <InputLabel
            //       elementRef={(element: any) =>
            //         (hookPublisherCreate.contractDataRef.current[
            //           "interested_methods"
            //         ] = element)
            //       }
            //       inputType="text"
            //       labelText="Interested Methods *"
            //       placeholder="Interested Methods"
            //       marginTop="sm"
            //     />
            //     <InputLabel
            //       elementRef={(element: any) =>
            //         (hookPublisherCreate.contractDataRef.current[
            //           "interested_events"
            //         ] = element)
            //       }
            //       inputType="text"
            //       labelText="Interested Events *"
            //       placeholder="Interested Events"
            //       marginTop="sm"
            //     />
            //     <InputLabel
            //       elementRef={(element: any) =>
            //         (hookPublisherCreate.contractDataRef.current["admins"] =
            //           element)
            //       }
            //       inputType="text"
            //       labelText="Admins *"
            //       placeholder="Admins"
            //       marginTop="sm"
            //     />
            //   </>
            <>
                <Box paddingTop={style.padding.xl} paddingBottom={style.padding.xl}>
                  <Image
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026"
                    alt="txn-icon"
                    height="6rem"
                  />
                </Box>
                <Box>
                  <Text style={{ fontWeight: `${style.fontWeight.dark}`, fontSize: `${style.font.h4}` }}>
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
          </FlexColumn>
        </FlexColumn>
      </ModalWindow>
    </>
  );
};

export default CreatePublisherModal;
