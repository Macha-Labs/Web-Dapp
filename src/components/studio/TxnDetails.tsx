import JSONViewer from "@/_ui/JSONViewer";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import Loader from "@/_ui/loader/Loader";
import Tabs from "@/_ui/tabs/Tabs";
import { truncateAddress } from "@/helpers";
import useMetaStore from "@/store/useMetaStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Divider,
  Heading,
  Image,
  Text,
  Tooltip,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  transactionDetails: any;
  isLoading: any;
  methodParams?: any;
};
function TxnDetails({
  id,
  transactionDetails,
  isLoading,
  methodParams,
}: Props) {
  const options = [
    {
      href: "#",
      value: "All Details",
    },
    {
      href: "#",
      value: "Hex Data",
    },
  ];
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);

  const [tab, setTab] = useState<string>("All Details");
  const { colorMode } = useColorMode();
  const toast = useToast();
  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  return (
    <>
      {isLoading ? (
        <FlexRow height="500px">
          <Loader size="lg" />
        </FlexRow>
      ) : (
        <>
          <FlexRow hrAlign="space-between" vrAlign="flex-start">
            <FlexColumn width="28%" hrAlign="flex-start" vrAlign="flex-start">
              <Box
                width={"100%"}
                border={
                  colorMode == "light"
                    ? "1px solid #e2e2e2"
                    : style.card.border.hover
                }
                borderRadius={style.card.borderRadius.default}
                padding={style.padding["lg"]}
                backgroundColor={colorMode == "light" ? "#fff" : ""}
              >
                <table>
                  <tbody>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Avatar src={GlobalIcons["avatar-default"]} />
                      </td>
                      <td>
                        <FlexRow
                          vrAlign="start"
                          marginLeft={"sm"}
                          hrAlign="flex-start"
                        >
                          <Text
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                            className="mb-0"
                          >
                            {transactionDetails &&
                              truncateAddress(transactionDetails[4]?.value)}
                          </Text>
                          <IconBase
                            slug="icon-copy"
                            style={{ marginLeft: "sm" }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                transactionDetails[4]?.value
                              );
                              toast({
                                title: "Copied To Clipboard",
                                status: "success",
                                duration: 3000,
                              });
                            }}
                          />

                          {/* <Text className="mb-0">Ethereum</Text> */}
                        </FlexRow>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Divider
                          orientation="vertical"
                          border={style.card.border.meta}
                          height={"20px"}
                          width={"0px"}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <IconBase
                          slug={
                            colorMode == "light"
                              ? "icon-deploy-light"
                              : "icon-coloured-deploy"
                          }
                          size="lg"
                        />
                      </td>
                      <td>
                        <FlexRow hrAlign="flex-start">
                          <Text
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                            className="mb-0"
                            marginStart={style.margin.sm}
                          >
                            Method
                          </Text>
                          <Text
                            className="mb-0"
                            style={{
                              background: `-webkit-linear-gradient(
                          270deg,
                          rgb(25, 124, 236),
                          rgb(0, 74, 217)
                        )`,
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                              marginLeft: `${style.margin.sm}`,
                              textDecoration: "none",
                            }}
                            _hover={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              transform: "scale(1.05)",
                            }}
                          >
                            {transactionDetails && transactionDetails[7]?.value}
                          </Text>
                          <Text
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                            className="mb-0"
                            marginLeft={style.margin["xxs"]}
                          >
                            {/* 0.295 ETH */}
                          </Text>
                          <Text
                            className="mb-0"
                            color="rgba(255,255,255,0.7)"
                            marginLeft={style.margin["xxs"]}
                          >
                            {/* $ 549.68 */}
                          </Text>
                        </FlexRow>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Divider
                          orientation="vertical"
                          border={style.card.border.meta}
                          height={"20px"}
                          width={"0px"}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Avatar src={GlobalIcons["avatar-default"]} />{" "}
                      </td>
                      <td>
                        <FlexRow
                          vrAlign="start"
                          marginLeft={"sm"}
                          hrAlign="flex-start"
                        >
                          <Text
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                            className="mb-0"
                            textAlign="left"
                          >
                            {transactionDetails &&
                              truncateAddress(transactionDetails[5]?.value)}
                          </Text>
                          <IconBase
                            slug="icon-copy"
                            style={{ marginLeft: "sm" }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                transactionDetails[5]?.value
                              );
                              toast({
                                title: "Copied To Clipboard",
                                status: "success",
                                duration: 3000,
                              });
                            }}
                          />
                          {/* <Text className="mb-0">Ethereum</Text> */}
                        </FlexRow>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Box marginTop={style.margin.xl}>
                  <Text
                    mb={0}
                    style={{
                      background: `-webkit-linear-gradient(
              270deg,
              rgb(25, 124, 236),
              rgb(0, 74, 217)
            )`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontWeight: `${style.fontWeight.dark}`,
                    }}
                  >
                    CREATED
                  </Text>
                  <Text
                    color={
                      colorMode == "light" ? "#3d3d3d" : "rgba(255,255,255,0.5)"
                    }
                    className="mb-0"
                    // marginStart={style.margin.xxs}
                  >
                    {" "}
                    {/* TODO: make dynamic */}
                    {transactionDetails && transactionDetails[9]?.value}
                  </Text>
                </Box>
              </Box>
            </FlexColumn>
            <FlexColumn width="68%" hrAlign="flex-start" vrAlign="flex-start">
              <Tabs
                options={options}
                onChange={setTab}
                value={tab}
                width="fit-content"
              />
              {tab == "All Details" && (
                <>
                  <CardNative
                    height="fit-content"
                    marginTop="sm"
                    width="100%"
                    header={
                      <>
                        <Heading
                          color={colorMode == "light" ? "#3d3d3d" : ""}
                          fontSize={style.font.h4}
                          mb="0px"
                        >
                          All Details
                        </Heading>
                      </>
                    }
                  >
                    <table
                      style={{
                        width: "100%",
                      }}
                    >
                      <tbody>
                        {transactionDetails.map((item: any) => {
                          return (
                            item?.src && (
                              <tr
                                key={item._id}
                                style={
                                  {
                                    // borderBottom: `${style.card.border.default}`,
                                    // width: "100%",
                                  }
                                }
                              >
                                <td
                                  style={{
                                    paddingTop: `${style.padding["xxs"]}`,
                                    paddingBottom: `${style.padding["xxs"]}`,
                                    width: "fit-content",
                                    fontWeight: `${style.fontWeight.dark}`,
                                    fontSize: `${style.font.h5}`,
                                  }}
                                >
                                  <Box
                                    style={{
                                      paddingTop: `${style.padding["xxs"]}`,
                                      paddingBottom: `${style.padding["xxs"]}`,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Image
                                      src={
                                        colorMode == "light"
                                          ? item.srcLight
                                          : item.src
                                      }
                                      alt="icon"
                                      marginBottom={0}
                                      height="1.5rem"
                                      marginRight={2}
                                    />
                                    <Text
                                      mb={0}
                                      color={
                                        colorMode == "light" ? "#3d3d3d" : ""
                                      }
                                    >
                                      {item.key}
                                    </Text>
                                  </Box>
                                </td>
                                <td
                                  style={{
                                    color: "grey",
                                    fontWeight: `${style.fontWeight.dark}`,
                                  }}
                                >
                                  <Tooltip
                                    label="Click To Copy"
                                    placement="top-start"
                                  >
                                    <Box>
                                      <Text
                                        color={
                                          colorMode == "light" ? "#3d3d3d" : ""
                                        }
                                        marginBottom={"0px"}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            item?.value
                                          );
                                          toast({
                                            title: `${item.key} copied To Clipboard`,
                                            status: "success",
                                            duration: 3000,
                                          });
                                        }}
                                      >
                                        {item?.truncatedValue
                                          ? item.truncatedValue
                                          : item.value}
                                      </Text>
                                    </Box>
                                  </Tooltip>
                                </td>
                              </tr>
                            )
                          );
                        })}
                      </tbody>
                    </table>
                  </CardNative>
                </>
              )}
              {tab == "Hex Data" && (
                <>
                  <CardNative
                    height="fit-content"
                    marginTop="sm"
                    width="100%"
                    header={
                      <>
                        <Heading
                          color={colorMode == "light" ? "#282828" : ""}
                          fontSize={style.font.h4}
                          mb="0px"
                        >
                          Hex Data
                        </Heading>
                      </>
                    }
                  >
                    {methodParams.length > 0 ? (
                      <JSONViewer data={methodParams} />
                    ) : (
                      <Text
                        color={colorMode == "light" ? "#3d3d3d" : ""}
                        marginTop={1}
                      >
                        No Data Found
                      </Text>
                    )}
                  </CardNative>
                </>
              )}
            </FlexColumn>
          </FlexRow>
        </>
      )}
    </>
    // <FlexColumn
    //   width="100%"
    //   vrAlign="center"
    //   hrAlign="flex-start"
    //   height="100%"
    //   marginTop={"xxl"}
    // >
    //   <FlexRow>
    //     <Select
    //       // placeholder="Snapshot"
    //       size={"md"}
    //       width="20%"
    //       bg={style.card.bg.default}
    //       border={style.card.border.default}
    //       marginRight={style.margin["sm"]}
    //       value={selectedOption}
    //       onChange={handleOptionChange}
    //     >
    //       {options.map((option) => (
    //         <option key={option.value} value={option.value}>
    //           {option.label}
    //         </option>
    //       ))}
    //     </Select>

    //     <InputGroup>
    //       <Input
    //         type="text"
    //         value={query}
    //         onChange={handleInputChange}
    //         onKeyPress={handleKeyPress}
    //         placeholder="Search"
    //       />
    //       <InputRightElement width="4.5rem" pointerEvents="none">
    //         <IconBase slug="icon-search" />
    //       </InputRightElement>
    //     </InputGroup>
    //   </FlexRow>
    //   {console.log("resultData", resultData)}
    //   <FlexRow flexWrap={"wrap"} marginTop={"lg"} hrAlign="flex-start">
    //     {Object.keys(resultData).length > 0 ? (
    //       resultData.proposals.map((result: any, index: any) => {
    //         return (
    //           <MCard
    //             key={index}
    //             title={truncateString(result.author, 10)}
    //             description={truncateString(result.body, 150)}
    //             // floorPrice={item.floorPrice}
    //           />
    //         );
    //       })
    //     ) : (
    //       <Text>No result Found</Text>
    //     )}
    //   </FlexRow>
    // </FlexColumn>
  );
}

export default TxnDetails;
