import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import useMachaAuth from "@/hooks/studio/useMachaAuth";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import NavTop from "@/_ui/nav/NavTop";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useAuthStore from "@/store/useAuthStore";


const client = () => {
  const router = useRouter();
  const hookMachaAuth = useMachaAuth();
  const $address = useAuthStore((state: any) => state.address);

  return (
    <FlexBody>
      <NavTop
        rightElem={
          <FlexRow width="fit-content">
            <NavButton
              marginRight={style.margin["sm"]}
              marginLeft={style.margin["sm"]}
            />
            {$address ? <WalletButton /> : <ConnectWalletButton />}
          </FlexRow>
        }
      />
    );

      <FlexColumn
        width="100%"
        hrAlign="space-between"
        height="95vh"
        marginTop={"xl"}
        // padding={style.padding["sm"]}
      >
        <FlexColumn width="100%">
          <InputLabel
            elementRef={(element: any) =>
              (hookMachaAuth.clientDataRef.current["name"] = element)
            }
            inputType="text"
            //   defaultValue={}
            labelText="Name"
            placeholder="Name"
          />
          <InputLabel
            elementRef={(element: any) =>
              (hookMachaAuth.clientDataRef.current["description"] = element)
            }
            inputType="text"
            labelText="Description"
            placeholder="Description"
            marginTop="sm"
          />
          <InputLabel
            elementRef={(element: any) =>
              (hookMachaAuth.clientDataRef.current["admins"] = element)
            }
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
              hookMachaAuth.registerClient();
              // router.push("/studio/dashboard");
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
