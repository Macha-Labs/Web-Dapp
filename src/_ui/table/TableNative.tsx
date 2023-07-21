import { style } from "@/styles/StyledConstants";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";

type Prop = {
  data: any
  theadChildren: any,
  tbodyChildren: any
}

const TableNative = ({ data, tbodyChildren, theadChildren }: Prop) => {

  return (
    <div>
      <TableContainer
        width="100%"
        // rounded={"md"}
      >
        <Table style={{ overflow: "hidden"}} variant="unstyled" colorScheme="whiteAlpha" size="md">
          <Thead borderBottom={style.table.border.thead}>
            <Tr
            >
              {theadChildren}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item: any) => {
              return (
                <Tr
                  _hover={{
                    transform: "scale(1.01,1.01)",
                    background: `${style.table.bg.hover}`
                  }}
                  key={item._id}
                >
                  {tbodyChildren(item)}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default TableNative