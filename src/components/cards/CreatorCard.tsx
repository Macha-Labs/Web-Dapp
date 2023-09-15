import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import Loader from "@/_ui/loader/Loader";
import chains from "@/data/network";
import {
  deploytoLightHouse,
  displayImage,
} from "@/helpers/storage/lightHouseStorage";
import useCreatorCreate from "@/hooks/studio/useCreatorCreate";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  List,
  ListItem,
  Tag,
  TagCloseButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreatorCard = ({ modal }: any) => {
  const hookCreatorCreate = useCreatorCreate();
  const router = useRouter();

  useEffect(() => {
    console.log("hookCreatorCreate.tags", hookCreatorCreate.tags);
  }, [hookCreatorCreate.tags]);

  const { colorMode } = useColorMode();
  return (
    <Box
      height={"85vh"}
      // border={style.card.border.meta}
      borderRadius={style.card.borderRadius.button}
      // overflow={"hidden"}
      position="relative"
      boxShadow={style.card.shadow.default}
    >
      <Box
        style={{
          position: "absolute",
          right: "-2.4rem",
          top: "-1.3rem",
        }}
      >
        <Image
          src={
            colorMode == "light"
              ? "/assets/Modal-Close-Button-Light.svg"
              : GlobalIcons["icon-close"]
          }
          onClick={() => {
            hookCreatorCreate.setClear();
            modal.onClose();
          }}
          alt=""
          style={
            colorMode == "light"
              ? {}
              : {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "7px",
                  cursor: "pointer",
                  width: "2rem",
                  height: "2rem",
                  background: `${style.icon.bg.default}`,
                  borderRadius: "50%",
                  boxShadow: `${style.icon.shadow.default}`,
                }
          }
        />
      </Box>
      <FlexRow height="85vh">
        {hookCreatorCreate.isLoading ? (
          <FlexColumn>
            <Loader size="lg" />
          </FlexColumn>
        ) : (
          <Flex direction="row">
            {hookCreatorCreate.step === 3 ? (
              <FlexRow height="85vh" width="85vw">
                {hookCreatorCreate.step == 3 && (
                  <Box
                    backgroundImage={
                      colorMode == "light"
                        ? "/assets/Create-Content-Success-Light.svg"
                        : "/assets/Content_Success_Modal_bg.svg"
                    }
                    backgroundSize="cover"
                    backgroundPosition="center"
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src="/assets/Blue_tick.svg" alt="Blue_Tick.svg" />
                    <Text
                      fontSize={`${style.font.h2}`}
                      fontWeight={`${style.fontWeight.dark}`}
                    >
                      Congrats!
                    </Text>
                    <Text>Meta Creation was successful.</Text>
                    <Text>
                      You can view all your metas <Link>here</Link>
                    </Text>

                    <ButtonNative
                      textFontSize="h5"
                      height="3.5rem"
                      marginTop={"xxl"}
                      width="9rem"
                      text="View Meta"
                      variant="state_brand"
                      onClick={() => {
                        if (hookCreatorCreate.createdMetaCid) {
                          router.push(
                            `/search/meta/${hookCreatorCreate.createdMetaCid}`
                          );
                          hookCreatorCreate.setClear();
                          modal.onClose();
                        } else {
                          router.push("/explore");
                        }
                      }}
                    />
                  </Box>
                )}
              </FlexRow>
            ) : (
              <FlexRow height="85vh">
                <Box width={"40%"} height={"100%"}>
                  {hookCreatorCreate.step == 1 && (
                    <Image
                      height={"85vh"}
                      src={
                        colorMode == "light"
                          ? "/assets/Create-Content-Starting-Light.png"
                          : "/assets/CreateContentStarting.png"
                      }
                      width={"100%"}
                      objectFit={"cover"}
                      objectPosition={"top"}
                      borderTopLeftRadius={style.card.borderRadius.button}
                      borderBottomLeftRadius={style.card.borderRadius.button}
                      alt="CreateContentStarting.png"
                    />
                  )}
                  {hookCreatorCreate.step == 2 && (
                    <Image
                      height={"85vh"}
                      src={
                        colorMode == "light"
                          ? "/assets/Create-Content-IPFS-Light.png"
                          : "/assets/CreateContentIPFS.png"
                      }
                      width={"100%"}
                      objectFit={"cover"}
                      objectPosition={"center center"}
                      borderTopLeftRadius={style.card.borderRadius.button}
                      borderBottomLeftRadius={style.card.borderRadius.button}
                      alt="CreateContentIPFS.png"
                    />
                  )}
                </Box>
                <Box
                  width={"60%"}
                  padding={style.padding.xxxl}
                  height={"100%"}
                  overflowY="scroll"
                  className="no-scrollbar"
                >
                  <FlexColumn hrAlign="flex-start" height="99%">
                    {hookCreatorCreate.step == 1 && (
                      <Heading
                        fontSize={style.font.h3}
                        color={colorMode == "light" ? "#000" : ""}
                      >
                        Get started as a Creator
                      </Heading>
                    )}
                    {hookCreatorCreate.step == 2 && (
                      <Heading fontSize={style.font.h3}>
                        Select Network and Upload to IPFS
                      </Heading>
                    )}
                    {hookCreatorCreate.step == 2 && (
                      <FlexRow marginBottom={"md"} marginTop={"md"}>
                        {Object.keys(chains).map((chain: any, index) => {
                          return (
                            <Box
                              key={index}
                              borderRadius={"50%"}
                              onClick={() => {
                                hookCreatorCreate.$loadCreatorFormData({
                                  chain_id: chain,
                                });
                              }}
                              padding={style.padding.xxxs}
                              border={
                                hookCreatorCreate.$creatorFormData.chain_id ==
                                chain
                                  ? style.card.border.meta
                                  : style.input.border.default
                              }
                              marginX={style.margin.xxs}
                              cursor="pointer"
                              _hover={{ border: `${style.card.border.meta}` }}
                            >
                              <Image
                                src={GlobalIcons[chains[chain].chainImage]}
                                height={"50px"}
                                width={"50px"}
                                alt=""
                              />
                            </Box>
                          );
                        })}
                      </FlexRow>
                    )}
                    {hookCreatorCreate.step == 2 && (
                      <>
                        <InputLabel
                          value={hookCreatorCreate.$creatorFormData.description}
                          inputType="textArea"
                          labelText="Share context in 150 Words"
                          placeholder="Give a  description of your post "
                          onChange={(e: any) => {
                            let valueTextArea = e.target.value;
                            hookCreatorCreate.$loadCreatorFormData({
                              description: valueTextArea,
                            });
                          }}
                        />
                        <FlexColumn vrAlign="flex-start" marginTop={"sm"}>
                          <Heading
                            as="h6"
                            size="sm"
                            marginRight={style.margin.xxs}
                            bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                            bgClip="text"
                          >
                            Select
                          </Heading>
                          <FlexRow flexWrap={"wrap"} hrAlign="flex-start">
                            {hookCreatorCreate.tags.map((item: any) => {
                              return (
                                <Tag
                                  marginRight={style.margin.xxs}
                                  key={`label-${item}`}
                                  // variant={"grey"}
                                  marginBottom={style.margin.sm}
                                  // marginTop={style.margin.sm}
                                >
                                  <Text marginBottom={"0px"}>{item}</Text>
                                  <TagCloseButton
                                    onClick={() => {
                                      hookCreatorCreate.handleTagRemove(item);
                                    }}
                                  />
                                </Tag>
                              );
                            })}
                          </FlexRow>
                          <Input
                            type="text"
                            value={hookCreatorCreate.tagString}
                            onChange={hookCreatorCreate.handleInputChange}
                            padding={style.padding.xxs}
                            onKeyDown={(e: any) => {
                              if (e.key === "Enter") {
                                hookCreatorCreate.handleTagAdd(
                                  hookCreatorCreate.tagString
                                );
                              }
                            }}
                          />
                          <Box position={"relative"} width={"100%"}>
                            {hookCreatorCreate.suggestions.length > 0 && (
                              <List
                                styleType="none"
                                // backgroundColor="#000511"
                                backgroundColor="#020A21"
                                width={"100%"}
                                borderRadius="5px"
                                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                                padding="10px"
                                marginTop="5px"
                                zIndex="1"
                                position="absolute"
                                top="0"
                              >
                                {hookCreatorCreate.suggestions.map(
                                  (suggestion: any) => (
                                    <ListItem
                                      key={suggestion}
                                      padding="5px 10px"
                                      margin="5px 0"
                                      borderRadius="3px"
                                      cursor="pointer"
                                      _hover={{ backgroundColor: "#00040d" }}
                                      onClick={() =>
                                        hookCreatorCreate.handleTagAdd(
                                          suggestion
                                        )
                                      }
                                    >
                                      {suggestion}
                                    </ListItem>
                                  )
                                )}
                              </List>
                            )}
                          </Box>
                        </FlexColumn>
                      </>
                    )}

                    {/* <FlexRow></FlexRow> */}
                    {hookCreatorCreate.step == 1 && (
                      <FlexRow hrAlign="space-between" marginTop={"lg"}>
                        <Box
                          // height="200px"
                          width={"45%"}
                          padding={style.padding.sm}
                          borderRadius={style.card.borderRadius.button}
                          border={
                            hookCreatorCreate.inputType == "Upload"
                              ? style.card.border.meta
                              : style.input.border.default
                          }
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          flexDir={"column"}
                          _hover={{ border: `${style.card.border.meta}` }}
                          onClick={() => {
                            hookCreatorCreate.setInputType("Upload");
                          }}
                        >
                          <Image
                            src={
                              colorMode == "light"
                                ? "/assets/Upload-Image-Light.svg"
                                : "/assets/CreatorUploadImage.svg"
                            }
                            alt="creatorUploadImage"
                          />
                          <Text
                            marginBottom={"0px"}
                            marginTop={style.margin.xs}
                            color={colorMode == "light" ? "#000" : ""}
                          >
                            Upload Image/File
                          </Text>
                        </Box>
                        <Box
                          // height="200px"
                          width={"45%"}
                          padding={style.padding.sm}
                          borderRadius={style.card.borderRadius.button}
                          border={
                            hookCreatorCreate.inputType == "Link"
                              ? style.card.border.meta
                              : style.input.border.default
                          }
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          _hover={{ border: `${style.card.border.meta}` }}
                          flexDir={"column"}
                          onClick={() => {
                            hookCreatorCreate.setInputType("Link");
                          }}
                        >
                          <Image
                            src={
                              colorMode == "light"
                                ? "/assets/Upload-Image-Light.svg"
                                : "/assets/CreatorAddLink.svg"
                            }
                            alt="creatorAddLink"
                          />
                          <Text
                            marginBottom={"0px"}
                            marginTop={style.margin.xs}
                            color={colorMode == "light" ? "#000" : ""}
                          >
                            Add Link
                          </Text>
                        </Box>
                      </FlexRow>
                    )}
                    {hookCreatorCreate.step == 1 && (
                      <>
                        {" "}
                        {hookCreatorCreate.inputType == "Upload" &&
                          (hookCreatorCreate.$creatorFormData.link == "" ? (
                            <>
                              <InputLabel
                                inputType="file"
                                fileDropMinHeight="80px"
                                inputLogoSize="lg"
                                //   labelText="Image"
                                marginTop="sm"
                                onChange={async (e?: any) => {
                                  if (e.target.files && e.target.files[0]) {
                                    // const file = e.target.files[0];
                                    // console.log("Selected file:", e.target.files[0].name);
                                    if (e.target.files[0].name) {
                                      hookCreatorCreate.setImageName(
                                        e.target.files[0].name
                                      );
                                    }
                                    // const element = document.createElement("a");
                                    // element.href = URL.createObjectURL(file);
                                    const cid = await deploytoLightHouse(
                                      e.target.files,
                                      hookCreatorCreate.setLoadingCallback
                                    );
                                    hookCreatorCreate.$loadCreatorFormData({
                                      link: displayImage(cid),
                                    });
                                  }
                                }}
                              />
                              {hookCreatorCreate.ipfsLoading != 0 && (
                                <Box
                                  width="100%"
                                  bgColor="#00040d"
                                  height={1}
                                  mt={style.margin.sm}
                                >
                                  <Box
                                    bgColor="#0f172e"
                                    width={`${hookCreatorCreate.ipfsLoading}%`}
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
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  height={100}
                                  width="80%"
                                  objectFit="contain"
                                  src={hookCreatorCreate.$creatorFormData.link}
                                  alt=""
                                />
                                {hookCreatorCreate.imageName && (
                                  <Text mb={0} mt={style.margin.xxs}>
                                    {hookCreatorCreate.imageName}
                                  </Text>
                                )}
                              </Box>
                            </Box>
                          ))}
                        {hookCreatorCreate.inputType == "Link" && (
                          <>
                            <InputLabel
                              value={hookCreatorCreate.$creatorFormData.link}
                              onChange={(e: any) =>
                                hookCreatorCreate.$loadCreatorFormData({
                                  link: e.target.value,
                                })
                              }
                              inputType="text"
                              // labelText="Link"
                              placeholder="Paste Link Here"
                              marginTop="sm"
                            />
                          </>
                        )}
                      </>
                    )}

                    {hookCreatorCreate.step == 1 && (
                      <ButtonNative
                        textFontSize="h5"
                        height="3.5rem"
                        marginTop={"lg"}
                        width="100%"
                        text="Select Network and Publish to IPFS"
                        variant={
                          colorMode == "light"
                            ? "state_light"
                            : "state_default_hover"
                        }
                        onClick={() => {
                          hookCreatorCreate.nextFormStep();
                        }}
                      />
                    )}
                    {hookCreatorCreate.step == 2 && (
                      <ButtonNative
                        textFontSize="h5"
                        height="3.5rem"
                        marginTop={"xxl"}
                        width="100%"
                        text={
                          hookCreatorCreate.address
                            ? "Publish"
                            : "Sign in and publish"
                        }
                        variant="state_brand"
                        onClick={() => {
                          console.log("submit clicked");
                          // hookCreatorCreate.nextFormStep();
                          hookCreatorCreate.submit();
                        }}
                      />
                    )}
                  </FlexColumn>
                </Box>
              </FlexRow>
            )}
          </Flex>
        )}
      </FlexRow>
    </Box>
  );
};

export default CreatorCard;
{
  /* {hookCreatorCreate.step == 3 && (
                <Box
                  backgroundImage="/assets/Content_Success_Modal_bg.svg"
                  width="100%"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                <Image src="/assets/Blue"
                  <Text fontSize={`${style.font.h3}`}>Congrats!</Text>
                  <Text>Meta Creation was successful.</Text>
                  <Text>
                    You can view all your metas <Text>here</Text>
                  </Text>

                  <ButtonNative
                    textFontSize="h5"
                    height="3.5rem"
                    marginTop={"xxl"}
                    width="9rem"
                    text="View Metas"
                    variant="state_brand"
                    onClick={() => {
                      console.log("submit clicked");
                    }}
                  />
                </Box>
              )} */
}
