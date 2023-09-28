import FlexColumn from "@/_ui/flex/FlexColumn";
import InputSearch from "@/_ui/input/InputSearch";
import { style } from "@/styles/StyledConstants";

import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

const NewChatList = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      width="35%"
      borderRight={
        colorMode == "light"
          ? style.nav.border.light
          : style.input.border.search
      }
      height="70vh"
    >
      <FlexColumn width="90%" zIndex="500" vrAlign="flex-start" height="full">
        <Button
          variant="state_card"
          width="full"
          marginBottom="1rem"
          backgroundColor={colorMode == "light" ? "#fff" : ""}
        >
          <Text color={colorMode == "light" ? "black" : ""} m={0}>Create New</Text>
        </Button>
        <InputSearch />
        <Box
          width="full"
          style={{
            // background: `${style.modal.bg.default}`,
            background: `${
              colorMode == "light" ? "#f2f5fd" : style.modal.bg.default
            }`,
            padding: `${style.padding.xxs}`,
            marginTop: `${style.margin.xs}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: `${style.input.borderRadius.default}`,
          }}
        >
          <Text
            margin={0}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            color={colorMode == "light" ? "black" : ""}
          >
            How to handle Webpack errors
          </Text>
          <Text color="grey" margin={0}>
            A brief description{" "}
          </Text>
        </Box>
        <Box
          width="full"
          style={{
            background: `${
              colorMode == "light" ? "#f2f5fd" : style.modal.bg.default
            }`,
            padding: `${style.padding.xxs}`,
            marginTop: `${style.margin.xs}`,
            boxShadow: `${style.card.shadow.default}`,
            borderRadius: `${style.input.borderRadius.default}`,
          }}
        >
          <Text
            margin={0}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
            color={colorMode == "light" ? "black" : ""}
          >
            Explain layer2
          </Text>
          <Text color="grey" margin={0}>
            A brief description{" "}
          </Text>
        </Box>
      </FlexColumn>
    </Box>
  );
};

export default NewChatList;
