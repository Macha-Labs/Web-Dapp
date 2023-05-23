import JSONViewer from "@/_ui/JSONViewer";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import useMeta from "@/hooks/studio/useMeta";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};
function MetaPlayground({ id = "9n" }: Props) {
  const hookMeta = useMeta(id);
  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedTrigger, setSelectedTrigger] = useState("");

  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  const [resultData, setResultData] = useState({});
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
              children={
                <>
                  {$metaInfo?.data?.metaData?.origin.map(
                    (item: any, index: any) => {
                      return (
                        <option
                          key={index}
                          value={index}
                          style={{ background: `${style.input.bg.default}` }}
                        >
                          <Text>option {index}</Text>
                        </option>
                      );
                    }
                  )}
                </>
              }
            />
            {/* <InputSelect
              onChangeHandler={setSelectedTrigger}
              placeholder="Triggers"
              options={$metaInfo?.data?.metaData?.triggers}
              width="90%"
            /> */}
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
              <ButtonNative
                onClick={async () => {
                  console.log("Logging meta ", $meta);
                  const result = await $meta.fetchMetaOrigin("yam.eth", 0);
                  console.log("Origin result", result);
                  setResultData(result.data);
                }}
              >
                Run
              </ButtonNative>
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
      <FlexColumn width="40%">
        <JSONViewer data={resultData} />
      </FlexColumn>
    </FlexRow>
  );
}

export default MetaPlayground;
