import { DownloadIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { Col, StyledIcon, Row, StyledFileCard } from "@/styles/StyledComponents";
import { truncateString } from "@/helpers";
import IconFile from "@/components/icons/IconFile";

const LayoutFilePreview = (props: any) => {
    return (
        <>
            <StyledFileCard className="hr-between vr-center">
                <Row className="vr-center">
                    <Col className="w-100">
                        <Row>
                            <IconFile width="20" height="20" fill="#efefef" className="m-r-1" />
                            <Text fontSize='md'>
                                {props.attachment?.name?.length > 30 ? (truncateString(props.attachment?.name)) : (props.attachment?.name)}
                            </Text>
                        </Row>
                    </Col>
                    <Col>
                        <StyledIcon>
                            <a href={props.attachment?.thumb_url} target="_blank" download>
                                <StyledIcon className="state-2-3">
                                    <DownloadIcon width="15" height="15" fill="#efefef" />
                                </StyledIcon>
                            </a>
                        </StyledIcon>
                    </Col>
                </Row>
            </StyledFileCard>
        </>
    )
}

export default LayoutFilePreview;
