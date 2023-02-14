import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import { truncateAddress } from "helpers";
import { Col, Row } from "style";
import { TransactionCard } from "style/card";

const LayoutTransactionCard = (props) => {
    return (
        <TransactionCard>
            <Col className="card-body">
                <Row className="m-b-2">
                    <Col className="w-50">
                        <Text>Paid To</Text>
                        <Heading as="h6" size="md">{truncateAddress(props.meta?.to)}</Heading>
                    </Col>
                    <Col className="w-50">
                        <Text>Amount</Text>
                        <Heading as="h6" size="md">{props.meta?.amount} {props.meta?.tokenSymbol}</Heading>
                    </Col>
                </Row>
                <Button className="m-b-1" variant="outline" size="sm" onClick={() => window.open(`https://polygonscan.com/tx/${props.meta?.response?.transactionHash}`, '_blank')}>
                    Open
                </Button>
            </Col>

            <Col className="card-footer">
                <Row className="w-100 vr-center">
                        <Avatar src='https://0xmetame-assets.s3.ap-south-1.amazonaws.com/polygon.png' size="xs" className="m-r-0-5"/>
                        <Heading className="h6 m-b-0" size="xs">On Polygon</Heading>
                </Row>
            </Col>

        </TransactionCard>
    )
}
export default LayoutTransactionCard;