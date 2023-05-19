import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import FlexBody from "@/_ui/flex/FlexBody";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import LayoutInputs from "@/layouts/options/LayoutInputs";

function createMeta() {
  return (
    <>
      <Navigation />
      <FlexBody>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs
              options={[
                {
                  value: "Back",
                  href: "",
                },
              ]}
              gstyle={{ fontSize: `${style.fontH6}`, fontWeight: "600" }}
              icon={{ slug: "icon-chevron" }}
            />
          </FlexRow>
        </NavBlock>
        <FlexRow width="100%">
          <FlexColumn width="100%" vrAlign="flex-start">
            <FlexRow width="100%" hrAlign="space-between">
              <Text>Complete Information For Meta</Text>
              <Button variant="state_brand">SAVE</Button>
            </FlexRow>
            <Text>Scheme</Text>

            <StyledCol style={{ width: "100%" }}>
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
                Description
              </Heading>
              <StyledCard className="m-b-1">
                <LayoutInputs
                  data={[
                    { label: "Description", value: "", onChange: () => {} },
                  ]}
                  style={{ class: "" }}
                />
              </StyledCard>
            </StyledCol>
          </FlexColumn>
          <FlexColumn width="100%">
            <FlexRow width="100%" hrAlign="flex-end">
              <Text>Complete Information For Meta</Text>
              <Button variant="state_brand">SAVE</Button>
            </FlexRow>
          </FlexColumn>
        </FlexRow>
      </FlexBody>
    </>
  );
}

export default createMeta;
