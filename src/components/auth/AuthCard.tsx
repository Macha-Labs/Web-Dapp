import IconImage from "@/components/icons/IconImage";
import { AuthContext } from "@/providers/AuthProvider";
import { Col, StyledCard} from "@/styles/StyledComponents";
import { Button, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { ConnectWalletButton } from "../buttons/ConnectWalletButton";


const AuthCard = () => {
    const authContext = useContext(AuthContext);
    return (
        <div className="middle">
        <StyledCard className="w-100 p-4">
            <Col className="hr-center">
                <Col className="m-b-2 hr-center">
                    <IconImage path="Logo.png" size="90" style={{className: 'm-b-1'}}/>
                    <Heading as="h5" size="lg">
                        Log in to Portal
                    </Heading>
                </Col>
                <Col className="w-60">
                    {!authContext.address && <ConnectWalletButton />}
                    {(authContext.address && !authContext?.user?.lens?.id) && <Button className="" size="md" variant="state_lens" isLoading={authContext?.isLoadingLens} onClick={() => {authContext.connectLens()}}>Sign In With Lens</Button>}
                </Col>
            </Col>
        </StyledCard>
    </div>
    )
}

export default AuthCard;