import { Avatar, Text } from "@chakra-ui/react";
import { Col, Row } from "style";
import { RowHover } from "style/app";
import { ChatPreviewCard } from "style/card";
import commands from "../../constants/commands.json";

const LayoutSlashPreview = (props) => {

    return (
        <>
            <ChatPreviewCard>
                <Col className="w-100 template-body">
                    {
                       props.slashCmds?.map(item => 
                            <RowHover
                                className="hr-between vr-center w-100"
                                onClick={() => {
                                    props.chatContext.slashRun(commands[item]);
                                }
                                }>
                                <Row className="w-100 vr-center">
                                    <Avatar size="sm" src={commands[item].src} className="m-r-0-5"/>
                                    <Text>{item}</Text>
                                </Row>
                            </RowHover>
                        ) 
                    }
                </Col>
            </ChatPreviewCard>
        </>
    )
}
export default LayoutSlashPreview;