import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import InputSelect from "@/_ui/input/InputSelect";
import useMeta from "@/hooks/studio/useMeta";
import useMetaStore from "@/store/useMetaStore";
import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  id: string;
};
function MetaPlayground({ id = "8n" }: Props) {
  const hookMeta = useMeta(id);
  const $metaInfo = useMetaStore((state: any) => state.metaInfo);

  return (
    <FlexRow width="100%" hrAlign="flex-start">
      <FlexColumn width="20%" vrAlign="flex-start" hrAlign="flex-start">
        {/* {$metaInfo?.data?.origin && ( */}
        {/* <> */}
        <InputSelect
          placeholder="Origins"
          options={hookMeta.origins}
          width="90%"
        />
        {/* <InputSelect
          placeholder="Triggers"
          options={$metaInfo?.data?.triggers}
          width="90%"
        /> */}
        {/* </> */}
        {/* )} */}
      </FlexColumn>

      <FlexColumn hrAlign="flex-start" width="40%" vrAlign="flex-start">
        <FlexRow width="100%" hrAlign="space-between">
          <Text fontSize={"2xl"} fontWeight={700}>
            Origin 1
          </Text>
          <ButtonNative>Run</ButtonNative>
        </FlexRow>
        <Text>Headers</Text>
        <InputLabel inputType="text" labelText="X_API_KEY" />
        <InputLabel inputType="text" labelText="X_API_KEY" />
        <Text>Params</Text>
        <InputLabel inputType="text" labelText="X_API_KEY" />
        <InputLabel inputType="text" labelText="X_API_KEY" />
      </FlexColumn>
    </FlexRow>
  );
}

export default MetaPlayground;
