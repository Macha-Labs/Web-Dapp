import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import MetaOrigins from "./MetaOrigins";
import MetaTriggers from "./MetaTriggers";
import CardPannel from "@/_ui/cards/CardPannel";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import MetaCreateModal from "./MetaCreateModal";

function MetaSettings() {
  const hookMeta = useMetaCreate();
  const triggerModal = useDisclosure();
  const originModal = useDisclosure();
  const metaModal = useDisclosure();
  return (
    <>
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
              Setup Meta Details
            </Text>
          </FlexRow>
          <FlexColumn width="100%">
            <CardNative>
              <FlexRow hrAlign="space-between">
                <FlexRow hrAlign="flex-start">
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                  <Heading as="h4" fontSize="18" className="m-l-0-5">
                    Meta Name
                  </Heading>
                </FlexRow>
                <ButtonNative
                  onClick={metaModal.onOpen}
                  text="Edit Details"
                  variant="state_default_hover"
                  size="sm"
                />
              </FlexRow>
            </CardNative>
            <CardPannel
              header={
                <FlexRow hrAlign="space-between">
                  <Heading as="h6" fontSize="16" className="m-b-0">
                    Triggers
                  </Heading>
                  <ButtonNative
                    onClick={triggerModal.onOpen}
                    text="Add New"
                    variant="state_default_hover"
                    size="sm"
                  />
                </FlexRow>
              }
              margin={"xs"}
            ></CardPannel>
            <CardPannel
              header={
                <FlexRow hrAlign="space-between">
                  <Heading as="h6" fontSize="16" className="m-b-0">
                    Origins
                  </Heading>
                  <ButtonNative
                    onClick={originModal.onOpen}
                    text="Add New"
                    variant="state_default_hover"
                    size="sm"
                  />
                </FlexRow>
              }
              margin={"xs"}
            ></CardPannel>
            <ButtonNative
              text="test button"
              onClick={() => {
                console.log("Meta Overview ", hookMeta.metaOverview.current);
                console.log("Meta Trigger ", hookMeta.metaTrigger.current);
                console.log("Meta Origin ", hookMeta.metaOrigin.current);
              }}
            />
          </FlexColumn>

          <Text fontSize={"2xl"} fontWeight={700}>
            Schema
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
        </FlexColumn>

        <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
          <FlexRow width="100%" hrAlign="flex-end">
            {/* <Text>Complete Information For Meta</Text>
          <Button
            variant="state_brand"
            onClick={() => {
              hookMeta.publishMeta();
            }}
          >
            SAVE
          </Button> */}
          </FlexRow>
        </FlexColumn>
      </FlexRow>

      <MetaTriggers modal={triggerModal} />
      <MetaOrigins modal={originModal} />
      <MetaCreateModal hookMeta={hookMeta} metaModal={metaModal} />
    </>
  );
}

export default MetaSettings;
