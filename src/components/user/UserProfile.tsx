import useLensConnections from "@/hooks/lens/useLensConnections";
import useLensFollows from "@/hooks/lens/useLensFollow";
import useLensPostsForUser from "@/hooks/lens/useLensPostsForUser";
import LayoutProfileBanner from "@/layouts/LayoutProfileBanner";
import { StyledCol, StyledRow, StyledCard } from "@/styles/StyledComponents";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import LayoutPostList from "../../layouts/post/LayoutPostList";
import UserFollowersCard from "./UserFollowersCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import IconImage from "@/_ui/icons/IconImage";
import useLensProfile from "@/hooks/lens/useLensProfile";
import Link from "next/link";
import useXmtpChannelNew from "@/hooks/xmtp/useXmtpChannelNew";
import { useRouter } from "next/router";

const UserProfile = ({ user }: any) => {
  console.log("User Profile", user);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const hookXmtpChannelNew = useXmtpChannelNew();
  const hookLensFollow = useLensFollows(user?.lens?.id);
  const hookLensPostsForUser = useLensPostsForUser(user?.lens?.id);
  const { getOwnedProfiles, userLens } = useLensProfile();
  const router = useRouter();
  const toast = useToast();

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

  const callbackMessage = {
    success: () => {
      router.push("/chat/dm");
    },
    error: () => {
      toast({
        title: "User not on XMTP",
        status: "error",
        duration: 3000,
        position: "bottom-right",
      });
    },
  };

  const handleMessage = () => {
    hookXmtpChannelNew?.initiateDirect(user?.lens?.ownedBy, callbackMessage);
  };

  const templatePosts = () => {
    return (
      <StyledCol>
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
      </StyledCol>
    );
  };

  const templateNfts = () => {
    return (
      <StyledCol>
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
      </StyledCol>
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
            {user?.lens?.ownedBy === undefined ? (
              "User has not connected Lens to their profile"
            ) : (
              <>
                <StyledCol className="flex-hr-vr-center">
                  <Image
                    src="/assets/nofollow.png"
                    className="w-40 m-b-2 m-t-1"
                  />
                  <Heading className="m-b-1" size="lg">
                    There is Nobody here, yet.
                  </Heading>
                  <Heading className="" size="xs">
                    People you follow on lens will be displayed here
                  </Heading>
                </StyledCol>
              </>
            )}
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
            {user?.lens?.ownedBy === undefined ? (
              "User has not connected Lens to their profile"
            ) : (
              <>
                <StyledCol className="flex-hr-vr-center">
                  <Image
                    src="/assets/nofollow.png"
                    className="w-40 m-b-2 m-t-1"
                  />
                  <Heading className="m-b-1" size="lg">
                    There is nobody here, yet.
                  </Heading>
                  <Heading className="" size="xs">
                    Your lens followers will be displayed here
                  </Heading>
                </StyledCol>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const templateProfile = () => {
    return (
      <StyledCard>
        <LayoutProfileBanner profile={user?.lens} />

        <StyledRow>
          <StyledCol className="m-v-1 w-100 hr-center">
            <Heading as="h3" size="lg">
              {user?.lens?.name ? user?.lens?.name : user?.lens?.handle}
            </Heading>
            <h6>@{user?.lens?.handle}</h6>
          </StyledCol>
        </StyledRow>

        <StyledRow className="vr-center hr-center">
          {user?.lens?.bio ? (
            <StyledCol className="m-v-1">
              <Text className="bioText">{user?.lens?.bio}</Text>
            </StyledCol>
          ) : (
            <></>
          )}
        </StyledRow>

        {user?.lens?.ownedBy?.toLowerCase() !==
          authContext?.address?.toLowerCase() && (
          <StyledRow className="m-v-1 vr-center hr-center">
            {userLens?.isFollowedByMe || isFollowed ? (
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
                onClick={handleMessage}
                variant="state_brand"
                size="md"
                isLoading={hookXmtpChannelNew.isLoading}
              >
                Message
              </Button>
            </Link>
          </StyledRow>
        )}
      </StyledCard>
    );
  };

  const templateTabs = () => {
    return (
      <Tabs variant="unstyled">
        {/* <LayoutCardPannel
          style={{ className: "m-t-1" }}
          header={
            <TabList className="w-100">
              <StyledRow className="w-100 vr-center hr-center">
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage slug="IconDarkPost.png" />
                    <Text
                      className="m-l-0-5"
                      paddingBottom="0px"
                      marginBottom="0px"
                      style={{ paddingBottom: "0px", marginBottom: "0px" }}
                    >
                      Posts
                    </Text>
                  </Button>
                </Tab>
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage slug="IconDarkFollowers.png" />
                    <Text
                      className="m-l-0-5"
                      paddingBottom="0px"
                      marginBottom="0px"
                      style={{ paddingBottom: "0px", marginBottom: "0px" }}
                    >
                      Followers
                    </Text>
                  </Button>
                </Tab>
                <Tab>
                  <Button variant="state_default_hover">
                    <IconImage slug="IconDarkFollowing.png" />
                    <Text
                      className="m-l-0-5"
                      paddingBottom="0px"
                      marginBottom="0px"
                      style={{ paddingBottom: "0px", marginBottom: "0px" }}
                    >
                      Following
                    </Text>
                  </Button>
                </Tab>
              </StyledRow>
            </TabList>
          }
        > */}
          <TabPanels>
            <TabPanel>{templatePosts()}</TabPanel>

            <TabPanel>
              <TemplateFollowers />
            </TabPanel>

            <TabPanel>
              <TemplateFollowing />
            </TabPanel>
          </TabPanels>
        {/* </LayoutCardPannel> */}
      </Tabs>
    );
  };

  return (
    <div>
      {user ? (
        <>
          {templateProfile()}
          {templateTabs()}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfile;
