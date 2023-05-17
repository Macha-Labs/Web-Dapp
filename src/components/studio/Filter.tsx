import React from "react";
import ChatSearch from "../chat/chatcontainer/ChatSearch";
import FlexRow from "@/_ui/flex/FlexRow";
import { Text } from "@chakra-ui/react";
import { IconSVG } from "@/_ui/icons/IconSVG";
import { BorderBox } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";

export default function SearchAndFilter() {
  return (
    <BorderBox>
      <FlexRow width="max-content">
        <Text className="mb-0 me-1" color={style.button.color}>
          Filter By
        </Text>
        <IconSVG path="icon-search" />
      </FlexRow>
    </BorderBox>
  );
}
