import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

type Prop = {
  txnData: any;
};

const InteractionTable = ({ txnData }: Prop) => {
  const router = useRouter();

  return (
    <div>
      {
        <TableNative
          data={txnData}
          theadChildren={
            <>
              <Th style={style.table.Th}>Who</Th>
              <Th style={style.table.Th}>Action</Th>
              <Th style={style.table.Th}>To</Th>
              <Th style={style.table.Th}>When</Th>
            </>
          }
          tbodyChildren={(item: any) => {
            return (
              <>
                <Td
                  // cursor={style.table.cursor.pointer}
                  // onClick={() => {
                  //   router.push(
                  //     `/search/transaction/${item.transaction.txn_hash}`
                  //   );
                  // }}
                  style={style.table.Td}
                >
                  {truncateAddress(item?.transaction?.from)}{" "}
                </Td>
                <Td style={style.table.Td}>
                  {(item?.transaction?.method_name)}
                </Td>
                <Td style={style.table.Td}>{truncateAddress(item?.transaction?.to)}</Td>
                <Td style={style.table.Td}>
                  {truncateAddress(item?.timestamp)}
                </Td>
              </>
            );
          }}
        />
      }
    </div>
  );
};

// const InteractionTable = () => {
//   return (
//     <>
//       <TableContainer>
//         <Table>
//           <Thead>
//             <Tr>
//               <Th style={style.table.Th}>Who</Th>
//               <Th style={style.table.Th}>Action</Th>
//               <Th style={style.table.Th}>To</Th>
//               <Th style={style.table.Th}>When</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             <Tr>
//               <Td style={style.table.Td}>inches</Td>
//               <Td style={style.table.Td}>millimetres (mm)</Td>
//               <Td style={style.table.Td} isNumeric>
//                 25.4
//               </Td>
//               <Td style={style.table.Td}>yards</Td>
//             </Tr>
//             <Tr>
//               <Td style={style.table.Td}>feet</Td>
//               <Td style={style.table.Td}>centimetres (cm)</Td>
//               <Td style={style.table.Td} isNumeric>
//                 30.48
//               </Td>
//               <Td style={style.table.Td}>yards</Td>
//             </Tr>
//             <Tr>
//               <Td style={style.table.Td}>yards</Td>
//               <Td style={style.table.Td}>metres (m)</Td>
//               <Td style={style.table.Td}>metres (m)</Td>
//               <Td style={style.table.Td} isNumeric>
//                 0.91444
//               </Td>
//             </Tr>
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };
export default InteractionTable;
