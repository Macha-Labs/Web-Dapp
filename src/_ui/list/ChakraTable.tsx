import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
type Props = {
  variant?: string;
  th: any[];
  tr: any;
};
function ChakraTable({ th = [], tr = [] }: Props) {
  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            {th.map((item: any, index: number) => {
              return <Th key={index}>{item}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {tr.map((dataobj: any, index: number) => {
            return (
              <Tr key={index}>
                {dataobj.map((data: any, index2: number) => {
                  return <Td key={index2}>{data}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ChakraTable;
