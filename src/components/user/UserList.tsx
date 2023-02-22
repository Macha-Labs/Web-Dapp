import { Avatar, AvatarBadge, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Col, Row } from "@/styles/StyledComponents";
import styled from "styled-components";
import { helperIPFS, truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import ModalSlider from "../modal/ModalSlider";
import UserProfile from "./UserProfile";

interface Props {
    [key: string]: any
}

const Container = styled.div`
    .item {
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
            background: ${style.button.bg.default};
        }
    }
`

const UserList: FC<Props> = (props) => {
    const modalProfile = useDisclosure();
    const [selectedUser, setSelectedUser] = useState<any>();

    const handleSelectedUser = (user: any) => {
        modalProfile.onOpen();
        setSelectedUser(user)
    }

    const template = (heading: any, users: any) => {
        return (
            <Col className="m-b-1"> 
                {
                users.length ?
                (
                    <>
                        <Col className="m-b-1">
                            <Heading as="h4" size="md">{heading}</Heading>
                        </Col>
                        <Container>
                            {
                                users.map((item: any, index: any) =>
                                    <Row key={index} className="vr-center item m-b-0-5" onClick={() => {handleSelectedUser(item)}} >
                                        <Avatar src={helperIPFS(item.image)} className="m-r-0-5" size="sm" >
                                        {
                                            heading == 'Online' ? (<AvatarBadge boxSize='0.7em' bg='green.500' />) : (<></>)
                                        }
                                        </Avatar>
                                        {
                                            item?.name
                                                ?
                                                (<h6>{item?.name}</h6>)
                                                :
                                                (
                                                    <h6>{truncateAddress(item?.handle)}</h6>
                                                )
                                        }
                                    </Row>
                                )
                            }
                        </Container>
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

    const TemplateProfile = () => {
        return (
            <ModalSlider event={modalProfile} size="lg">
                <UserProfile user={{lens: selectedUser}} />
            </ModalSlider>
        )
    }

    return (
        <>
            
            {template('Online', props.onlineUsers)}

            {template('Ofline', props.offlineUsers)}

            <TemplateProfile />
        </>
    )
}

export default UserList;