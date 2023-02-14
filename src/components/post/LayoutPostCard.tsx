import { Avatar, Button, Heading, Text } from "@chakra-ui/react";
import LikeIcon from "components/Icon/LikeIcon";
import { Col, Icon, Row } from "style";
import styled from "styled-components";
import { helperIPFS } from "helpers";
import { Post } from "style/card";
import CommentIcon from "components/Icon/CommentIcon";
import { likePost } from "helpers/lens/lens";
import { useContext } from "react";
import AuthContext from "contexts/auth";

const ActionRow = styled(Row)`
    width: 100%;

    .buttonCol {
        background: transparent;
    }
`

const LayoutPostCard = (props: any) => {
    const authContext = useContext(AuthContext);
    return (
        <>
            {
                props?.item
                    ?
                    (
                        <>
                            <Post className="m-b-1 border-with-hover">
                                <Col className="card-body">
                                    <Row>
                                        <Col className="m-b-1">
                                            <Avatar src={helperIPFS(props?.item?.profile?.picture?.original?.url)} className="m-r-1" size="md" />
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Heading as="h6" size="sm">{props?.item?.profile?.name}</Heading>
                                            </Row>
                                            <Row className="m-t-0-5">
                                                <Text>@{props.item?.profile?.handle}</Text>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Col className="m-b-1">
                                        <div className="m-b-1">{props.item?.metadata?.content}</div>
                                        {props?.item?.metadata?.media
                                            ?
                                            (
                                                <img className="w-60" src={helperIPFS(props?.item?.metadata?.media[0]?.original?.url)} />
                                            )
                                            :
                                            (
                                                <></>
                                            )
                                        }
                                    </Col>
                                    <Col className="m-b-1">
                                        <ActionRow>
                                            <Col className="m-r-0-5">
                                                <Button
                                                    className="buttonCol"
                                                    size="xs"
                                                    leftIcon={<LikeIcon width="20" height="20" fill="#efefef" />}
                                                    variant="state_transparent_to_brand_hover"
                                                    onClick={() => likePost({profileId: authContext.userLens?.profile?.id, reaction: 'UPVOTE', publicationId: props.item?.response ? props.item?.response : props.item?.id})}
                                                    >
                                                    Like
                                                </Button>
                                            </Col>
                                            <Col className="m-r-0-5">
                                                <Button
                                                    className="buttonCol"
                                                    size="xs"
                                                    leftIcon={<CommentIcon width="20" height="20" fill="#efefef" />}
                                                    variant="state_transparent_to_brand_hover">
                                                    Comment
                                                </Button>
                                            </Col>
                                        </ActionRow>
                                    </Col>
                                </Col>
                                <Col className="card-footer">
                                    <Row className="w-100 vr-center">
                                        <Avatar src='https://0xmetame-assets.s3.ap-south-1.amazonaws.com/lens.png' size="xs" className="m-r-0-5" />
                                        <Heading className="h6 m-b-0" size="xs">From Lens Protocol</Heading>
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

export default LayoutPostCard;