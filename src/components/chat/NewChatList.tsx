import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const NewChatList = () => {
  return (
    <>
      <FlexColumn width="30%" zIndex="500" vrAlign="flex-start" height="full">
        <Button variant="state_brand" marginBottom="1rem">
          Create New
        </Button>
        <InputSearch />
        <Box
          style={{
            background: `${style.card.bg.overview}`,
            // border: `${style.card.border.hover}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: `${style.card.borderRadius.default}`,
          }}
        >
          <Text>How to handle Webpack errors</Text>
        </Box>
      </FlexColumn>
    </>
  );
};

export default NewChatList;
