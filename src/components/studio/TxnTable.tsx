import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TableNative from "@/_ui/table/TableNative";
import {
  timeStampConversion,
  truncateAddress,
  truncateString,
} from "@/helpers";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Stack,
  Td,
  Text,
  Th,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

type Prop = {
  txnData: any;
};

const TxnTable = ({ txnData }: Prop) => {
  const router = useRouter();

  return (
    <div>
      {txnData && (
        <TableNative
          data={txnData}
          theadChildren={
            <>
              <Th
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  textTransform: "capitalize",
                }}
              >
                Txn Hash
              </Th>
              <Th
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  textTransform: "capitalize",
                }}
              >
                Time of Creation
              </Th>
              <Th
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  textTransform: "capitalize",
                }}
              >
                Method Name
              </Th>
              <Th
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  textTransform: "capitalize",
                }}
              >
                From
              </Th>
              <Th
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  textTransform: "capitalize",
                }}
              >
                To
              </Th>

              {/* <Box width="100%">
                <Divider
                  orientation="horizontal"
                  borderColor="#004ad9"
                  border={style.card.border.meta}
                  height="5px"
                  width={0}
                />
              </Box> */}
            </>
          }
          tbodyChildren={(item: any) => {
            return (
              <>
                <Td
                  _hover={{ textDecoration: "underline" }}
                  cursor={style.table.cursor.pointer}
                  onClick={() => {
                    router.push(
                      `/search/transaction/${item?.transaction?.txn_hash}`
                    );
                  }}
                  style={{
                    textAlign: "center",
                    paddingTop: `${style.padding.lg}`,
                    paddingBottom: `${style.padding.lg}`,
                  }}
                >
                  {truncateAddress(item?.transaction?.txn_hash)}
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-successful.svg?updatedAt=1689916345779"
                      alt=""
                      height="1.5rem"
                    />
                    <Text paddingLeft={2} marginBottom={0}>
                      {timeStampConversion(item?.timestamp)}
                    </Text>
                  </Box>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "50%",
                        alignItems: "center",
                      }}
                    >
                      <IconBase
                        slug="icon-colored-deploy"
                        style={{ paddingLeft: "sm" }}
                      />
                      <Text
                        paddingLeft={2}
                        marginBottom={0}
                        width="80%"
                        textAlign="center"
                      >
                        {truncateString(item?.transaction?.method_name, 20)}
                      </Text>
                    </Box>
                  </Box>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Box width="2.1rem" height="2.1rem">
                      <Avatar
                        size="xxs"
                        src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                      />
                    </Box>
                    <Text
                      paddingLeft={2}
                      marginBottom={0}
                      _hover={{ textDecoration: "underline" }}
                      cursor={style.table.cursor.pointer}
                      onClick={() => {
                        router.push(
                          `/search/accounts/${item?.transaction?.from}`
                        );
                      }}
                    >
                      {truncateAddress(item?.transaction?.from)}
                    </Text>
                  </Box>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Box width="2.1rem" height="2.1rem">
                      <Avatar
                        size="xxs"
                        src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                      />
                    </Box>
                    <Text
                      paddingLeft={2}
                      marginBottom={0}
                      _hover={{ textDecoration: "underline" }}
                      cursor={style.table.cursor.pointer}
                      onClick={() => {
                        router.push(
                          `/search/accounts/${item?.transaction?.to}`
                        );
                      }}
                    >
                      {truncateAddress(item?.transaction?.to)}
                    </Text>
                  </Box>
                </Td>
              </>
            );
          }}
        />
      )}
    </div>
  );
};
export default TxnTable;
