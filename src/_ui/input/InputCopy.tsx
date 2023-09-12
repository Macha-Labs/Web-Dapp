import FlexRow from "@/_ui/flex/FlexRow";
import { truncateString } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Box, Button, Heading, Text, useColorMode, useToast } from "@chakra-ui/react";

type Props = {
  parameter?: string;
  value?: any;
  marginTop?: string;
  lastChild?: boolean;
  firstChild?: boolean;
};

const InputCopy = ({
  parameter,
  value,
  marginTop,
  lastChild,
  firstChild,
}: Props) => {

  const toast = useToast();
  const {colorMode} = useColorMode()
  return (
    <Box
      marginTop={!firstChild && style.margin.md}
      paddingBottom={!lastChild && style.margin.md}
      borderBottom={!lastChild && style.card.border.card}
      width={"100%"}
    >
      <FlexRow hrAlign="space-between">
        <Heading color={colorMode == "light" ? "#282828" : ""} mb="0" fontSize={style.font.h6} width={"20%"}>
          {parameter}
        </Heading>

        <FlexRow hrAlign="flex-end" vrAlign="flex-start" width="80%">
          <Text
            mb="0"
            mr={style.margin.sm}
            width={"90%"}
            textAlign={"right"}
            color={colorMode == "light" ? "#282828" : style.color["white.5"]}
          >
            {truncateString(JSON.stringify(value), 50)}
          </Text>
          <Box width={"7%"}>
            <Button
              size="xs"
              _hover={{
                background: `${colorMode == "light" ? "" : ""}`
              }}
              width="100%"
              color={"#ffff"}
              backgroundColor={colorMode == "light" ? "#197cec" : ""}
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast({
                  title: "Copied To Clipboard",
                  status: "success",
                  duration: 3000,
                });
              }}
            >
              Copy
            </Button>
            {/* <IconBase
              slug="icon-copy"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast({
                  title: "Copied To Clipboard",
                  status: "success",
                  duration: 3000,
                });
              }}
            /> */}
          </Box>
        </FlexRow>
      </FlexRow>
    </Box>
  );
};

export default InputCopy;
