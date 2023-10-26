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
  Table,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  color,
  useRadio,
} from "@chakra-ui/react";
import { fetchTransaction } from "@wagmi/core";
import { useEffect, useState } from "react";
import { Heading, useToast } from "@chakra-ui/react";
import Loader from "@/_ui/loader/Loader";
import JSONViewer from "@/_ui/JSONViewer";
import GlobalIcons from "@/styles/GlobalIcons";
import CardNative from "@/_ui/cards/CardNative";
import MetaList from "../meta/MetaList";
import useMetaList from "@/hooks/meta/useMetasList";
import ContractList from "./ContractList";
import useContractList from "@/hooks/studio/useContractList";

type Props = {
  id?: string;
  transactionDetails?: any;
  isLoading?: any;
  methodParams?: any;
};
function SearchResultsTxn({
  // id,
  // transactionDetails,
  isLoading,
}: // methodParams,
Props) {
  const options = [
    {
      href: "#",
      value: "Transactions",
    },
    {
      href: "#",
      value: "Contracts",
    },
    {
      href: "#",
      value: "Metas",
    },
  ];

  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const hookMetasList = useMetaList();
  const hookContractList = useContractList();
  const [tab, setTab] = useState<string>("Transactions");
  const [selectedOption, setSelectedOption] = useState<any>(options[0].value);
  const [detailToggle, setDetailsToggle] = useState<any>(false);
  const [hexToggle, setHexToggle] = useState<any>(false);
  const [resultData, setResultData] = useState<any>({});
  const toast = useToast();
  useEffect(() => {
    //console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  return (
    <>
      {isLoading ? (
        <FlexRow height="500px">
          <Loader size="lg" />
        </FlexRow>
      ) : (
        <>
          <FlexRow hrAlign="flex-start">
            <Text fontSize={style.font.h2} fontWeight={style.fontWeight.dark}>
              Search Results
            </Text>
          </FlexRow>
          <FlexRow hrAlign="space-between" vrAlign="flex-start">
            <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
              <Tabs
                options={options}
                onChange={setTab}
                value={tab}
                width="fit-content"
              />
              {tab == "Transactions" && (
                <>
                  <Box width="100%" marginTop={style.margin.xxl}>
                    <Table>
                      <Tbody
                        style={{
                          justifyItems: "space-between",
                          width: "100%",
                        }}
                      >
                        <Tr
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                            borderBottom: "none",
                          }}
                        >
                          <td>
                            <Text textAlign="center" color="#ACB5CA">
                              Txn Hash
                            </Text>
                          </td>
                          <td>
                            <Text textAlign="center" color="#ACB5CA">
                              Method Name
                            </Text>
                          </td>
                          <td>
                            <Text textAlign="center" color="#ACB5CA">
                              Date of Creation
                            </Text>
                          </td>
                          <td></td>
                        </Tr>

                        <Tr
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                            border: `${style.card.border.default}`,
                            borderRadius: `${style.card.borderRadius.default}`,
                            padding: `${style.padding.sm}`,
                          }}
                        >
                          <Td>
                            <Text
                              marginBottom={0}
                              textAlign="center"
                              fontSize={style.font.h4}
                            >
                              ABX_NAME
                            </Text>
                          </Td>
                          <Td>
                            <Text marginBottom={0} textAlign="center">
                              Transfernft123e1131_to_sender
                            </Text>
                          </Td>
                          <Td>
                            <FlexRow>
                              <Image
                                src="/assets/icons/Base_blue_icons/base-blue-calendar-outline.svg"
                                alt="calendar image"
                                marginRight={style.margin.xxs}
                              />
                              <Text marginBottom={0} textAlign="center">
                                23-09-2022
                              </Text>
                            </FlexRow>
                          </Td>
                          <Td>
                            <Text marginBottom={0} textAlign="center">
                              <ButtonNative
                                text="View More"
                                variant="state_brand"
                                width="60%"
                                height="2rem"
                                // marginTop="sm"
                              />
                            </Text>
                          </Td>
                        </Tr>
                      </Tbody>
                      {/* <tbody>
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
                                  <Tooltip
                                    label="Click To Copy"
                                    placement="top-start"
                                  >
                                    <Box>
                                      <Text
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
                      </tbody> */}
                    </Table>
                  </Box>
                </>
              )}
              {tab == "Contracts" && (
                <Box marginTop={style.margin.xxl} width="100%">
                  {hookContractList?.filterData && (
                    <ContractList
                      openInNewTab={true}
                      data={hookContractList.filterData}
                    />
                  )}
                </Box>
              )}
              {tab == "Metas" && (
                <Box width="100%" marginTop={style.margin.xxl}>
                  <MetaList hookMetasList={hookMetasList} />
                </Box>
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
    //   {//console.log("resultData", resultData)}
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

export default SearchResultsTxn;
