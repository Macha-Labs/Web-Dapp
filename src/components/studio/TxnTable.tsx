import IconBase from "@/_ui/icons/IconsBase";
import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Avatar, Flex, Td, Text, Th } from "@chakra-ui/react";
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
              <Th style={{ textAlign: "center", fontSize: "1rem" , paddingTop:"2rem" , paddingBottom:"2rem"}}>
                Txn Hash
              </Th>
              <Th style={{ textAlign: "center", fontSize: "1rem" , paddingTop:"2rem" , paddingBottom:"2rem"}}>
                Time of Creation
              </Th>
              <Th style={{ textAlign: "center", fontSize: "1rem" , paddingTop:"2rem" , paddingBottom:"2rem"}}>
                Method Name
              </Th>
              <Th style={{ textAlign: "center", fontSize: "1rem" , paddingTop:"2rem" , paddingBottom:"2rem"}}>From</Th>
              <Th style={{ textAlign: "center", fontSize: "1rem" , paddingTop:"2rem" , paddingBottom:"2rem"}}>To</Th>
            </>
          }
          tbodyChildren={(item: any) => {
            return (
              <>
                <Td
                  cursor={style.table.cursor.pointer}
                  onClick={() => {
                    router.push(
                      `/search/transaction/${item.transaction.txn_hash}`
                    );
                  }}
                  style={{ textAlign: "center" }}
                >
                  {truncateAddress(item?.transaction?.txn_hash)}
                </Td>
                <Td style={{ textAlign: "center" }}>{item?.timestamp}</Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex>
                    <IconBase slug="icon-code" style={{ paddingLeft: "sm" }} />
                    <Text paddingLeft={2} marginBottom={0}>
                      {item?.transaction?.method_name}
                    </Text>
                  </Flex>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex>
                    <Avatar
                      size="xxs"
                      src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                    />
                    <Text paddingLeft={2} marginBottom={0}>
                      {truncateAddress(item?.transaction?.from)}
                    </Text>
                  </Flex>
                </Td>
                <Td style={{ textAlign: "center" }}>
                  <Flex>
                    <Avatar
                      size="xxs"
                      src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                    />
                    <Text paddingLeft={2} marginBottom={0}>
                      {truncateAddress(item?.transaction?.to)}
                    </Text>
                  </Flex>
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
