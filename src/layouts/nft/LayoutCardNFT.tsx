import { Col, Row } from "@/styles/StyledComponents";
import { Avatar, Heading, Text } from "@chakra-ui/react";

const LayoutCardNFT = () => {

    return(
        <>
            <Row className="vr-center w-100">
                <Col className="m-r-1">
                    <Avatar size="xl" />
                </Col>
                <Col>
                    <Heading as="h5" size="md" className="m-b-1">NFT Name</Heading>
                    <Text>NFT Description</Text>
                </Col>
            </Row>
        </>
    )
}

export default LayoutCardNFT;