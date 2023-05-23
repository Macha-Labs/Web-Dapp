import IconImage from "@/_ui/icons/IconImage";
import { helperIPFS } from "@/helpers";
import { likePost, unlikePost } from "@/helpers/lens/lens";
import useLensPosts from "@/hooks/lens/useLensPosts";
import {
  StyledCol,
  StyledRow,
  StyledPostCard,
} from "@/styles/StyledComponents";
import { Avatar, Button, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const LayoutPostCard = (props: any) => {
  const hookLensPosts = useLensPosts();
  const [tempState, setTempState] = useState<any>();

  useEffect(() => {
    console.log("Here it the publishing item ", props.item);
    const result = hookLensPosts.getHaveILikedPost(props.item?.id);
    setTempState(result);
  }, [props.item?.id]);

  return (
    <>
      {props?.item ? (
        <>
          <StyledPostCard className="m-b-1 border-with-hover">
            <StyledCol className="card-body">
              <StyledRow>
                <StyledCol className="m-b-1">
                  <Avatar
                    src={helperIPFS(props?.item?.profile?.image)}
                    className="m-r-1"
                    size="md"
                    overflow={"hidden"}
                  />
                </StyledCol>
                <StyledCol>
                  <StyledRow>
                    <Heading as="h6" size="sm">
                      {props?.item?.profile?.name}
                    </Heading>
                  </StyledRow>
                  <StyledRow className="m-t-0-5">
                    <Text>@{props.item?.profile?.handle}</Text>
                  </StyledRow>
                </StyledCol>
              </StyledRow>

              <StyledCol className="m-b-1">
                <div className="m-b-1">{props.item?.metadata?.content}</div>
                {props?.item?.metadata?.media.length > 0 ? (
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
              </StyledCol>

              {/* Like - Unlike logic */}
              {/* <Col className="m-b-1">
                <div className="actions">
                  <Flex>
                    <Row className="m-r-0-5">
                      {tempState ? (
                        <Button
                          className="buttonCol"
                          size="xs"
                          variant="state_transparent_to_brand_hover"
                          onClick={() => {
                            likePost({
                              profileId: props.myId,
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
                              profileId: props.myId,
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
                  </Flex>
                </div>
              </Col> */}
            </StyledCol>
            <StyledCol className="card-footer">
              <StyledRow className="w-100 vr-center">
                <IconImage slug="IconLensColor.png" />
                <Heading className="h6 m-l-0-5" size="xs">
                  From Lens Protocol
                </Heading>
              </StyledRow>
            </StyledCol>
          </StyledPostCard>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LayoutPostCard;
