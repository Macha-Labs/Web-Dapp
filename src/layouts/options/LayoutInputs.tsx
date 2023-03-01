import usePortalChannel from "@/hooks/portal/usePortalChannel";
import { Channel$ } from "@/schema/channel";
import { StyledCard } from "@/styles/StyledComponents";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { text } from "stream/consumers";

const LayoutInputs = (props: any) => {
  const [data, setData] = useState("");
  const hookPortalChannel = usePortalChannel(Channel$({}));
  console.log("here");
  return (
    <div className={props.style.class}>
      {props.data.map((item: any, index: any) => {
        return (
          <Input
            key={index}
            placeholder={item?.label}
            value={
              item.key === "name"
                ? hookPortalChannel?.channel?.name
                : hookPortalChannel?.channel?.description
            }
            onChange={e =>
              hookPortalChannel?.setChannel({
                ...hookPortalChannel?.channel,
                [item.key]: e.target.value,
              })
            }
            disabled={item.disabled}
            className="m-b-0-5"
          />
        );
      })}
    </div>
  );
};
export default LayoutInputs;
