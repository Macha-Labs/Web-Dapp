import useUserSetting from "@/hooks/user/useUserSetting";
import { AuthContext } from "@/providers/AuthProvider";
import { Icon, Row, StyledCard, PageMenu, PageMain, StyledPageList, StyledPageContainer } from "@/styles/StyledComponents";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import UserProfile from "./UserProfile";


const UserSetting = (props) => {
    const hookUserSetting = useUserSetting();
    const authContext = useContext(AuthContext);

    const template = () => {
        return (<UserProfile user={authContext?.user} />)
    }


    return (
        <>
            <Row>
                <StyledPageList>
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
                </StyledPageList>
                <StyledPageContainer>
                    <div className="content">
                        <StyledCard>
                            {
                                template()
                            }
                        </StyledCard>
                    </div>
                    <div className="close">
                        <Icon className="state-2-3" onClick={props.modal.onClose}></Icon>
                    </div>
                </StyledPageContainer>
            </Row>
        </>
    )
}

export default UserSetting;