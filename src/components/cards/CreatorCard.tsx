import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import chains from "@/data/network";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const CreatorCard = () => {
  const [inputType, setInputType] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  return (
    <Box
      height={"85vh"}
      border={style.card.border.meta}
      borderRadius={style.card.borderRadius.button}
      overflow={"hidden"}
      marginBottom={style.margin.xxxl}
      boxShadow={style.card.shadow.default}
    >
      <FlexRow height="fit-content">
        <Box width={"40%"} height={"fit-content"}>
          {step == 1 && (
            <Image
              height={"85vh"}
              src="/assets/CreateContentStarting.png"
              width={"100%"}
              objectFit={"cover"}
              objectPosition={"top"}
              borderTopLeftRadius={style.card.borderRadius.button}
              borderBottomLeftRadius={style.card.borderRadius.button}
            />
          )}
          {step == 2 && (
            <Image
              height={"85vh"}
              src="/assets/CreateContentIPFS.png"
              width={"100%"}
              objectFit={"cover"}
              objectPosition={"center center"}
              borderTopLeftRadius={style.card.borderRadius.button}
              borderBottomLeftRadius={style.card.borderRadius.button}
            />
          )}
        </Box>
        <Box width={"60%"} padding={style.padding.xxxl} height={"100%"}>
          <FlexColumn hrAlign="flex-start" height="100%">
            {step == 1 && <Heading>Get started as a Creator</Heading>}
            {step == 2 && <Heading>Select Network and Upload to IPFS</Heading>}
            {step == 2 && (
              <FlexRow marginBottom={"md"} marginTop={"md"}>
                {Object.keys(chains).map((chain: any, index) => {
                  console.log("chains", chains[chain]);
                  return (
                    <Box
                      borderRadius={"50%"}
                      padding={style.padding.xxs}
                      border={style.card.border.default}
                      marginX={style.margin.xxs}
                      _hover={{ border: `${style.card.border.meta}` }}
                    >
                      <Image
                        src={GlobalIcons[chains[chain].chainImage]}
                        height={"50px"}
                      />
                    </Box>
                  );
                })}
              </FlexRow>
            )}
            {step == 2 && (
              <InputLabel
                // value={hookContractCreate.$contractFormData.contract_abi}
                inputType="textArea"
                labelText="Share context in 150 Words"
                placeholder="Give a  description of your post "
                // onChange={(e: any) => {
                //   e.preventDefault();
                //   hookContractCreate.$loadContractFormData({
                //     contract_abi: e.target.value,
                //   });
                // }}
              />
            )}

            {/* <FlexRow></FlexRow> */}
            {step == 1 && (
              <FlexRow hrAlign="space-between" marginTop={"lg"}>
                <Box
                  // height="200px"
                  width={"45%"}
                  padding={style.padding.sm}
                  borderRadius={style.card.borderRadius.button}
                  border={style.input.border.default}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"column"}
                  _hover={{ border: `${style.card.border.meta}` }}
                  onClick={() => {
                    setInputType("Upload");
                  }}
                >
                  <Image src="/assets/CreatorUploadImage.svg" />
                  <Text marginBottom={"0px"} marginTop={style.margin.xs}>
                    Upload Image/File
                  </Text>
                </Box>
                <Box
                  // height="200px"
                  width={"45%"}
                  padding={style.padding.sm}
                  borderRadius={style.card.borderRadius.button}
                  border={style.input.border.default}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ border: `${style.card.border.meta}` }}
                  flexDir={"column"}
                  onClick={() => {
                    setInputType("Link");
                  }}
                >
                  <Image src="/assets/CreatorAddLink.svg" />
                  <Text marginBottom={"0px"} marginTop={style.margin.xs}>
                    Add Link
                  </Text>
                </Box>
              </FlexRow>
            )}
            {step == 1 && (
              <>
                {" "}
                {inputType == "Upload" && (
                  <>
                    <InputLabel
                      inputType="file"
                      fileDropMinHeight="80px"
                      inputLogoSize="lg"
                      //   labelText="Image"
                      marginTop="sm"
                      //   onChange={async (e?: any) => {
                      //     if (e.target.files && e.target.files[0]) {
                      //       // const file = e.target.files[0];
                      //       // console.log("Selected file:", file);
                      //       // const element = document.createElement("a");
                      //       // element.href = URL.createObjectURL(file);
                      //       const cid = await deploytoLightHouse(
                      //         e.target.files,
                      //         hookContractCreate.setLoadingCallback
                      //       );
                      //       hookContractCreate.$loadContractFormData({
                      //         image: displayImage(cid),
                      //       });
                      //     }
                      //   }}
                    />
                  </>
                )}
                {inputType == "Link" && (
                  <>
                    <InputLabel
                      //   value={""}
                      //   onChange={(e: any) =>
                      //     hookContractCreate.$loadContractFormData({
                      //       name: e.target.value,
                      //     })
                      //   }
                      inputType="text"
                      //   labelText="Link"
                      placeholder="Paste Link Here"
                      marginTop="sm"
                    />
                  </>
                )}
              </>
            )}

            {step == 1 && (
              <ButtonNative
                textFontSize="h5"
                height="3.5rem"
                marginTop={"xxl"}
                width="100%"
                text="Select Network and Publish to IPFS"
                variant="state_default_hover"
                onClick={() => {
                  setStep(2);
                }}
              />
            )}
            {step == 2 && (
              <ButtonNative
                textFontSize="h5"
                height="3.5rem"
                marginTop={"xxl"}
                width="100%"
                text="Sign in and publish"
                variant="state_brand"
                onClick={() => {
                  setStep(1);
                }}
              />
            )}
          </FlexColumn>
        </Box>
      </FlexRow>
    </Box>
  );
};

export default CreatorCard;
