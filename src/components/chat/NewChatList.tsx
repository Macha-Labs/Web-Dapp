import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";

import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const NewChatList = () => {
  return (
    <Box width="35%" borderRight={style.input.border.search} height="100vh">
      <FlexColumn width="90%" zIndex="500" vrAlign="flex-start" height="full">
        <Button variant="state_card" width="full" marginBottom="1rem">
          Create New
        </Button>
        <InputSearch />
        <Box
          width="full"
          style={{
            background: `${style.modal.bg.default}`,

            padding: `${style.padding.xxs}`,
            marginTop: `${style.margin.xs}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: `${style.input.borderRadius.default}`,
          }}
        >
          <Text margin={0} _hover={{ textDecoration: "underline", cursor: "pointer" }}>
            How to handle Webpack errors
          </Text>
          <Text color="grey" margin={0}>A brief description </Text>
        </Box>
        <Box
          width="full"
          style={{
            background: `${style.modal.bg.default}`,

            padding: `${style.padding.xxs}`,
            marginTop: `${style.margin.xs}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: `${style.input.borderRadius.default}`,
          }}
        >
          <Text margin={0} _hover={{ textDecoration: "underline", cursor: "pointer" }}>
            Explain layer2 
          </Text>
          <Text color="grey" margin={0}>A brief description </Text>
        </Box>
      </FlexColumn>
    </Box>
  );
};

export default NewChatList;
