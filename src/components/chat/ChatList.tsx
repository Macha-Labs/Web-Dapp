import { Col, Row, StyledChatItem } from "@/styles/StyledComponents";
import { Avatar, Button, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import OrgControl from "../org/OrgControl";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { ChatContext } from "@/providers/ChatProvider";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import useOrgChannels from "@/hooks/portal/useOrgChannels";
import ModalSlider from "../modal/ModalSlider";
import ChatProfile from "./ChatProfile";
import IconImage from "../icons/IconImage";

const ChatList = (props: any) => {
    const chatProvider = useContext(ChatContext);
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookOrgChannels = useOrgChannels("6246c7045cc31c36781d668e");
    const modalChatNew = useDisclosure();


    const TemplateChatNew =()=>{
        return (
            <ModalSlider event={modalChatNew} size="lg">
                <ChatProfile/>
            </ModalSlider>
        )
    }

    const TemplateChatList = () => {
        return (
            <>
                <Row className="header vr-center hr-between">
                <OrgControl />
            </Row>
            {!authContext.isConnected && <ConnectButton />} 
            {
                (!chatProvider?.hookChannels?.channels)
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
                    chatProvider?.hookChannels?.channels?.length
                        ?
                        (
                            <>
                                <div className="m-b-2">
                                    <Row className="menu-heading hr-between vr-center m-b-1">
                                        <Heading as="h4" size="md" className="m-b-1">New Channel</Heading>
                                        {
                                            (props?.context?.user?._id == props?.org?.owner)
                                                ?
                                                (
                                                    <Col>
                                                        <IconImage path="IconDarkPlus.png"
                                                        onClick={modalChatNew.onOpen}
                                                         />

                                                    </Col>
                                                )
                                                :
                                                (<></>)
                                        }
                                    </Row>
                                    <ul>
                                        {
                                            chatProvider?.hookChannels?.channels?.map((item: any, index: number) =>
                                                <StyledChatItem key={index}>
                                                    <Button
                                                        onClick={() => { console.log('Click on button', item); chatProvider.initiate(item, authContext.address) }}
                                                        className="menu-item w-100 m-b-1"
                                                        size="xl"
                                                        variant={chatProvider.hookChannel.channel?.id == item?.id ? 'state_brand' : 'state_card'}>
                                                            <Avatar size="md" src="" className="m-r-0-5"/>
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
                        </Col>
                    )
            }
            </>
        )
    }


    return (
        <>
            <TemplateChatList />
            <TemplateChatNew/>
        </>
    )
}

export default ChatList;