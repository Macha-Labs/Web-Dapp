import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardPannel from "@/_ui/cards/CardPannel";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { deleteMetaInit } from "@/service/studio/MetaService";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import {
  Divider,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import MetaEditModal from "./MetaEditModal";
import MetaEditOriginsModal from "./MetaEditOriginsModal";
import MetaEditTriggerModal from "./MetaEditTriggerModal";
import MetaOriginsModal from "./MetaOriginsModal";
import MetaTriggersModal from "./MetaTriggersModal";

type Props = {
  metaInfo: any;
};

function MetaSettings({ metaInfo }: Props) {
  const hookMetaCreate = useMetaCreate();
  const triggerModal = useDisclosure();
  const originModal = useDisclosure();
  const editOriginModal = useDisclosure();
  const editTriggerModal = useDisclosure();
  const metaModal = useDisclosure();
  const metaEditModal = useDisclosure();
  const toast = useToast();

  const [selectedOrigin, setSelectedOrigin] = useState<any>(null);
  const [selectedTrigger, setSelectedTrigger] = useState<any>(null);

  const $overviewData = useMetaStore((state: any) => state.overviewData);
  const $triggerData = useMetaStore((state: any) => state.triggerData);
  const $originData = useMetaStore((state: any) => state.originData);
  const $meta = useMetaStore((state: any) => state.meta);
  console.log("$meta", $meta);

  console.log("metaInfo", metaInfo);
  const router = useRouter();
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
            <CardPannel
              header={
                <FlexRow hrAlign="space-between">
                  <Heading as="h4" fontSize="18" className="m-b-0">
                    Meta Details
                  </Heading>

                  <ButtonNative
                    marginRight="0px"
                    onClick={metaEditModal.onOpen}
                    text="Edit"
                    variant="state_default_hover"
                    size="sm"
                  />
                </FlexRow>
              }
              margin={"xs"}
            >
              <FlexRow hrAlign="flex-start">
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  marginRight={style.margin["lg"]}
                  src={
                    metaInfo?.image
                      ? ` https://gateway.lighthouse.storage/ipfs/${metaInfo?.image}`
                      : "https://bit.ly/dan-abramov"
                  }
                  alt="Dan Abramov"
                />
                <FlexColumn vrAlign="flex-start">
                  <Text fontWeight={600} fontSize={"2xl"}>
                    {metaInfo?.name}
                  </Text>
                  <Text>{metaInfo?.description}</Text>
                </FlexColumn>
              </FlexRow>
            </CardPannel>
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
                    marginRight="0px"
                  />
                </FlexRow>
              }
              margin={"xs"}
            >
              {$meta?.data?.triggers &&
                $meta?.data?.triggers.map((item: any, index: any) => {
                  return (
                    <FlexRow hrAlign="space-between" key={index}>
                      <Text>{item.name}</Text>

                      {/* <ButtonNative
                        text="Edit"
                        variant="state_default_hover"
                        size="sm"
                        onClick={() => {
                          setSelectedTrigger(index);
                          editTriggerModal.onOpen();
                        }}
                      /> */}
                    </FlexRow>
                  );
                })}
              {$triggerData &&
                $triggerData.map((item: any, index: any) => {
                  return (
                    <FlexRow hrAlign="space-between" key={index}>
                      <Text>{item.name}</Text>

                      <ButtonNative
                        text="Edit"
                        variant="state_default_hover"
                        size="sm"
                        onClick={() => {
                          setSelectedTrigger(index);
                          editTriggerModal.onOpen();
                        }}
                        marginRight="0px"
                      />
                    </FlexRow>
                  );
                })}
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
                    marginRight="0px"
                  />
                </FlexRow>
              }
              margin={"xs"}
            >
              <Text
                as="h6"
                fontSize="16"
                className="m-b-1"
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                Unpublished Origins
              </Text>
              {$originData &&
                $originData.map((item: any, index: any) => {
                  return (
                    <FlexColumn key={index}>
                      <FlexRow
                        hrAlign="space-between"
                        key={index}
                        vrAlign="center"
                        paddingLeft={"xl"}
                        // marginBottom={"md"}
                      >
                        <Text className="m-b-0">Origin {index}</Text>

                        <ButtonNative
                          text="Edit"
                          variant="state_default_hover"
                          size="sm"
                          onClick={() => {
                            setSelectedOrigin(index);
                            editOriginModal.onOpen();
                          }}
                          marginRight="0px"
                        />
                      </FlexRow>

                      <Divider
                        width={"95%"}
                        alignSelf={"flex-end"}
                        borderColor={"#14244B"}
                      />
                    </FlexColumn>
                  );
                })}
              <Text
                as="h6"
                fontSize="16"
                className="m-b-1"
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                Published Origins
              </Text>
              {$meta?.data?.origin &&
                $meta?.data?.origin.map((item: any, index: any) => {
                  return (
                    <FlexRow hrAlign="space-between" key={index}>
                      <Text>Origin {index}</Text>

                      {/* <ButtonNative
                      text="Edit"
                      variant="state_default_hover"
                      size="sm"
                      onClick={() => {
                        setSelectedOrigin(index);
                        editOriginModal.onOpen();
                      }}
                    /> */}
                    </FlexRow>
                  );
                })}
            </CardPannel>
            <ButtonNative
              text="Publish Changes"
              variant="state_brand"
              onClick={async () => {
                console.log("Meta Overview ", $overviewData);
                console.log("Meta Trigger ", $triggerData);
                console.log("Meta Origin ", $originData);
                deleteMetaInit($meta);
                await hookMetaCreate.publishMeta(
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
              hookMetaCreate.publishMeta();
            }}
          >
            SAVE
          </Button> */}
          </FlexRow>
        </FlexColumn>
      </FlexRow>

      <MetaTriggersModal modal={triggerModal} />
      <MetaOriginsModal modal={originModal} />
      <MetaEditOriginsModal
        modal={editOriginModal}
        selectedOrigin={selectedOrigin}
      />
      <MetaEditTriggerModal
        modal={editTriggerModal}
        selectedTrigger={selectedTrigger}
      />
      <MetaEditModal
        hookMetaCreate={hookMetaCreate}
        metaModal={metaEditModal}
      />
    </>
  );
}

export default MetaSettings;
