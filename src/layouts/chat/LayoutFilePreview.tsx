import { DownloadIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { Col, StyledIcon, Row, StyledFileCard, StyledIframeView } from "@/styles/StyledComponents";
import { truncateString } from "@/helpers";
import IconImage from "@/components/icons/IconImage";
import { useState } from "react";

const LayoutFilePreview = (props: any) => {
    const [showMedia, setShowMedia] = useState(false)
    return (
        <>
            <StyledFileCard className="hr-between vr-center">
                <Row onClick={() => setShowMedia(!showMedia)} className="vr-center">
                    <Col className="w-100">
                        <Row>
                        <IconImage
                                path="IconDarkFiles.png"
                                style={{ className: "m-r-0-5" }}
                            />
                            <Text fontSize='md'>
                                {props.attachment?.name?.length > 30 ? (truncateString(props.attachment?.name)) : (props.attachment?.name)}
                            </Text>
                        </Row>
                    </Col>
                    <Col >

                     {
                       showMedia &&  <StyledIframeView onClick={() => setShowMedia(!showMedia)} >
                        <iframe onClick={() => setShowMedia(!showMedia)} src={props.attachment?.thumb_url} allowTransparency={false} allowFullScreen  />
                         </StyledIframeView>
                     } 
                        <a href={props.attachment?.thumb_url} target="_blank" rel='noreferrer' download>
                                <StyledIcon className="state-2-3">
                                    <DownloadIcon width="15" height="15" fill="#efefef" />
                                </StyledIcon>
                        </a>
                    </Col>
                </Row>
            </StyledFileCard>
        </>
    )
}

export default LayoutFilePreview;
