import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import { Col, Row } from "style";
import styled from "styled-components";
import { marked } from "marked";
import { useState } from "react";
import { Post } from "style/card";

const ActionRow = styled(Row)`
    width: 100%;

    .buttonCol {
        background: transparent;
    }
`

const LayoutProposalCard = (props) => {
    const [showMore, setShowMore] = useState<any>(false);

    return (
        <>
            {
                props?.item
                    ?
                    (
                        <>
                            <Post className="m-b-1 border-with-hover">
                                <Col className="card-body">
                                <Row className="m-b-1">
                                    <Col>
                                        <Heading as="h3" size="md">{props?.item?.title}</Heading>
                                    </Col>
                                </Row>
                                <Row className="m-b-1">
                                    <Col>
                                        <Row>
                                            <Heading as="h6" size="sm">{props?.item?.space?.name}</Heading>
                                        </Row>
                                        <Row>
                                            <Text>@{props.item?.space?.id}</Text>
                                        </Row>
                                    </Col>
                                </Row>

                                <Col className="m-b-1">
                                    <div className="m-b-1"
                                        dangerouslySetInnerHTML={{ __html: marked.parse(showMore ? props.item?.body : `${props.item?.body.substring(0, 101)}...`) }} />
                                </Col>
                                <Col>
                                    <Button
                                        variant="unstyled"
                                        size="sm"
                                        onClick={() => setShowMore(!showMore)}>
                                        {showMore ? "...show less" : "...show more"}
                                    </Button>
                                </Col>
                                </Col>
                                <Col className="card-footer">
                                    <Row className="w-100 vr-center">
                                        <Avatar src='https://0xmetame-assets.s3.ap-south-1.amazonaws.com/snapshot.png' size="xs" className="m-r-0-5"/>
                                        <Heading className="h6 m-b-0" size="xs">From Snapshot</Heading>
                                    </Row>
                                </Col>
                            </Post>
                        </>
                    )
                    :
                    (
                        <></>
                    )
            }
        </>
    )
}
export default LayoutProposalCard;