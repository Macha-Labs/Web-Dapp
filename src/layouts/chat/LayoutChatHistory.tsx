import { Heading, Input, Text } from "@chakra-ui/react";
import LayoutChannelMessage from "cLayouts/LayoutChannelMessage";
import AddIcon from "components/Icon/AddIcon";
import { Col, Icon, Row } from "style";

interface Props {
    query: any;
    drawer: any;
    channels: any;
    selectedChannel: any;
    context: any;
    handleChannelChange: any;
    handleSearch: any;
}

const LayoutChatHistory = (props: Props) => {
    return (
        <>
            <Row className="header vr-center">
                <div className="brand">
                    <Input value={props.query} onChange={props.handleSearch} placeholder="Search member" />
                </div>
            </Row>
            <div className="text-start body">
                <Row className="hr-between vr-center m-b-1">
                    <Text fontSize='lg' as='b'>Direct Message</Text>
                    <Icon onClick={props.drawer.onOpen}>
                        <AddIcon width="20" height="20" fill="#e8e8e8" />
                    </Icon>
                </Row>
                <Row>
                    <Col className="w-100">
                        {props.channels.length ? (
                            props.channels.map((item, index) => {
                                return (
                                <LayoutChannelMessage
                                    context={props.context} 
                                    users={Object.values(item.state.members)} 
                                    handleChannelChange={props.handleChannelChange} 
                                    index={index}
                                    channel={item}
                                    selectedChannel={props.selectedChannel} />
                                )
                            })
                        ) :
                        (
                            <Col className="p-1">
                                <Heading as="h4" size="lg">No message</Heading>
                                <Text fontSize="md">Be the first one to start conversation</Text>
                            </Col>
                        )
                        }
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default LayoutChatHistory;