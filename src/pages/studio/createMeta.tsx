import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import useMeta from "@/hooks/studio/useMeta";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

function createMeta() {
  const [trigger, setTrigger] = useState<any>(false);
  const [origin, setOrigin] = useState<any>(false);
  const [triggerType, setTriggerType] = useState<any>(null);
  const [methodTypeOptions, setMethodTypeOptions] = useState<any>([]);
  const hookMeta = useMeta();


  const requestTypeOptions = [ 'Graph', 'Rest', "Contract"];

  const settingRequestType = (requestType: string) => {
    requestType == "Graph"
      ? setMethodTypeOptions(["Query", "Mutation"])
      : requestType == "Rest"
      ? setMethodTypeOptions(["GET", "POST"])
      : setTriggerType("Contract");
  };

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
              inputType="text"
              labelText="Add your meta schema"
              placeholder="Description"
              defaultValue=""
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

            {/* ------------------------------------------ Trigger start ------------------------------------------ */}
            {trigger && (
              <FlexColumn
                width="100%"
                hrAlign="flex-start"
                vrAlign="flex-start"
              >
                <InputLabel
                  elementRef={(element: any) =>
                    (hookMeta.metaOverview.current["triggerName"] = element)
                  }
                  inputType="text"
                  labelText="Name"
                  placeholder="Trigger Name"
                  defaultValue=""
                  padding="20px 0px"
                />

                <InputLabel
                  elementRef={(element: any) =>
                    (hookMeta.metaOverview.current["triggerDescription"] =
                      element)
                  }
                  inputType="text"
                  labelText="Description"
                  placeholder="Description"
                  defaultValue=""
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
                  onChangeHandler={settingRequestType}
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
                  options={methodTypeOptions}
                  icon={{ slug: "icon-close" }}
                  variant={"state_default_hover"}
                  margin="0 0 20px 0"
                />

                <InputLabel
                  inputType="text"
                  labelText="Request Parameter"
                  placeholder="Provide Parameter"
                  defaultValue=""
                  padding="20px 0px"
                />

                <FlexRow width="100%" hrAlign="space-between">
                  <Button variant={""}>Discard</Button>
                  <Button variant={"state_brand"}>Save</Button>
                </FlexRow>
              </FlexColumn>
            )}

            {/* ---------------------------------------------- Trigger End -------------------------------------------- */}

            {/* ---------------------------------------------- Origin Start -------------------------------------------- */}
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
                  elementRef={(element: any) =>
                    (hookMeta.metaOverview.current["originSchema"] = element)
                  }
                  inputType="text"
                  labelText="Request Schema"
                  placeholder="Request Schema"
                  defaultValue=""
                  padding="20px 0px"
                />
                {/* <InputLabel
                  inputType="text"
                  labelText="Request Schema CID"
                  placeholder="Request Schema CID"
                  defaultValue=""
                  padding="20px 0px"
                /> */}
                {/* <InputLabel
                  inputType="text"
                  labelText="Request Headers"
                  placeholder="Request Headers"
                  defaultValue=""
                  padding="20px 0px"
                /> */}
                <InputLabel
                  elementRef={(element: any) =>
                    (hookMeta.metaOverview.current["originEndpoint"] = element)
                  }
                  inputType="text"
                  labelText="Request Endpoint"
                  placeholder="Request Endpoint"
                  defaultValue=""
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
                  elementRef={(element: any) =>
                    (hookMeta.metaOverview.current["originRequestParameters"] =
                      element)
                  }
                  inputType="text"
                  labelText="Request Parameter"
                  placeholder="Provide Parameter"
                  defaultValue=""
                  padding="20px 0px"
                />
                <FlexRow width="100%" hrAlign="space-between">
                  <Button variant={""}>Discard</Button>
                  <Button variant={"state_brand"}>Save</Button>
                </FlexRow>
              </FlexColumn>
            )}

            {/* ---------------------------------------------- Origin End -------------------------------------------- */}

            <Text fontSize={"2xl"} fontWeight={700}>
              Access
            </Text>

            <ButtonMenu
              options={requestTypeOptions}
              text="Select access type"
            />

            <InputLabel
              inputType="text"
              labelText="User Address For Restricted Access"
              placeholder="User Address For Restricted Access"
              defaultValue=""
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
