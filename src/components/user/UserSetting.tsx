import useUserSetting from "@/hooks/user/useUserSetting";
import { Icon, Row, Card, PageMenu, PageMain } from "@/styles/StyledComponents";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";


const UserSetting = (props) => {
    const hookUserSetting = useUserSetting();

    const template = () => {
        return (<></>)
    }


    return (
        <>
            <Row>
                <PageMenu>
                    <div className="content">
                        <Row className="header vr-center m-b-1">
                            <div className="brand">
                                <Heading as="h4" size="md">User Settings</Heading>
                            </div>
                        </Row>
                        <div className="text-start body">
                            <div className="m-b-2">
                                <ul>
                                    <Button className="menu-item w-100 m-b-0-5" variant={hookUserSetting.tab == 'general' ? 'state_3' : 'state_1_2'} onClick={() => { hookUserSetting.setTab('general') }}>Profile</Button>
                                    <Button className="menu-item w-100 m-b-0-5" variant={hookUserSetting.tab  == 'nfts' ? 'state_3' : 'state_1_2'} onClick={() => { hookUserSetting.setTab('nfts') }}>Collect NFTs</Button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </PageMenu>
                <PageMain>
                    <div className="content">
                        <Card>
                            {
                                template()
                            }
                        </Card>
                    </div>
                    <div className="close">
                        <Icon className="state-2-3" onClick={props.modal.onClose}></Icon>
                    </div>
                </PageMain>
            </Row>
        </>
    )
}

export default UserSetting;