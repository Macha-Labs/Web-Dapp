import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import TableNative from "@/_ui/list/TableNative";
import NavBlock from "@/_ui/nav/NavBlock";
import NavLeft from "@/_ui/nav/NavLeft";
import Tabs from "@/_ui/tabs/Tabs";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";

export default function Settings() {
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

  const renderBody = () => {
    return (
      <>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              options={dashboardNav}
              gstyle={{ fontSize: `${style.fontH5}`, fontWeight: "600" }}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <FlexRow hrAlign="flex-start">
            <Text
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
          <TableNative
            tableWidth="100%"
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
          <FlexRow hrAlign="flex-start" marginTop={"sm"}>
            <ButtonNative variant="state_default_hover">
              Create New API keys
            </ButtonNative>
          </FlexRow>
          <FlexRow hrAlign="flex-start" marginTop={"sm"}>
            <Text fontSize={"2xl"} fontWeight={700}>
              New API Keys
            </Text>
          </FlexRow>
          <FlexColumn vrAlign="flex-start">
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
                // data={[
                //   { label: "API Key Name", value: "", onChange: () => {} },
                // ]}
                style={{ class: "" }}
              />
            </StyledCard>
          </FlexColumn>
          <FlexRow width="100%" hrAlign="flex-end">
            <ButtonNative variant="state_brand" text="Create API" />
          </FlexRow>
        </FlexBody>
      </>
    );
  };
  return (
    <FlexWindow navLeft={<NavLeft />} rightElem={renderBody()}></FlexWindow>
  );
}
