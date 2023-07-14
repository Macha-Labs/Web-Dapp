import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import { StyledCol, StyledRow, StyledTransactionCard } from "@/styles/StyledComponents";
import { truncateAddress } from "@/helpers";

const LayoutTransactionCard = (props: any) => {
    return (
        <StyledTransactionCard>
            <StyledCol className="card-body">
                <StyledRow className="m-b-2">
                    <StyledCol className="w-50">
                        <Text>Paid To</Text>
                        <Heading as="h6" size="md">{truncateAddress(props.meta?.to)}</Heading>
                    </StyledCol>
                    <StyledCol className="w-50">
                        <Text>Amount</Text>
                        <Heading as="h6" size="md">{props.meta?.amount} {props.meta?.tokenSymbol}</Heading>
                    </StyledCol>
                </StyledRow>
                <Button className="m-b-1" variant="outline" size="sm" onClick={() => window.open(`https://polygonscan.com/tx/${props.meta?.response?.transactionHash}`, '_blank')}>
                    Open
                </Button>
            </StyledCol>

            <StyledCol className="card-footer">
                <StyledRow className="w-100 vr-center">
                        <Avatar src='https://0xmetame-assets.s3.ap-south-1.amazonaws.com/polygon.png' size="xs" className="m-r-0-5"/>
                        <Heading className="h6 m-b-0" size="xs">On Polygon</Heading>
                </StyledRow>
            </StyledCol>

        </StyledTransactionCard>
    )
}
export default LayoutTransactionCard;