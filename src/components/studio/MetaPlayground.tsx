import JSONViewer from "@/_ui/JSONViewer";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import useMetaStore from "@/store/useMetaStore";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};
function MetaPlayground({ id }: Props) {
  const $meta = useMetaStore((state: any) => state.meta);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);
  const [selectedOrigin, setSelectedOrigin] = useState<any>("");
  const [selectedTrigger, setSelectedTrigger] = useState<any>("");
  const [resultData, setResultData] = useState<any>({});

  useEffect(() => {
    console.log("Logging $meta ", $metaInfo);
  }, [$metaInfo]);

  return (
    <FlexRow width="100%" hrAlign="space-between" vrAlign="flex-start">
      <FlexColumn hrAlign="flex-start" width="50%" vrAlign="flex-start">
        <FlexRow hrAlign="space-between" marginBottom={"md"}>
          {$metaInfo?.data?.metaData?.origin && (
            <>
              <InputSelect
                onChangeHandler={setSelectedOrigin}
                placeholder="Origins"
                options={$metaInfo?.data?.metaData?.origin}
                width="80%"
                childrenComponent={
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
          {selectedOrigin === "0" && (
            <ButtonNative
              size="sm"
              onClick={async () => {
                console.log("Logging meta ", $meta);
                const result = await $meta.fetchMetaOrigin("yam.eth", 0);
                console.log("Origin result", result);
                setResultData(result.data);
              }}
              marginLeft="md"
              variant="state_brand"
            >
              Run API
            </ButtonNative>
          )}
        </FlexRow>
        {selectedOrigin === "0" && (
          <>
            <CardNative padding={style.margin["lg"]}>
              <FlexRow width="100%" hrAlign="space-between">
                <Text fontSize={"2xl"} fontWeight={700}>
                  Origin 1
                </Text>
              </FlexRow>
              {$metaInfo.data.metaData.origin.map((item: any, index: any) => {
                return Object.entries(item).map(([key, value]: any) => {
                  // if (key === "requestParams") {
                  //   const requestParamObject = convertStringToJson(value);
                  //   if (typeof requestParamObject === "object") {
                  //     return Object.entries(requestParamObject).map(
                  //       ([subKey, subValue]: any) => (
                  //         <>
                  //           <InputLabel
                  //             key={`${index}-${key}`}
                  //             inputType="text"
                  //             labelText={key}
                  //             defaultValue={value}
                  //           />
                  //           <InputLabel
                  //             key={`${index}-${key}-${subKey}`}
                  //             inputType={subValue}
                  //             labelText={subKey}
                  //             defaultValue=""
                  //           />
                  //         </>
                  //       )
                  //     );
                  //   }
                  // } else {
                  return (
                    <>
                      {/* <CardNative> */}
                      <Heading
                        as="h5"
                        fontSize={"lg"}
                        bgGradient="linear(
                          100.07deg,
                          #2a85ff 0.39%,
                          #2448c7 73.45%
                        )"
                        bgClip="text"
                      >
                        {key}
                      </Heading>
                      <Text>{value}</Text>
                      {/* </CardNative> */}
                    </>
                  );
                  // }
                });
              })}
            </CardNative>
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
      <FlexColumn width="45%">
        <JSONViewer data={resultData} />
      </FlexColumn>
    </FlexRow>
  );
}

export default MetaPlayground;