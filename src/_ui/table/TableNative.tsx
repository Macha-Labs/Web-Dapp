import { style } from "@/styles/StyledConstants";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";

type Prop = {
  data: any
  theadChildren: any,
  tbodyChildren: any,
  height?: string,
}

const TableNative = ({ data, tbodyChildren, theadChildren,height}: Prop) => {

  return (
    <div>
      <TableContainer
        width="100%"
        height={height && height}
        overflow="hidden"
        // rounded={"md"}
      >
        <Table style={{ overflow: "hidden"}} variant="unstyled" colorScheme="whiteAlpha" size="md">
          <Thead borderBottom={style.nav.border.default} position="sticky" top={0} zIndex="docked">
            <Tr>
              {theadChildren}
            </Tr>
          </Thead>
          <Tbody overflow= "hidden">
            {data?.map((item: any,index: any) => {
              return (
                <Tr
                  _hover={{
                    transform: "scale(1.01,1.01)",
                    transition: "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)",
                    background: `${style.table.bg.hover}`,
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