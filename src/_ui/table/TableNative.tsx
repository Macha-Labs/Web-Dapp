import { truncateAddress, truncateString } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

type Prop = {
  data: any
  theadChildren: any,
  tbodyChildren: any
}

const TableNative = ({data,tbodyChildren,theadChildren}: Prop) => {
  return (
    <div>
      <TableContainer
        width="100%"
        rounded={"md"}
      >
        <Table style={{ marginTop: style.margin["sm"] }} variant="unstyled" colorScheme="whiteAlpha" size="md">
          <Thead>
            <Tr
              css={{
                background: style.table.bg.default,
                borderColor: style.table.borderColor.default,
              }}
            >
              {theadChildren}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item: any) => {
              return (
                <Tr
                  key={item._id}
                  style={{
                    borderBottom: `${style.card.border.default}`,
                    // width: "100%",
                  }}
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