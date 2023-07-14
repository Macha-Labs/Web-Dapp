import { StyledCol, StyledRow } from "@/styles/StyledComponents";
import { Avatar, Heading, Text } from "@chakra-ui/react";

const LayoutCardNFT = () => {

    return(
        <>
            <StyledRow className="vr-center w-100">
                <StyledCol className="m-r-1">
                    <Avatar size="xl" />
                </StyledCol>
                <StyledCol>
                    <Heading as="h5" size="md" className="m-b-1">NFT Name</Heading>
                    <Text>NFT Description</Text>
                </StyledCol>
            </StyledRow>
        </>
    )
}

export default LayoutCardNFT;