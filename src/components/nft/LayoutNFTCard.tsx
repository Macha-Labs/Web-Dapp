import { Heading, Image, Text } from "@chakra-ui/react";
import { Col } from "style";
import { NFTCard } from "style/card";

const LayoutNFTCard = (props) => {
    console.log("NFT Image file:",props.nft?.file);
    
    return (
        <NFTCard className="">
            <Col className="vr-center">
                <Image src={props.nft?.file} className="m-r-1 w-100" />
                <Col className="content">
                    <Text>{props.nft?.name}</Text>
                </Col>
            </Col>
        </NFTCard>
    )
}
export default LayoutNFTCard;