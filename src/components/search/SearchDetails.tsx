import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Avatar, Box, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};
function SearchDetails({ id }: Props) {
  const options = [
    { value: "snapshot", label: "SnapShot" },
    { value: "poap", label: "POAP" },
    { value: "paragraph.xyz", label: "Paragraph.xyz" },
  ];

  const details = [
    { key: "Block", value: "	17661009" },
    { key: "Block Confirmations ", value: "	17661009" },
    { key: "ETH Price	", value: "	17661009" },
    { key: "Gas Used	", value: "	17661009" },
    { key: "Gas Price	", value: "	17661009" },
    { key: "Txn Type	", value: "	17661009" },
    { key: "Nonce", value: "	17661009" },
  ];

  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const [selectedOption, setSelectedOption] = useState<any>(options[0].value);
  const [detailToggle, setDetailsToggle] = useState<any>(false);
  const [hexToggle, setHexToggle] = useState<any>(false);
  const [resultData, setResultData] = useState<any>({});

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
      <FlexRow marginTop={"xxl"} hrAlign="space-between">
        <Text fontSize={style.font.h1} fontWeight={600}>
          Intraction Details
        </Text>
        <ButtonNative variant="state_brand" text="Share" marginRight="0px" />
      </FlexRow>
      <Tabs
        options={[
          {
            href: "",
            value: "Details",
          },
          {
            href: "",
            value: "Internal",
          },
          {
            href: "",
            value: "Logs",
          },
        ]}
      />
      <Divider />
      <FlexRow hrAlign="start" marginBottom={"xs"}>
        <TagNative variant="green" value="Success" size="sm" />
        <Text className="mb-0">about 1 hour ago </Text>
        <Text
          color="rgba(255,255,255,0.5)"
          className="mb-0"
          marginStart={style.margin.xxs}
        >
          {" "}
          Jul 8 2023 at 11:30:47 AM
        </Text>
      </FlexRow>
      <FlexRow hrAlign="space-between" vrAlign="flex-start">
        <FlexColumn width="58%" hrAlign="flex-start" vrAlign="flex-start">
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
                    <Avatar />{" "}
                  </td>
                  <td>
                    <FlexColumn vrAlign="start" marginLeft={"sm"}>
                      <Text className="mb-0">0xeb...f7ee</Text>
                      <Text className="mb-0">Ethereum</Text>
                    </FlexColumn>
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
                    <Avatar />{" "}
                  </td>
                  <td>
                    <FlexColumn vrAlign="start" marginLeft={"sm"}>
                      <Text className="mb-0">0xeb...f7ee</Text>
                      <Text className="mb-0">Ethereum</Text>
                    </FlexColumn>
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider
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
            </table>
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
                  Details
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
                style={{ marginTop: `${style.margin["xl"]}`, width: "100%" }}
              >
                <tbody>
                  {details.map((item) => {
                    return (
                      <tr
                        style={{
                          borderBottom: `${style.card.border.default}`,
                          // width: "100%",
                        }}
                      >
                        <td
                          style={{
                            paddingTop: `${style.padding["xxs"]}`,
                            paddingBottom: `${style.padding["xxs"]}`,
                            width: "fit-content",
                          }}
                        >
                          {item.key}
                        </td>
                        <td style={{}}>{item.value}</td>
                      </tr>
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
            {hexToggle && <Text marginTop={style.margin.xl}>Function</Text>}
          </Box>
        </FlexColumn>
        <FlexColumn width="38%" hrAlign="flex-start" vrAlign="flex-start">
          <Box
            width={"100%"}
            border={style.card.border.hover}
            borderRadius={style.card.borderRadius.default}
            padding={style.padding["lg"]}
          >
            <FlexRow>
              <Avatar />{" "}
              <FlexColumn>
                <Text>0xeb...f7ee</Text>
                <Text>Ethereum</Text>
              </FlexColumn>{" "}
            </FlexRow>
          </Box>
        </FlexColumn>
      </FlexRow>
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

export default SearchDetails;
