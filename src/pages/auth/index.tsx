import IconImage from "@/components/icons/IconImage";
import LayoutCard from "@/layouts/LayoutCard";
import { Col, StyledCard, StyledWindow } from "@/styles/StyledComponents";
import { Avatar, Button, Heading } from "@chakra-ui/react";

function Auth() {
    return (
        <StyledWindow>
                <div className="middle">
                    <StyledCard className="w-100  p-3">
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
        </StyledWindow>
    )
}

export default Auth;