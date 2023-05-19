import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FlexBody from "@/_ui/flex/FlexBody";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import ButtonMenu from "@/_ui/buttons/ButtonMenu";

function createMeta() {
  // <ButtonMenu
  //       text="Sort By"
  //       options={sortOptions}
  //       icon={{
  //         slug: "icon-chevron-down",
  //       }}
  //     />
  const [trigger, setTrigger] = useState(false);
  const [origin, setOrigin] = useState(false);
  const requestTypeOptions = [
    {
      value: "A-Z",
      onClick: () => {},
    },
    {
      value: "Z-A",
      onClick: () => {},
    },
    {
      value: "Last Created",
      onClick: () => {},
    },
    {
      value: "Last Modified",
      onClick: () => {},
    },
  ];
  return (
    <>
      <Navigation />
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
      <FlexBody>
        <FlexRow width="100%">
          <FlexColumn width="100%" vrAlign="flex-start">
            <FlexRow width="100%" hrAlign="space-between" margin="20px 0px">
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
                fontSize={"2xl"}
                fontWeight={700}
              >
                Complete Information For Meta
              </Text>
              <Button variant="state_brand">SAVE</Button>
            </FlexRow>
            <Text fontSize={"2xl"} fontWeight={700}>
              Scheme
            </Text>

            <InputLabel
              labelText="Add your meta schema"
              placeholder="Description"
              value=""
              padding="20px 0px"
            />
            <Text fontSize={"2xl"} fontWeight={700}>
              Trigger
            </Text>

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
              Add your meta Schema
            </Heading>
            <FlexRow width="50%" hrAlign="space-between">
              <Button variant="state_brand">
                <FlexRow>
                  <Text className="m-b-0">Get Request</Text>
                  <IconImage slug="icon-close" />
                </FlexRow>
              </Button>
              <Button variant="state_brand">
                <FlexRow>
                  <Text className="m-b-0">Post Request</Text>
                  <IconImage slug="icon-close" />
                </FlexRow>
              </Button>
            </FlexRow>
            <FlexRow padding="10px 0px">
              <Button
                variant="state_default_hover"
                onClick={() => {
                  setTrigger(true);
                }}
              >
                Create a new trigger
              </Button>
            </FlexRow>
            {trigger && (
              <FlexColumn
                width="100%"
                hrAlign="flex-start"
                vrAlign="flex-start"
              >
                <InputLabel
                  labelText="Name"
                  placeholder="Name"
                  value=""
                  padding="20px 0px"
                />
                <InputLabel
                  labelText="Description"
                  placeholder="Description"
                  value=""
                  padding="20px 0px"
                />
                <Heading
                  as="h6"
                  size="sm"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                  marginTop={"20px"}
                >
                  Request Type
                </Heading>
                <InputSelect
                  placeholder="search request type"
                  options={requestTypeOptions}
                  icon={{ slug: "icon-close" }}
                  variant={"state_default_hover"}
                  margin="0 0 20px 0"
                />
                <Heading
                  as="h6"
                  size="sm"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                  marginTop={"20px"}
                >
                  Request Method
                </Heading>
                <InputSelect
                  placeholder="search request method"
                  options={requestTypeOptions}
                  icon={{ slug: "icon-close" }}
                  variant={"state_default_hover"}
                  margin="0 0 20px 0"
                />
                <InputLabel
                  labelText="Request Parameter"
                  placeholder="Provide Parameter"
                  value=""
                  padding="20px 0px"
                />
                <FlexRow width="100%" hrAlign="space-between">
                  <Button variant={""}>Discard</Button>
                  <Button variant={"state_brand"}>Save</Button>
                </FlexRow>
              </FlexColumn>
            )}
            <Text fontSize={"2xl"} fontWeight={700}>
              Origins
            </Text>
            <FlexRow padding="10px 0px">
              <Button
                variant="state_default_hover"
                onClick={() => {
                  setOrigin(true);
                }}
              >
                Create Origin
              </Button>
            </FlexRow>
            {origin && (
              <FlexColumn
                width="100%"
                hrAlign="flex-start"
                vrAlign="flex-start"
              >
                <InputLabel
                  labelText="Request Schema"
                  placeholder="Request Schema"
                  value=""
                  padding="20px 0px"
                />
                <InputLabel
                  labelText="Request Schema CID"
                  placeholder="Request Schema CID"
                  value=""
                  padding="20px 0px"
                />
                <InputLabel
                  labelText="Request Headers"
                  placeholder="Request Headers"
                  value=""
                  padding="20px 0px"
                />
                <InputLabel
                  labelText="Request Endpoint"
                  placeholder="Request Endpoint"
                  value=""
                  padding="20px 0px"
                />
                <Heading
                  as="h6"
                  size="sm"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                  marginTop={"20px"}
                >
                  Request Type
                </Heading>
                <InputSelect
                  placeholder="search request type"
                  options={requestTypeOptions}
                  icon={{ slug: "icon-close" }}
                  variant={"state_default_hover"}
                  margin="0 0 20px 0"
                />
                <Heading
                  as="h6"
                  size="sm"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                  marginTop={"20px"}
                >
                  Request Method
                </Heading>
                <InputSelect
                  placeholder="search request method"
                  options={requestTypeOptions}
                  icon={{ slug: "icon-close" }}
                  variant={"state_default_hover"}
                  margin="0 0 20px 0"
                />
                <InputLabel
                  labelText="Request Parameter"
                  placeholder="Provide Parameter"
                  value=""
                  padding="20px 0px"
                />
                <FlexRow width="100%" hrAlign="space-between">
                  <Button variant={""}>Discard</Button>
                  <Button variant={"state_brand"}>Save</Button>
                </FlexRow>
              </FlexColumn>
            )}
            <Text fontSize={"2xl"} fontWeight={700}>
              Access
            </Text>
            <ButtonMenu
              options={requestTypeOptions}
              text="Select access type"
            />
            <InputLabel
              labelText="User Address For Restricted Access"
              placeholder="User Address For Restricted Access"
              value=""
              padding="20px 0px"
            />
          </FlexColumn>
          <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
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
