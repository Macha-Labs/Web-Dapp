import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { truncateAddress, truncateString } from "@/helpers";
import useTransaction from "@/hooks/studio/useTransaction";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Divider,
  Image,
  Text,
  color,
  useRadio,
} from "@chakra-ui/react";
import { fetchTransaction } from "@wagmi/core";
import { useEffect, useState } from "react";
import { Heading, useToast } from "@chakra-ui/react";
import Loader from "@/_ui/loader/Loader";
import JSONViewer from "@/_ui/JSONViewer";

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
    { value: "snapshot", label: "SnapShot" },
    { value: "poap", label: "POAP" },
    { value: "paragraph.xyz", label: "Paragraph.xyz" },
  ];

  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);

  const [selectedOption, setSelectedOption] = useState<any>(options[0].value);
  const [detailToggle, setDetailsToggle] = useState<any>(false);
  const [hexToggle, setHexToggle] = useState<any>(false);
  const [resultData, setResultData] = useState<any>({});
  const toast = useToast();
  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  // const [query, setQuery] = useState("");

  // const handleInputChange = (e: any) => {
  //   setQuery(e.target.value);
  // };

  // const handleKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     onSearch(query);
  //   }
  // };

  // const handleOptionChange = (e: any) => {
  //   setSelectedOption(e.target.value);
  // };

  // const onSearch = async (query: any) => {
  //   const result = await $meta.fetchMetaOrigin(query, 0);
  //   console.log("Origin result", result);
  //   setResultData(result.data);
  // };

  return (
    <>
      {isLoading ? (
        <FlexRow height="500px">
          <Loader size="lg" />
        </FlexRow>
      ) : (
        <>
          <FlexRow
            marginTop={"xxl"}
            hrAlign="space-between"
            vrAlign="flex-end"
            marginBottom={"md"}
            width="68%"
          >
            <Text
              fontSize={style.font.h1}
              fontWeight={600}
              className="mb-0"
              lineHeight={style.font.h1}
              marginTop={style.margin["sm"]}
            >
              Transaction Details
            </Text>
          </FlexRow>

          {/* <Divider /> */}
          <FlexRow hrAlign="start" marginBottom={"xs"}>
            <Box>
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
                color="rgba(255,255,255,0.5)"
                className="mb-0"
                // marginStart={style.margin.xxs}
              >
                {" "}
                {/* TODO: make dynamic */}
                {transactionDetails && transactionDetails[9]?.value}
              </Text>
            </Box>
            {/* <Box padding="0% 8% 0% 8%">
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
                Status
              </Text>
              <Text
                color="rgba(255,255,255,0.5)"
                className="mb-0"
                // marginStart={style.margin.xxs}
              >
                {" "}
                
                Success
              </Text>
              
            </Box> */}
          </FlexRow>
          <FlexRow hrAlign="space-between" vrAlign="flex-start">
            <FlexColumn width="68%" hrAlign="flex-start" vrAlign="flex-start">
              <Box
                width={"100%"}
                border={style.card.border.hover}
                borderRadius={style.card.borderRadius.default}
                padding={style.padding["lg"]}
              >
                <table>
                  <tbody>
                    <tr>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <Avatar src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826" />
                      </td>
                      <td>
                        <FlexRow
                          vrAlign="start"
                          marginLeft={"sm"}
                          hrAlign="flex-start"
                        >
                          <Text className="mb-0">
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
                        <IconBase slug="icon-coloured-deploy" size="lg" />
                      </td>
                      <td>
                        <FlexRow hrAlign="flex-start">
                          <Text className="mb-0" marginStart={style.margin.sm}>
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
                        <Avatar src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826" />{" "}
                      </td>
                      <td>
                        <FlexRow
                          vrAlign="start"
                          marginLeft={"sm"}
                          hrAlign="flex-start"
                        >
                          <Text className="mb-0" textAlign="left">
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
                {/* <Divider
              border={style.card.border.meta}
              marginY={style.margin["sm"]}
            />
            <table>
              <tbody>
                <tr>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "48px",
                      paddingTop: `${style.padding["xxs"]}`,
                      paddingBottom: `${style.padding["xxs"]}`,
                    }}
                  >
                    <IconBase slug="icon-close" />
                  </td>
                  <td>
                    <FlexRow hrAlign="flex-start">
                      <Text className="mb-0" marginStart={style.margin.sm}>
                        Transfer
                      </Text>
                      <Text className="mb-0" marginLeft={style.margin["xxs"]}>
                        0.295 ETH
                      </Text>
                      <Text
                        className="mb-0"
                        color="rgba(255,255,255,0.7)"
                        marginLeft={style.margin["xxs"]}
                      >
                        $ 549.68
                      </Text>
                    </FlexRow>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "48px",
                      paddingTop: `${style.padding["xxs"]}`,
                      paddingBottom: `${style.padding["xxs"]}`,
                    }}
                  >
                    <IconBase slug="icon-close" />
                  </td>
                  <td>
                    <FlexRow hrAlign="flex-start">
                      <Text className="mb-0" marginStart={style.margin.sm}>
                        Transfer
                      </Text>
                      <Text className="mb-0" marginLeft={style.margin["xxs"]}>
                        0.295 ETH
                      </Text>
                      <Text
                        className="mb-0"
                        color="rgba(255,255,255,0.7)"
                        marginLeft={style.margin["xxs"]}
                      >
                        $ 549.68
                      </Text>
                    </FlexRow>
                  </td>
                </tr>
              </tbody>
            </table> */}
              </Box>
              <Box
                width={"100%"}
                border={style.card.border.hover}
                borderRadius={style.card.borderRadius.default}
                padding={style.padding["lg"]}
                marginTop={style.margin.xl}
              >
                <Box
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDetailsToggle(!detailToggle);
                  }}
                >
                  <FlexRow hrAlign="space-between">
                    <Text
                      className="mb-0"
                      fontSize={style.font.h5}
                      fontWeight={600}
                    >
                      All Details
                    </Text>
                    {detailToggle ? (
                      <IconBase slug="icon-chevron-up" />
                    ) : (
                      <IconBase slug="icon-chevron-down" />
                    )}
                  </FlexRow>
                </Box>
                {detailToggle && (
                  <table
                    style={{
                      marginTop: `${style.margin["xl"]}`,
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
                                    src={item.src}
                                    alt="icon"
                                    marginBottom={0}
                                    height="1.5rem"
                                    marginRight={2}
                                  />
                                  {item.key}
                                </Box>
                              </td>
                              <td
                                style={{
                                  color: "grey",
                                  fontWeight: `${style.fontWeight.dark}`,
                                }}
                              >
                                {item?.truncatedValue ? item.truncatedValue : item.value}
                              </td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </Box>
              <Box
                width={"100%"}
                border={style.card.border.hover}
                borderRadius={style.card.borderRadius.default}
                padding={style.padding["lg"]}
                marginTop={style.margin.xl}
                marginBottom={style.margin.xxxl}
              >
                <Box
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHexToggle(!hexToggle);
                  }}
                >
                  <FlexRow hrAlign="space-between">
                    <Text
                      className="mb-0"
                      fontSize={style.font.h5}
                      fontWeight={600}
                    >
                      Hex Input Data
                    </Text>
                    {hexToggle ? (
                      <IconBase slug="icon-chevron-up" />
                    ) : (
                      <IconBase slug="icon-chevron-down" />
                    )}
                  </FlexRow>
                </Box>
                {hexToggle && (
                  <>
                    {/* <Text>asdf</Text> */}

                    {console.log("this is methodParams", methodParams)}
                    <JSONViewer data={methodParams} />
                  </>
                )}
              </Box>
            </FlexColumn>
            <FlexColumn width="28%" hrAlign="flex-start" vrAlign="flex-start">
              <Box
                width={"100%"}
                // border={style.card.border.hover}
                // borderRadius={style.card.borderRadius.default}
                padding={style.padding["lg"]}
              >
                <FlexRow>
                  {/* <Avatar />{" "}
              <FlexColumn>
                <Text>0xeb...f7ee</Text>
                <Text>Ethereum</Text>
              </FlexColumn>{" "} */}
                </FlexRow>
              </Box>
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
