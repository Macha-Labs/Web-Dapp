import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import InputSearch from "@/_ui/input/InputSearch";
import NavTop from "@/_ui/nav/NavTop";
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
import { ConnectWalletButton } from "../ConnectWalletButton";

type Prop = {
  txnData: any;
  displayFrom?: boolean;
};

const TxnTable = ({ txnData, displayFrom = true }: Prop) => {
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
              {displayFrom && (
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
              )}
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
            const dateObj = timeStampConversion(item?.timestamp);
            const timestamp = `${dateObj.date} ${dateObj.time}`;

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
                      src="https://ik.imagekit.io/macha/icons/svg/miscelleneous/coloured-successful.svg?updatedAt=1690531996993"
                      alt=""
                      height="1.5rem"
                    />
                    <Text paddingLeft={2} marginBottom={0}>
                      {timestamp}
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
                      <Flex width="2.1rem" height="2.1rem" justifyContent="center" alignItems="center" >
                      <IconBase
                        size="lg" 
                        slug="icon-coloured-deploy"
                        style={{ paddingLeft: "sm" }}
                      />
                      </Flex>
                      
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
                {displayFrom && (
                  <Td style={{ textAlign: "center", paddingBottom: "0" }}>
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
                          src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826"
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
                )}
                <Td style={{ textAlign: "center", paddingBottom: "0" }}>
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
                        src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826"
                      />
                    </Box>
                    <Text
                      paddingLeft={2}
                      marginBottom={0}
                      // _hover={{ textDecoration: "underline" }}
                      cursor={style.table.cursor.pointer}
                      // onClick={() => {
                      //   router.push(
                      //     `/search/accounts/${item?.transaction?.to}`
                      //   );
                      // }}
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
