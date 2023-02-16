import UserCard from "@/components/user/UserCard";
import UserProfile from "@/components/user/UserProfile";
import { helperIPFS } from "@/helpers";
import { useUserSettings } from "@/hooks/user/useUserSetting";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import { Row, StyledCard, StyledChat, StyledChatList, StyledPageContainer, StyledPageList } from "@/styles/StyledComponents";
import { Avatar, Input, Text} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";

const User = () => {
    const authContext = useContext(AuthContext);
    const hookUserSetting = useUserSettings();

    const TempalteRight = () => {
        return (
            <StyledCard className="border"><UserProfile user={authContext?.user} /></StyledCard>
        )
    }

    const settingOptions = [

    ]


    return (
        <Row>
        <StyledPageList>
            <div className="header vr-center">
                <Input />
            </div>
            <div className="body">
                <UserCard user={authContext?.user} />
                <LayoutOptions options={hookUserSetting.userSettings} style={{class: 'm-t-1'}} />
            </div>
        </StyledPageList>
        <StyledPageContainer>
            <div className="header">
                <Avatar src={helperIPFS(authContext?.user?.lens?.image)} className="m-r-0-5" size="sm" />
                <Text fontSize="sm">{authContext?.user?.lens?.name}</Text>
            </div>
            <div className="body">
                <TempalteRight />
            </div>
        </StyledPageContainer>
        </Row>
    )
}

export default User;