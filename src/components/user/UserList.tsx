import { Avatar, AvatarBadge, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Col, Row } from "@/styles/StyledComponents";
import styled from "styled-components";
import { helperIPFS, truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";

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

    const template = (heading, users) => {
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
                                users.map((item: any, index) =>
                                    <Row key={index} className="vr-center item m-b-0-5" >
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

    return (
        <>
            
            {template('Online', props.onlineUsers)}

            {template('Ofline', props.offlineUsers)}
        </>
    )
}

export default UserList;