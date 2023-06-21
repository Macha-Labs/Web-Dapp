import { style } from "@/styles/StyledConstants";
import {
  Input,
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
  tableWidth: string;
  align: string;
};
function TableNative({ th = [], tr = [], tableWidth, align = "left" }: Props) {
  return (
    <TableContainer
      width={tableWidth}
      rounded={"md"}
      // style={{ borderColor: "#14244b", borderWidth: "1px" }}
    >
      <Table variant="unstyled" colorScheme="whiteAlpha" size="sm">
        <Thead>
          <Tr
            css={{
              background: style.card.bg.overview,
            }}
          >
            {th.map((item: any, index: number) => {
              return (
                <Th
                  key={index}
                  style={{
                    borderBottomColor: "#14244b",
                    borderRightColor: "#14244b",
                    borderWidth: "1px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    // borderRadius: "30px",
                    textAlign: { align },
                    color: "white",
                    fontWeight: "600",
                    fontSize: style.font.h6,
                    borderCollapse: "separate",
                    borderSpacing: "0 1rem",
                  }}
                >
                  {item}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {tr.map((dataobj: any, index: number) => {
            return (
              <Tr key={index}>
                {dataobj.map((data: any, index2: number) => {
                  return (
                    <Td
                      key={index2}
                      style={{
                        width: "fit-content",
                        borderColor: "#14244b",
                        borderWidth: "1px",
                        borderRadius: "30px",
                        textAlign: "center",
                        color: "white",
                        padding: "0px",
                      }}
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableNative;
