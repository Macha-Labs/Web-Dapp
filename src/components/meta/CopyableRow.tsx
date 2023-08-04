import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";

type Props = {
  parameter?: string;
  value?: any;
  marginTop?: string;
};

const CopyableRow = ({ parameter, value, marginTop }: Props) => {
  const toast = useToast();
  return (
    <Box
      background={style.input.bg.default}
      padding={style.padding.xs}
      border={style.input.border.default}
      borderRadius={style.card.borderRadius.image}
      marginTop={marginTop ? style.margin[marginTop] : "0px"}
      _hover={{
        background: `${style.input.bg.active}`,
      }}
    >
      <FlexRow hrAlign="space-between">
        <Heading mb="0" fontSize={style.font.h6} width={"20%"}>
          {parameter}
        </Heading>

        <FlexRow hrAlign="flex-end" vrAlign="flex-start" width="80%">
          <Text
            mb="0"
            mr={style.margin.sm}
            width={"90%"}
            textAlign={"right"}
            color={style.color["white.5"]}
          >
            {value}
          </Text>
          <Box width={"5%"}>
            <IconBase
              slug="icon-copy"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast({
                  title: "Copied To Clipboard",
                  status: "success",
                  duration: 3000,
                });
              }}
            />
          </Box>
        </FlexRow>
      </FlexRow>
    </Box>
  );
};

export default CopyableRow;
