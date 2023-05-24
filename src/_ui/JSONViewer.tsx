import { style } from "@/styles/StyledConstants";
import React, { useState } from "react";

const JSONViewer = ({ data }: any) => {
  const [expanded, setExpanded] = useState<any>({});

  const handleToggle = (key: any) => {
    setExpanded((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderData = (data: any, key: any) => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{renderData(item, `${key}_${index}`)}</li>
          ))}
        </ul>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <div>
          <span onClick={() => handleToggle(key)} style={{ cursor: "pointer" }}>
            {expanded[key] ? "▼" : "►"}
          </span>
          {expanded[key] && (
            <ul>
              {Object.entries(data).map(([nestedKey, value]) => (
                <li key={nestedKey}>
                  <strong>{nestedKey}: </strong>
                  {renderData(value, `${key}_${nestedKey}`)}
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

  return (
    <div
      style={{
        overflow: "auto",
        height: "500px",
        width: "100%",
        border: `${style.card.border.hover}`,
        borderRadius: `${style.card.borderRadius.default}`,
        padding: "20px",
        marginLeft: `${style.margin.sm}`,
      }}
    >
      {renderData(data, "root")}
    </div>
  );
};

export default JSONViewer;
