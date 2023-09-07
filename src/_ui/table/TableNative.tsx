import { style } from "@/styles/StyledConstants";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

type Prop = {
  data: any;
  theadChildren: any;
  tbodyChildren: any;
  height?: string;
  theadBottomBorder?: string;
  overflow?: any;
  theadBackground?: string;
  theadSticky?: boolean;
  disabled?: boolean;
};

const TableNative = ({
  data,
  tbodyChildren,
  theadChildren,
  height,
  theadBottomBorder,
  overflow,
  theadBackground,
  disabled,
}: Prop) => {
  return (
    <div>
      <TableContainer
        width="100%"
        overflowY={overflow ? overflow : "hidden"}
        height={height && height}
        overflowX="hidden"
        // rounded={"md"}
      >
        <Table variant="unstyled" colorScheme="whiteAlpha" size="md">
          <Thead
            position="sticky"
            top={0}
            zIndex="docked"
            background={theadBackground}
            borderBottom={
              theadBottomBorder ? theadBottomBorder : style.nav.border.default
            }
          >
            <Tr>{theadChildren}</Tr>
          </Thead>
          <Tbody overflow="hidden">
            {data?.map((item: any, index: any) => {
              return (
                <Tr
                  _hover={{
                    transform: `${!disabled ? "scale(1.01,1.01)" : ""}`,
                    transition: `${
                      !disabled
                        ? "all 0.2s cubic-bezier(0.64, 0.04, 0.35, 1)"
                        : ""
                    }`,
                    background: `${!disabled ? style.table.bg.hover : ""}`,
                  }}
                  key={item._id}
                >
                  {tbodyChildren(item, index)}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableNative;
