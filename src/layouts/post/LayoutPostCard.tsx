import { helperIPFS } from "@/helpers";
import { likePost, unlikePost } from "@/helpers/lens/lens";
import useLensPosts from "@/hooks/lens/useLensPosts";
import { Col, Row, StyledPostCard } from "@/styles/StyledComponents";
import { Avatar, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const LayoutPostCard = (props: any) => {
  console.log("Lens Posts ", props.item);
  const [tempState, setTempState] = useState<boolean>(false);

  const hookLensPosts = useLensPosts();

  useEffect(() => {
    hookLensPosts.getHaveILikedPost(props.item?.id);

    console.log(hookLensPosts.haveILiked, "hookLensPosts.haveILikedPost");
  }, [props.item?.id]);

  return (
    <>
      {props?.item ? (
        <>
          <StyledPostCard className="m-b-1 border-with-hover">
            <Col className="card-body">
              <Row>
                <Col className="m-b-1">
                  <Avatar
                    src={helperIPFS(props?.item?.profile?.image)}
                    className="m-r-1"
                    size="md"
                    overflow={"hidden"}
                  />
                </Col>
                <Col>
                  <Row>
                    <Heading as="h6" size="sm">
                      {props?.item?.profile?.name}
                    </Heading>
                  </Row>
                  <Row className="m-t-0-5">
                    <Text>@{props.item?.profile?.handle}</Text>
                  </Row>
                </Col>
              </Row>

              <Col className="m-b-1">
                <div className="m-b-1">{props.item?.metadata?.content}</div>
                {props?.item?.metadata?.media ? (
                  <Image
                    className="w-60"
                    alt="lens post image"
                    src={helperIPFS(
                      props?.item?.metadata?.media[0]?.original?.url
                    )}
                  />
                ) : (
                  <></>
                )}
              </Col>
              <Col className="m-b-1">
                <div className="actions">
                  <Flex>
                    <Row className="m-r-0-5">
                      {!hookLensPosts.haveILiked ? (
                        <Button
                          className="buttonCol"
                          size="xs"
                          variant="state_transparent_to_brand_hover"
                          onClick={() => {
                            likePost({
                              profileId: props.item?.profile?.id,
                              reaction: "UPVOTE",
                              publicationId: props.item?.response
                                ? props.item?.response
                                : props.item?.id,
                            });
                            setTempState(!tempState);
                          }}
                        >
                          Like
                        </Button>
                      ) : (
                        <Button
                          className="buttonCol"
                          size="xs"
                          variant="state_transparent_to_brand_hover"
                          onClick={() => {
                            unlikePost({
                              profileId: props.item?.profile?.id,
                              reaction: "UPVOTE",
                              publicationId: props.item?.response
                                ? props.item?.response
                                : props.item?.id,
                            });
                            setTempState(!tempState);
                          }}
                        >
                          Unlike
                        </Button>
                      )}
                    </Row>
                    <Row className="m-r-0-5">
                      <Button
                        className="buttonCol"
                        size="xs"
                        // leftIcon={<CommentIcon width="20" height="20" fill="#efefef" />}
                        variant="state_transparent_to_brand_hover"
                      >
                        Comment
                      </Button>
                    </Row>
                  </Flex>
                </div>
              </Col>
            </Col>
            <Col className="card-footer">
              <Row className="w-100 vr-center">
                <Avatar
                  src="https://0xmetame-assets.s3.ap-south-1.amazonaws.com/lens.png"
                  size="xs"
                  className="m-r-0-5"
                />
                <Heading className="h6 m-b-0" size="xs">
                  From Lens Protocol
                </Heading>
              </Row>
            </Col>
          </StyledPostCard>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LayoutPostCard;
