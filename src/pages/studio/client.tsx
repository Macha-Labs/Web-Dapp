import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";

const client = () => {
  const router = useRouter();
  return (
    <FlexBody>
      <FlexColumn
        width="100%"
        hrAlign="space-between"
        height="95vh"
        marginTop={"xl"}
        // padding={style.padding["sm"]}
      >
        <FlexColumn width="100%">
          <InputLabel
            inputType="text"
            //   defaultValue={}
            labelText="Name"
            placeholder="Name"
          />
          <InputLabel
            inputType="text"
            labelText="Description"
            placeholder="Description"
            marginTop="sm"
          />
          <InputLabel
            inputType="textArea"
            labelText="Admins"
            placeholder="Admins"
            marginTop="sm"
          />
        </FlexColumn>
        <FlexColumn vrAlign="flex-start" marginTop={"sm"} width="100%">
          {/* Main Form */}

          {/* Params */}
        </FlexColumn>
        {/* <Link href="/studio/createMeta" style={{ width: "100%" }}> */}

        {/* </Link> */}
        <FlexRow hrAlign="flex-start">
          <ButtonNative
            variant="state_brand"
            onClick={() => {
              router.push("/studio/dashboard");
            }}
          >
            Create
          </ButtonNative>
          <ButtonNative variant="state_default_hover" marginLeft="sm">
            Cancel
          </ButtonNative>
        </FlexRow>
      </FlexColumn>
    </FlexBody>
  );
};
export default client;
