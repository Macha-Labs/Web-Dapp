import { style } from "@/styles/StyledConstants";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import IconBase from "./icons/IconsBase";

const JSONViewer = ({ data }: any) => {
  const [expanded, setExpanded] = useState<any>({});

  const handleToggle = (key: any) => {
    setExpanded({
      ...expanded,
      [key]: !expanded[key],
    });
  };

  const renderData = (data: any, key: any) => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li
              key={index}
              style={{ listStyleType: "none", marginTop: style.margin["xs"] }}
            >
              {renderData(item, `${key}_${index}`)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <div>
          <span onClick={() => handleToggle(key)} style={{ cursor: "pointer" }}>
            {expanded[key] ? (
              <IconBase slug="icon-chevron-down" size="md" />
            ) : (
              <IconBase slug="icon-chevron-next" size="md" />
            )}
          </span>
          {expanded[key] && (
            <ul className="testing-1" style={{ paddingLeft: "0" }}>
              {Object.entries(data).map(([nestedKey, value]) => (
                <li
                  key={nestedKey}
                  style={{
                    listStyleType: "none",
                    marginTop: style.margin["xs"],
                  }}
                >
                  <Flex>
                    <Box>
                      <strong>{nestedKey}: </strong>
                    </Box>
                    <Box>{renderData(value, `${key}_${nestedKey}`)}</Box>
                  </Flex>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    } else {
      return <span>{JSON.stringify(data)}</span>;
    }
  };

  // console.log("keys", );

  return (
    <div
      className="no-scrollbar"
      style={{
        overflow: "auto",
        height: "500px",
        width: "100%",

        // borderRadius: `${style.card.borderRadius.default}`,
        // padding: "20px",
        // marginLeft: `${style.margin.sm}`,
      }}
    >
      {renderData(data, "root")}
    </div>
  );
};

export default JSONViewer;
