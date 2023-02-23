import IconImage from "@/components/icons/IconImage";
import { Col, StyledCard} from "@/styles/StyledComponents";
import { Button, Heading } from "@chakra-ui/react";

const AuthCard = () => {
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
                    <Button className="m-b-0-5" size="md" variant="state_brand" onClick={() => {}}>Connect Wallet</Button>
                    <Button className="" size="md" variant="state_lens" onClick={() => {}}>Sign In With Lens</Button>
                </Col>
            </Col>
        </StyledCard>
    </div>
    )
}

export default AuthCard;