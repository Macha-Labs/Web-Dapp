import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import {
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MetaOrigins from "./MetaOrigins";
import MetaTriggers from "./MetaTriggers";
import CardPannel from "@/_ui/cards/CardPannel";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import MetaCreateModal from "./MetaCreateModal";
import useMetaStore from "@/store/useMetaStore";
import useAuthStore from "@/store/useAuthStore";
import MetaEditModal from "./MetaEditModal";

function MetaSettings() {
  const hookMeta = useMetaCreate();
  const triggerModal = useDisclosure();
  const originModal = useDisclosure();
  const metaModal = useDisclosure();
  const metaEditModal = useDisclosure();
  const $macha = useAuthStore((state: any) => state.macha);
  const toast = useToast();

  const $overviewData = useMetaStore((state: any) => state.overviewData);
  const $triggerData = useMetaStore((state: any) => state.triggerData);
  const $originData = useMetaStore((state: any) => state.originData);
  console.log("$originData", $originData);
  return (
    <>
      <FlexRow width="100%">
        <FlexColumn width="100%" vrAlign="flex-start">
          <FlexRow width="100%" hrAlign="space-between" marginTop="sm">
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
                  onClick={metaEditModal.onOpen}
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
            >
              <FlexRow></FlexRow>
            </CardPannel>
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
            >
              {/* {$originData &&
                $originData.map((item: any, index: any) => {
                  return (
                    <FlexRow>
                      <Text>Origin {index}</Text>
                    </FlexRow>
                  );
                })} */}
            </CardPannel>
            <ButtonNative
              text="Save Changes"
              variant="state_brand"
              onClick={async () => {
                console.log("Meta Overview ", $overviewData);
                console.log("Meta Trigger ", $triggerData);
                console.log("Meta Origin ", $originData);
                await hookMeta.publishMeta(
                  $overviewData,
                  $originData,
                  $triggerData
                );
                toast({
                  title: "Saved",
                  status: "success",
                  duration: 3000,
                  position: "bottom-right",
                });
              }}
            />
          </FlexColumn>

          {/* <Text fontSize={"2xl"} fontWeight={700}>
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
          </Heading> */}
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
      <MetaEditModal hookMeta={hookMeta} metaModal={metaEditModal} />
    </>
  );
}

export default MetaSettings;
