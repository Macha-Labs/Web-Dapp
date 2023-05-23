import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import useMeta from "@/hooks/studio/useMeta";
import useMetaStore from "@/store/useMetaStore";
import { Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
};
function MetaPlayground({ id = "8n" }: Props) {
  const hookMeta = useMeta(id);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedTrigger, setSelectedTrigger] = useState("");

  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  return (
    <FlexRow width="100%" hrAlign="flex-start">
      <FlexColumn width="20%" vrAlign="flex-start" hrAlign="flex-start">
        {$metaInfo?.data?.metaData?.origin && (
          <>
            <InputSelect
              onChangeHandler={setSelectedOrigin}
              placeholder="Origins"
              options={$metaInfo?.data?.metaData?.origin}
              width="90%"
            />
            <InputSelect
              onChangeHandler={setSelectedTrigger}
              placeholder="Triggers"
              options={$metaInfo?.data?.metaData?.triggers}
              width="90%"
            />
          </>
        )}
      </FlexColumn>
      {/* {console.log("originref", originRef.current && originRef.current.value)} */}

      <FlexColumn hrAlign="flex-start" width="40%" vrAlign="flex-start">
        {selectedOrigin === "0" && (
          <>
            <FlexRow width="100%" hrAlign="space-between">
              <Text fontSize={"2xl"} fontWeight={700}>
                Origin 1
              </Text>
              <ButtonNative>Run</ButtonNative>
            </FlexRow>
            {$metaInfo.data.metaData.origin.map((item: any, index: any) => {
              return Object.entries(item).map(([key, value]: any) => (
                <InputLabel
                  key={`${index}-${key}`}
                  inputType="text"
                  labelText={key}
                  defaultValue={value}
                />
              ));
            })}
            {/* <InputLabel inputType="text" labelText="Headers" placeholder="" />
            <InputLabel inputType="text" labelText="EndPoint" />
            <InputLabel inputType="text" labelText="Methods" />
            <InputLabel inputType="text" labelText="Params" />
            <InputLabel inputType="text" labelText="Schema" />
            <InputLabel inputType="text" labelText="Type" /> */}
          </>
        )}
        {selectedTrigger === "0" && (
          <>
            {" "}
            <FlexRow width="100%" hrAlign="space-between">
              <Text fontSize={"2xl"} fontWeight={700}>
                Trigger 1
              </Text>
            </FlexRow>
            {$metaInfo.data.metaData.triggers.map((item: any, index: any) => {
              return Object.entries(item).map(([key, value]: any) => (
                <InputLabel
                  key={`${index}-${key}`}
                  inputType="text"
                  labelText={key}
                  defaultValue={value}
                />
              ));
            })}
            {/* <InputLabel inputType="text" labelText="EndPoint" />
            <InputLabel inputType="text" labelText="Methods" />
            <InputLabel inputType="text" labelText="Params" />
            <InputLabel inputType="text" labelText="Schema" />
            <InputLabel inputType="text" labelText="Type" /> */}
          </>
        )}
      </FlexColumn>
    </FlexRow>
  );
}

export default MetaPlayground;
