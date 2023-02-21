import { Heading, Image, Text } from "@chakra-ui/react";
import { Col, StyledNFTCard } from "@/styles/StyledComponents";

const LayoutNFTCard = (props: any) => {
    return (
        <StyledNFTCard className="">
            <Col className="vr-center">
                <Image src={props.nft?.file} className="m-r-1 w-100" alt="" />
                <Col className="content">
                    <Text>{props.nft?.name}</Text>
                </Col>
            </Col>
        </StyledNFTCard>
    )
}
export default LayoutNFTCard;