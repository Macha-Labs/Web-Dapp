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
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import { FlexWindow } from "@/_ui/flex/FlexWindow";

const account = () => {
  const router = useRouter();
  const hookMachaAuth = useMachaAuth();
  const $address = useAuthStore((state: any) => state.address);

  const accountOptions: any = [
    { value: "Accounts", href: "" },
    { value: "Privacy", href: "" },
  ];

  const renderBody = () => {
    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              width="30%"
              options={accountOptions}
              gstyle={{ fontSize: `${style.font.h5}` }}
              // value={selectedNavTab}
              // onChange={setSelectedNavTab}
            />
          </FlexRow>
        </NavBlock>

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
      </>
    );
  };

  const renderNav = () => {
    return (
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
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};
export default account;
