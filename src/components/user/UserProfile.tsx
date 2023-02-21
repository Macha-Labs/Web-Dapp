import useLensConnections from "@/hooks/lens/useLensConnections";
import useLensFollows from "@/hooks/lens/useLensFollow";
import useLensPostsForUser from "@/hooks/lens/useLensPostsForUser";
import LayoutProfileBanner from "@/layouts/LayoutProfileBanner";
import { Col, Row, StyledCard, StyledIcon } from "@/styles/StyledComponents";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
} from "@chakra-ui/react";
import LayoutPostList from "../../layouts/post/LayoutPostList";
import UserCard from "./UserCard";
import UserFollowersCard from "./UserFollowersCard";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";

interface Props {
  [key: string]: any;
}

const UserProfile = (props: any) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const hookLensFollow = useLensFollows(props.user?.lens?.id);
  const hookLensPostsForUser = useLensPostsForUser(props?.user?.lens?.id);
  const hookLensConnections = useLensConnections(
    props.user?.lens?.ownedBy,
    props?.user?.lens?.id
  );
  const authContext = useContext(AuthContext);

  const templateConnections = () => {
    return (
      <>
        {hookLensConnections.following?.length ? (
          <Wrap className="m-b-2">
            {hookLensConnections.following.length ? (
              <>
                {hookLensConnections.following.map((item: any, index: any) => {
                  return <UserCard user={item} key={index} />;
                })}
              </>
            ) : (
              <></>
            )}
          </Wrap>
        ) : (
          <></>
        )}
      </>
    );
  };

  const templateSocial = () => {
    return (
      <>
        <Row className="m-t-0-5">
          {props.profile?.attributesObj?.website?.value ? (
            <a
              href={props.profile?.attributesObj?.website?.value}
              target="_blank"
              rel="noreferrer"
            >
              <StyledIcon className="state-1-2">
                {/* <GlobeIcon width="24" height="24" fill="#e8e8e8" /> */}
              </StyledIcon>
            </a>
          ) : (
            <></>
          )}
          {props.profile?.attributesObj?.twitter?.value ? (
            <a
              href={props.profile?.attributesObj?.twitter?.value}
              target="_blank"
              rel="noreferrer"
            >
              <StyledIcon className="state-1-2">
                {/* <TwitterIcon width="24" height="24" fill="#e8e8e8" /> */}
              </StyledIcon>
            </a>
          ) : (
            <></>
          )}
        </Row>
      </>
    );
  };

  const templatePosts = () => {
    return (
      <Col>
        <LayoutPostList
          list={hookLensPostsForUser.posts}
          isLoading={hookLensPostsForUser.isLoading}
        />
      </Col>
    );
  };

  const templateNfts = () => {
    return (
      <Col>
        {/* {
                    nfts?.length
                        ?
                        (
                            <Col className="m-v-1">
                                <Heading as="h4" pb={3} size="md" className="m-b-0-5">Badges Collected</Heading>
                                <Wrap>
                                    {
                                        nfts.map((item: any) =>
                                            <WrapItem>
                                                <Avatar size="2xl" src={item?.media[0].gateway}></Avatar>
                                            </WrapItem>
                                        )
                                    }
                                </Wrap>
                            </Col>
                        )
                        :
                        (
                            <></>
                        )
                } */}
      </Col>
    );
  };

  const TemplateFollowers = () => {
    return (
      <>
        {hookLensConnections.followers?.length ? (
          <Wrap className="m-b-2">
            {hookLensConnections.followers.length ? (
              <>
                {hookLensConnections.followers.map((item: any, index: any) => {
                  return <UserFollowersCard user={item} key={index} />;
                })}
              </>
            ) : (
              <></>
            )}
          </Wrap>
        ) : (
          <>Zero followers</>
        )}
      </>
    );
  };

  const TemplateProfile = () => {
    console.log(
      "Address",
      authContext.address,
      props.user?.lens?.ownedBy,
      props.user?.lens?.ownedBy.toLowerCase() ===
        authContext.address.toLowerCase()
    );
    return (
      <StyledCard>
        <LayoutProfileBanner profile={props.user?.lens} />

        <Row>
          <Col className="m-v-1 w-100 hr-center">
            <Heading as="h3" size="lg">
              {props.user?.lens?.name
                ? props.user?.lens?.name
                : props.user?.lens?.handle}
            </Heading>
            <h6>@{props.user?.lens?.handle}</h6>
          </Col>
        </Row>

        <Row className="vr-center hr-center">
          {props.user?.lens?.bio ? (
            <Col className="m-v-1">
              <Text className="bioText">{props?.user?.lens?.bio}</Text>
            </Col>
          ) : (
            <></>
          )}
        </Row>

        {props.user?.lens?.ownedBy.toLowerCase() !==
          authContext.address.toLowerCase() && (
          <Row className="m-v-1 vr-center hr-center">
            {props.user?.lens?.isFollowedByMe || isFollowed ? (
              <Button
                variant="state_lens_unfollow"
                size="md"
                className="m-r-1"
                onClick={() => {
                  hookLensFollow.triggerUnFollow();
                  setIsFollowed(false);
                }}
                isLoading={hookLensFollow.isLoading}
                loadingText={hookLensFollow.loadingText}
              >
                Unfollow on Lens
              </Button>
            ) : (
              <Button
                variant="state_lens"
                size="md"
                className="m-r-1"
                onClick={() => {
                  hookLensFollow.triggerFollow();
                  setIsFollowed(!isFollowed);
                }}
                isLoading={hookLensFollow.isLoading}
                loadingText={hookLensFollow.loadingText}
              >
                Follow on Lens
              </Button>
            )}
            <Button leftIcon={<ChatIcon />} variant="state_brand" size="md">
              Message
            </Button>
          </Row>
        )}
      </StyledCard>
    );
  };

  const TemplateTabs = () => {
    return (
      <Tabs variant="unstyled">
        <LayoutCardPannel
          style={{ className: "m-t-1" }}
          header={
            <TabList className="w-100">
              <Row className="m-v-1 w-100 vr-center hr-center">
                <Tab>
                  <Row className="m-h-0-5 vr-center">
                    <Col className="m-r-0-5">
                      <Avatar size="sm" />
                    </Col>

                    <Col>Post</Col>
                  </Row>
                </Tab>
                <Tab>
                  <Row className="m-h-0-5  vr-center">
                    <Col className="m-r-0-5">
                      <Avatar size="sm" />
                    </Col>

                    <Col>Followers</Col>
                  </Row>
                </Tab>
                <Tab>
                  <Row className="m-h-0-5  vr-center">
                    <Col className="m-r-0-5">
                      <Avatar size="sm" />
                    </Col>

                    <Col>Following</Col>
                  </Row>
                </Tab>
              </Row>
            </TabList>
          }
        >
          <TabPanels>
            <TabPanel>{templatePosts()}</TabPanel>

            <TabPanel>
              <TemplateFollowers />
            </TabPanel>

            <TabPanel>{templateConnections()}</TabPanel>
          </TabPanels>
        </LayoutCardPannel>
      </Tabs>
    );
  };

  return (
    <>
      {props.user ? (
        <>
          <TemplateProfile />
          <TemplateTabs />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserProfile;
