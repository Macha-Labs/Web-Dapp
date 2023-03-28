import IconImage from "@/components/icons/IconImage";
import { getCookie } from "@/helpers/storage/browserStorage";
import { AuthContext } from "@/providers/AuthProvider";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { ConnectWalletButton } from "../buttons/ConnectWalletButton";

const AuthCard = () => {
  console.log('Rendering >>>>> AuthCard');
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const [lensBtnState, setLensBtnState] = useState<any>({
    text: "Sign in with Lens",
    disabled: false
  });
    const callBacks = {
        noLensProfile: async() => {
            toast({
                title: "Lens Profile not found",
                status: "error",
                duration: 3000,
                position: "bottom-right",
              });
            setLensBtnState({text: "Switch your account", disabled: true});
        }
    }

  return (
    <div className="middle">
      <StyledCard className="w-100 p-4 state_highlight">
        <Col className="hr-center">
          <Col className="m-b-2 hr-center">
            <IconImage
              path="Logo.png"
              size="3xl"
              style={{ className: "m-b-1" }}
            />
            <Heading as="h5" size="lg">
              Log in to MetaWork
            </Heading>
          </Col>
          <Col className="w-60">
            {!authContext.address && <ConnectWalletButton />}
            {authContext.address && getCookie("accessToken") == undefined && (
              <Button
                className=""
                size="md"
                variant="state_lens"
                isLoading={authContext?.isLoadingLens}
                isDisabled={lensBtnState.disabled}
                onClick={() => {
                  authContext.connectLens(callBacks);
                }}
              >
                {lensBtnState.text}
              </Button>
            )}
            {authContext.address &&
              authContext?.user?.lens?.id &&
              !authContext.xmtpClientAddress && (
                <Button
                  className=""
                  size="md"
                  variant="state_xmtp"
                  onClick={() => {
                    authContext.connectXmtp();
                  }}
                >
                  Connect to XMTP
                </Button>
              )}
          </Col>
        </Col>
      </StyledCard>
      {/* <StyledCard className="m-t-2 flex-center text-center state_lens">
          <Col className="hr-center">
          <Heading as="h5" size="sm" className="m-b-0-5">Claim a Lens Testnet Handle</Heading>
          <Text className="text-center" fontSize="14">Visit <Link href="https://testnet.lenster.xyz/" target={'_blank'}>www.testnet.lenster.xyz</Link> to claim your lens handle.<br/>Please note this is for testing purpose only to access product on testnet.</Text>
          </Col>
      </StyledCard> */}
    </div>
  );
};

export default AuthCard;
