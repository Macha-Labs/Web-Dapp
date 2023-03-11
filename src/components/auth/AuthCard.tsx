import IconImage from "@/components/icons/IconImage";
import { AuthContext } from "@/providers/AuthProvider";
import { Col, StyledCard} from "@/styles/StyledComponents";
import { Button, Heading, Toast, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { ConnectWalletButton } from "../buttons/ConnectWalletButton";
import {useState} from "react";

const AuthCard = () => {
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
        <StyledCard className="w-100 p-4">
            <Col className="hr-center">
                <Col className="m-b-2 hr-center">
                    <IconImage path="Logo.png" size="90" style={{className: 'm-b-1'}}/>
                    <Heading as="h5" size="lg">
                        Log in to MetaWork
                    </Heading>
                </Col>
                <Col className="w-60">
                    {!authContext.address && <ConnectWalletButton />}
                    {(authContext.address && !authContext?.user?.lens?.id) && 
                    <Button 
                    className="" 
                    size="md" 
                    variant="state_lens" 
                    isLoading={authContext?.isLoadingLens} 
                    isDisabled = {lensBtnState.disabled}
                    onClick={() => {authContext.connectLens(callBacks)}}>
                        {lensBtnState.text}
                    </Button>
                    }
                </Col>
            </Col>
        </StyledCard>
    </div>
    )
}

export default AuthCard;