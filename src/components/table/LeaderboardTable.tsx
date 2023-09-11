import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import { leaderBoardData } from "@/service/ApiService";
import { style } from "@/styles/StyledConstants";
import { Box, Td, Text, Th, useColorMode } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LeaderboardTable = () => {
  const {colorMode} = useColorMode()

  const [leaderBoardTableData, setLeaderBoardTableData] = useState<any>();
  useEffect(() => {
    leaderBoardData().then((res) => {
      console.log(res.data);
      setLeaderBoardTableData(
        res.data.sort((a: any, b: any) => {
          return b?.points - a?.points;
        })
      );
    });
  }, []);

  const router = useRouter();

  return (
    <Box width={"100%"}>
      <TableNative
        height="25rem"
        overflow="scroll"
        theadBackground={colorMode == "light" ? "rgba(255,255,255,1)" : style.modal.bg.contractModal}
        theadBottomBorder="none"
        data={leaderBoardTableData}
        bodyRowOnClick={(item: any) => {
          router.push(`/u/${item?.address}`);
        }}
        theadChildren={
          <>
            <Th
              style={{
                textAlign: "left",
                fontSize: "1.25rem",
                textTransform: "capitalize",
                color: `${colorMode == "light" ? "#000" : "#8f8f8f"}`,
                fontWeight: "500",
                marginLeft: `${style.padding.sm}`,
              }}
            >
              Rank
            </Th>
            <Th
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                textTransform: "capitalize",
                fontWeight: "500",
                paddingLeft: `${style.padding.xxs}`,
                color: `${colorMode == "light" ? "#000" : "#8f8f8f"}`,
              }}
            >
              Address
            </Th>
            <Th
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                textTransform: "capitalize",
                fontWeight: "500",
                color: `${colorMode == "light" ? "#000" : "#8f8f8f"}`,
              }}
            >
              XP
            </Th>
          </>
        }
        tbodyChildren={(item: any, index: any) => {
          return (
            <>
              <Td style={{ textAlign: "center", paddingLeft: `0px` }}>
                <Text color={colorMode == "light" ? "#000" : "#8f8f8f"} marginBottom={0} fontSize={style.font.h4}>
                  #{index + 1}
                </Text>
              </Td>
              <Td style={{ paddingLeft: `${style.padding.xxs}` }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box
                    width="2rem"
                    height="2rem"
                    marginRight={style.margin.xxs}
                  >
                    <Avatar size="2rem" name={item?.address} />
                  </Box>
                  <Text
                    paddingLeft={2}
                    fontSize={style.font.h4}
                    marginBottom={0}
                    fontWeight={style.fontWeight.dark}
                    color={colorMode == "light" ? "#000" : "#8f8f8f"}
                  >
                    {truncateAddress(item?.address)}
                  </Text>
                </Box>
              </Td>
              <Td
                style={{ textAlign: "center", padding: `${style.padding.sm}` }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Text mb={0} fontSize={style.font.h4} color={colorMode == "light" ? "#000" : "#8f8f8f"}>
                      {item?.xps_earned}
                    </Text>
                  </Box>
                </Box>
              </Td>
            </>
          );
        }}
      />
    </Box>
  );
};
export default LeaderboardTable;
