import { Heading, Image, Text } from "@chakra-ui/react";
import { StyledCol, StyledNFTCard } from "@/styles/StyledComponents";

const LayoutNFTCard = (props: any) => {
    return (
        <StyledNFTCard className="">
            <StyledCol className="vr-center">
                <Image src={props.nft?.file} className="m-r-1 w-100" alt="" />
                <StyledCol className="content">
                    <Text>{props.nft?.name}</Text>
                </StyledCol>
            </StyledCol>
        </StyledNFTCard>
    )
}
export default LayoutNFTCard;