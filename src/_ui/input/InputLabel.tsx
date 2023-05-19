import LayoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import { Heading } from "@chakra-ui/react";
import React from "react";
import FlexColumn from "../flex/FlexColumn";

type Props = {
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  padding?: string;
};

function InputLabel({
  labelText,
  placeholder,
  value,
  onChange,
  padding,
}: Props) {
  return (
    <FlexColumn width="100%" vrAlign="flex-start" padding={padding}>
      <Heading
        as="h6"
        size="sm"
        bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
        bgClip="text"
      >
        {labelText}
      </Heading>
      <StyledCard className="w-100">
        <LayoutInputs
          data={[
            {
              label: ` ${placeholder}`,
              value: `${value}`,
              onChange: `${onChange}`,
            },
          ]}
          style={{ class: "" }}
        />
      </StyledCard>
    </FlexColumn>
  );
}

export default InputLabel;
