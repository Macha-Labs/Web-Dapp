import { Avatar, Heading, Text } from "@chakra-ui/react";
import { Col, Row } from "style";
import { MemberRow } from "style/app";

const LayoutCardNFT = () => {

    return(
        <>
            <MemberRow>
                    <Row className="vr-center w-100">
                        <Col className="m-r-1">
                            <Avatar size="xl" />
                        </Col>
                        <Col>
                            <Heading as="h5" size="md" className="m-b-1">NFT Name</Heading>
                            <Text>NFT Description</Text>
                        </Col>
                    </Row>
                
            </MemberRow>
        </>
    )
}

export default LayoutCardNFT;