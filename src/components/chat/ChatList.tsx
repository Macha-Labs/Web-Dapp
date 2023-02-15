import { Col, Row, StyledChatItem } from "@/styles/StyledComponents";
import { Avatar, Button, Heading, Icon } from "@chakra-ui/react";
import OrgControl from "../org/OrgControl";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ChatList = (props) => {
    const templateMenuSection = (type) => {

        return (
            <>
                {
                    props.channels?.length
                        ?
                        (
                            <>
                                <div className="m-b-2">
                                    <Row className="vr-center menu-heading hr-between">
                                        <Heading as="h4" size="md" className="m-b-1"></Heading>
                                        {
                                            (props?.context?.user?._id == props?.org?.owner)
                                                ?
                                                (
                                                    <Col>
                                                        <Icon className="state-2-3 m-b-1" onClick={props.channelNew}>
                                                            {/* <AddIcon /> */}
                                                        </Icon>

                                                    </Col>
                                                )
                                                :
                                                (<></>)
                                        }
                                    </Row>
                                    <ul>
                                        {
                                            props.channels.map((item: any, index: number) =>
                                                <StyledChatItem key={index}>
                                                    <Button
                                                        onClick={() => { props.triggerMenu(item) }}
                                                        className="menu-item w-100 m-b-1"
                                                        size="md"
                                                        variant={props.menu?._id == item?._id ? 'state_card' : 'transparent'}>
                                                            <Avatar size="sm" src="" className="m-r-0-5"/>
                                                            <Col className="w-100">
                                                                {item.name}
                                                            </Col>
                                                        {
                                                            (props.context?.user?._id == props.org?.owner)
                                                                ?
                                                                (
                                                                    <Col className="hr-center settingsIcon">
                                                                        <Icon>
                                                                            {/* <SettingsIcon
                                                                                as='button'
                                                                                key={item.id}
                                                                                onClick={event => props.channelSetting(event, item)} /> */}
                                                                        </Icon>
                                                                    </Col>
                                                                )
                                                                :
                                                                (
                                                                    <></>
                                                                )
                                                        }
                                                    </Button>
                                                </StyledChatItem>
                                            )
                                        }
                                    </ul>
                                </div>
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


    return (
        <>
            <Row className="header vr-center hr-between">
                <OrgControl />
            </Row>
            <ConnectButton />
            {
                (!props?.channels?.length)
                    ?
                    (
                        <>
                            Create your first channel
                            <Button size="sm" onClick={props.channelNew}>First Channel</Button>
                        </>
                    )
                    :
                    (
                        <Col className="body verticlescroll hidescroll">
                            {
                                templateMenuSection('chat')
                            }
                        </Col>
                    )
            }
        </>
    )
}

export default ChatList;