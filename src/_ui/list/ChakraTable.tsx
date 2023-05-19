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
    <TableContainer>
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            {th.map((item) => {
              return <Th>{item}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {tr.map((dataobj) => {
            return (
              <Tr>
                {dataobj.map((data) => {
                  return <Td>{data}</Td>;
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
