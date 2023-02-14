import { Heading } from "@chakra-ui/react";
import DotsHIcon from "components/Icon/DotsHIcon";
import PinIcon from "components/Icon/PinIcon";
import SearchIcon from "components/Icon/SearchIcon";
import { Icon, Row } from "style";


const LayoutChatHeader = (props) => {
    return (
        <div className="header hr-between vr-center">
            <Row className="w-100 h-100 hr-between vr-center">
                <Heading as="h4" size="sm">
                {/* {
                        Object.values(streamChannel?.state?.members).map((user: any) => 
                            <AvatarGroup size='sm' max={2}>
                                {
                                    context?.user?._id != user?.user_id
                                    ?
                                    (
                                        <Avatar size="sm" src={"https://meta-profile-photos.s3.ap-south-1.amazonaws.com/" + user.user_id! + ".png"}>
                                                {
                                                    user?.user.online
                                                    ?
                                                    (
                                                        <AvatarBadge boxSize='0.9em' bg='green.500' />
                                                    )
                                                    :
                                                    (<></>)
                                                }
                                        </Avatar>
                                    )
                                    :
                                    (
                                        <></>
                                    )
                                }
                            </AvatarGroup>
                        )
                    } */}
                </Heading>
                <div>
                    <Row className="vr-center">
                        <Icon className="circled state-0-1">
                            <PinIcon width="25" height="25" fill="#efefef"></PinIcon>
                        </Icon>
                        <Icon className="circled state-0-1">
                            <SearchIcon width="25" height="25" fill="#efefef"></SearchIcon>
                        </Icon>
                        <Icon className="circled state-0-1">
                            <DotsHIcon width="25" height="25" fill="#efefef"></DotsHIcon>
                        </Icon>
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default LayoutChatHeader;