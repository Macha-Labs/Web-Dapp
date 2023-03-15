import useLensConnections from "@/hooks/lens/useLensConnections";
import useLensFollows from "@/hooks/lens/useLensFollow";
import useLensPostsForUser from "@/hooks/lens/useLensPostsForUser";
import LayoutProfileBanner from "@/layouts/LayoutProfileBanner";
import { Col, Row, StyledCard, StyledIcon } from "@/styles/StyledComponents";
import { ChatIcon } from "@chakra-ui/icons";
import {
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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import IconImage from "../icons/IconImage";
import useLensProfile from "@/hooks/lens/useLensProfile";
import Link from "next/link";

const UserProfile = ({ user }: any) => {
  console.log("User Profile", user);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const hookLensFollow = useLensFollows(user?.lens?.id);
  const hookLensPostsForUser = useLensPostsForUser(user?.lens?.id);
  const { getOwnedProfiles, userLens } = useLensProfile();

  useEffect(() => {
    getOwnedProfiles(user?.lens?.ownedBy);
    console.log(user?.lens?.ownedBy, "user?.lens?.ownedBy");
  }, [user?.lens?.ownedBy]);

  const hookLensConnections = useLensConnections(
    userLens?.ownedBy,
    userLens?.id
  );
  console.log("userLens", userLens);

  const authContext = useContext(AuthContext);

  const templatePosts = () => {
    return (
      <Col>
        {
          <>
            {user?.lens?.ownedBy === undefined ? (
              "User has not connected Lens to their profile"
            ) : (
              <LayoutPostList
                list={hookLensPostsForUser.posts}
                isLoading={hookLensPostsForUser.isLoading}
              />
            )}
          </>
        }
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

  const TemplateFollowing = () => {
    return (
      <>
        {hookLensConnections.following?.length &&
        user?.lens?.ownedBy != undefined ? (
          <Wrap className="m-b-2">
            {hookLensConnections.following.map((item: any, index: any) => {
              return <UserFollowersCard user={item} key={index} />;
            })}
          </Wrap>
        ) : (
          <>
            {user?.lens?.ownedBy === undefined
              ? "User has not connected Lens to their profile"
              : "Zero Following"}
          </>
        )}
      </>
    );
  };

  const TemplateFollowers = () => {
    return (
      <>
        {hookLensConnections.followers?.length &&
        user?.lens?.ownedBy != undefined ? (
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
          <>
            {user?.lens?.ownedBy === undefined
              ? "User has not connected Lens to their profile"
              : "Zero Followers"}
          </>
        )}
      </>
    );
  };

  const TemplateProfile = () => {
    return (
      <StyledCard>
        <LayoutProfileBanner profile={user?.lens} />

        <Row>
          <Col className="m-v-1 w-100 hr-center">
            <Heading as="h3" size="lg">
              {user?.lens?.name ? user?.lens?.name : user?.lens?.handle}
            </Heading>
            <h6>@{user?.lens?.handle}</h6>
          </Col>
        </Row>

        <Row className="vr-center hr-center">
          {user?.lens?.bio ? (
            <Col className="m-v-1">
              <Text className="bioText">{user?.lens?.bio}</Text>
            </Col>
          ) : (
            <></>
          )}
        </Row>

        {user?.lens?.ownedBy?.toLowerCase() !==
          authContext?.address?.toLowerCase() && (
          <Row className="m-v-1 vr-center hr-center">
            {user?.lens?.isFollowedByMe || isFollowed ? (
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
            <Link href={`chat/dm`}>
              <Button
                leftIcon={<ChatIcon />}
                onClick={() => {}}
                variant="state_brand"
                size="md"
              >
                Message
              </Button>
            </Link>
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
              <Row className="w-100 vr-center hr-center">
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage path="IconDarkPost.png" size="15" />
                    <Text className="m-l-0-5">Posts</Text>
                  </Button>
                </Tab>
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage path="IconDarkFollowers.png" size="15" />
                    <Text className="m-l-0-5">Followers</Text>
                  </Button>
                </Tab>
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage path="IconDarkFollowing.png" size="15" />
                    <Text className="m-l-0-5">Following</Text>
                  </Button>
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

            <TabPanel>
              <TemplateFollowing />
            </TabPanel>
          </TabPanels>
        </LayoutCardPannel>
      </Tabs>
    );
  };

  return (
    <div>
      {user ? (
        <>
          <TemplateProfile />
          <TemplateTabs />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfile;
