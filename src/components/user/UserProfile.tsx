import { Avatar, Button, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Col, Icon, Row } from "@/styles/StyledComponents";
import { ChatIcon } from "@chakra-ui/icons";
import useLensFollows from "@/hooks/lens/useLensFollow";
import useLensPostsForUser from "@/hooks/lens/useLensPostsForUser";
import useLensConnections from "@/hooks/lens/useLensConnections";
import LayoutPostList from "../../layouts/post/LayoutPostList";
import LayoutProfileBanner from "@/layouts/LayoutProfileBanner";
import LayoutCard from "@/layouts/LayoutCard";


interface Props {
    [key: string]: any
}


const UserProfile = ({ ...props }) => {
    const hookLensFollow = useLensFollows(props.user?.lens?.id);
    const hookLensPostsForUser = useLensPostsForUser(props?.user?.lens?.id);
    const hookLensConnections = useLensConnections(props.user?.lens?.ownedBy);

    const templateConnections = () => {

        return (
            <>
                {
                    (hookLensConnections.following?.length)
                        ?
                        (
                            <Wrap className="m-b-2">
                                {
                                    hookLensConnections.following.length
                                        ?
                                        (
                                            <WrapItem className="w-1-2 m-0">
                                                <LayoutCard className="m-h-0-5">
                                                    <Col className="w-100 vr-center">
                                                        <Heading as="h5" size="sm" className="m-b-1">{props.profile?.name ? props.profile?.name : props.profile?.handle} Follows</Heading>
                                                        <Row>
                                                            <Wrap>
                                                                {
                                                                    hookLensConnections.following.slice(0, 5).map((item:any) =>
                                                                        <WrapItem>
                                                                            <Avatar size='sm' src={item.image} name={item.name}></Avatar>
                                                                        </WrapItem>
                                                                    )
                                                                }

                                                                {
                                                                    hookLensConnections.following.length > 5
                                                                        ?
                                                                        (
                                                                            <WrapItem>
                                                                                <Avatar onClick={props.transitionUsers} size='sm' icon={<Text>{hookLensConnections.following.length - 5}</Text>}></Avatar>
                                                                            </WrapItem>
                                                                        )
                                                                        :
                                                                        (
                                                                            <></>
                                                                        )
                                                                }
                                                            </Wrap>
                                                        </Row>
                                                    </Col>
                                                </LayoutCard>
                                            </WrapItem>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                }
                            </Wrap>
                        )
                        :
                        (
                            <></>
                        )
                }

            </>
        )
    }

    const templateSocial = () => {
        return (
            <>
                <Row className="m-t-0-5">
                    {
                        props.profile?.attributesObj?.website?.value
                            ?
                            (
                                <a href={props.profile?.attributesObj?.website?.value} target="_blank" rel="noreferrer">
                                    <Icon className="state-1-2">
                                        {/* <GlobeIcon width="24" height="24" fill="#e8e8e8" /> */}
                                    </Icon>
                                </a>
                            )
                            :
                            (<></>)
                    }
                    {
                        props.profile?.attributesObj?.twitter?.value
                            ?
                            (
                                <a href={props.profile?.attributesObj?.twitter?.value} target="_blank" rel="noreferrer">
                                    <Icon className="state-1-2">
                                        {/* <TwitterIcon width="24" height="24" fill="#e8e8e8" /> */}
                                    </Icon>
                                </a>
                            )
                            :
                            (<></>)
                    }
                </Row>
            </>
        )
    }

    const templatePosts = () => {
        return (
            <Col>
                <LayoutPostList list={hookLensPostsForUser.posts} isLoading={hookLensPostsForUser.isLoading} />
            </Col>
        )
    }

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
        )
    }

    return (
        <>
            {
                props.user
                    ?
                    (
                        <>
                            <LayoutProfileBanner profile={props.user?.lens}/>

                            <Row>
                                <Col className="m-v-1 w-100 hr-center">
                                    <Heading as="h3" size="lg">{props.user?.lens?.name ? props.user?.lens?.name : props.user?.lens?.handle}</Heading>
                                    <h6>@{props.user?.lens?.handle}</h6>
                                </Col>
                            </Row>

                            <Row className="vr-center hr-center">
                                {
                                    props.user?.lens?.bio
                                        ?
                                        (
                                            <Col className="m-v-1">
                                                <Text className="bioText">{props?.user?.lens?.bio}</Text>
                                            </Col>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                }
                            </Row>

                            <Row className="m-v-1 vr-center hr-center">
                                {
                                    props.user?.lens?.isFollowedByMe ? (
                                        <Button
                                            variant="state_lens_unfollow"
                                            size="md"
                                            className="m-r-1"
                                            onClick={() => { hookLensFollow.triggerUnFollow() }}
                                            isLoading={hookLensFollow.isLoading}
                                            loadingText={hookLensFollow.loadingText}>
                                            Unfollow on Lens
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="state_lens"
                                            size="md"
                                            className="m-r-1"
                                            onClick={() => { hookLensFollow.triggerFollow() }}
                                            isLoading={hookLensFollow.isLoading}
                                            loadingText={hookLensFollow.loadingText}>
                                            Follow on Lens
                                        </Button>
                                    )
                                }
                                <Button
                                    leftIcon={<ChatIcon />}
                                    variant="outline"
                                    size="md">
                                    Message
                                </Button>
                            </Row>

                            <Tabs variant="unstyled">
                                <TabList>
                                    <Row className="m-v-1 w-100 vr-center hr-center">
                                        <Tab>
                                            <Row className="m-h-0-5">
                                                <Col className="m-r-0-5">
                                                    <Avatar size="sm" />
                                                </Col>

                                                <Col>
                                                    Post
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab>
                                            <Row className="m-h-0-5">
                                                <Col className="m-r-0-5">
                                                    <Avatar size="sm" />
                                                </Col>

                                                <Col>
                                                    NFTs
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab>
                                            <Row className="m-h-0-5">
                                                <Col className="m-r-0-5">
                                                    <Avatar size="sm" />
                                                </Col>

                                                <Col>
                                                    Projects
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab>
                                            <Row className="m-h-0-5">
                                                <Col className="m-r-0-5">
                                                    <Avatar size="sm" />
                                                </Col>

                                                <Col>
                                                    People
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Row>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        {templatePosts()}
                                    </TabPanel>

                                    <TabPanel>
                                        {templateNfts()}
                                    </TabPanel>

                                    <TabPanel>
                                        <Text>Projects coming up</Text>
                                    </TabPanel>

                                    <TabPanel>
                                        {templateConnections()}
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
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

export default UserProfile;