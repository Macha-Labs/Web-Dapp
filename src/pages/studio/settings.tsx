import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import ChakraTable from "@/_ui/list/ChakraTable";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import SearchAndFilter from "@/components/studio/SearchAndFilter";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text } from "@chakra-ui/react";

export default function DashBoard() {
  const dashboardNav: any = [
    {
      value: "API Keys",
      href: "",
    },
    {
      value: "Billing",
      href: "",
    },
  ];

  return (
    <>
      <Navigation />

      <FlexWindow>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs
              options={dashboardNav}
              gstyle={{ fontSize: `${style.fontH5}`, fontWeight: "600" }}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <FlexRow padding="10px 0px">
            <Text
              className="m-b-0"
              bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
              bgClip="text"
              fontWeight={700}
            >
              Your API Keys
            </Text>
          </FlexRow>
          <ChakraTable
            th={["Name", "API Key", "Time of creation", ""]}
            tr={[
              [
                "ABX_NAME",
                "10203e418r02 1r1riquvcsoicohaud9&ndaq",
                "29-2-2020",
                "Delete",
              ],
              [
                "ABX_NAME",
                "10203e418r02 1r1riquvcsoicohaud9&ndaq",
                "29-2-2020",
                "Delete",
              ],
              [
                "ABX_NAME",
                "10203e418r02 1r1riquvcsoicohaud9&ndaq",
                "29-2-2020",
                "Delete",
              ],
            ]}
          />
          <FlexRow padding="10px 0px">
            <Button variant="state_default_hover">Create New API keys</Button>
          </FlexRow>
          <FlexRow>
            <Text fontSize={"2xl"} fontWeight={700}>
              New API Keys
            </Text>
          </FlexRow>
          <StyledCol>
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
              Name
            </Heading>
            <StyledCard className="m-b-1">
              <LayoutInputs
                data={[
                  { label: "API Key Name", value: "", onChange: () => {} },
                ]}
                style={{ class: "" }}
              />
            </StyledCard>
          </StyledCol>
          <FlexRow width="100%" hrAlign="flex-end">
            <ButtonNative variant="state_brand" text="Create Api" />
          </FlexRow>
        </FlexBody>
      </FlexWindow>
    </>
  );
}
