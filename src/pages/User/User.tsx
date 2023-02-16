import UserCard from "@/components/user/UserCard";
import UserProfile from "@/components/user/UserProfile";
import UserSetting from "@/components/user/UserSetting";
import { useUserSettings } from "@/hooks/user/useUserSetting";
import LayoutOptions from "@/layouts/options/LayoutOptions";
import { AuthContext } from "@/providers/AuthProvider";
import { Row, StyledCard, StyledChat, StyledChatList, StyledPageContainer, StyledPageList } from "@/styles/StyledComponents";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";

const User = () => {
    const authContext = useContext(AuthContext);
    const hookUserSetting = useUserSettings();

    const TempalteRight = () => {
        return (
            <StyledCard><UserProfile user={authContext?.user} /></StyledCard>
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
                <LayoutOptions options={hookUserSetting.userSettings} />
            </div>
        </StyledPageList>
        <StyledPageContainer>
            <div className="header">

            </div>
            <div className="body">
                <TempalteRight />
            </div>
        </StyledPageContainer>
        </Row>
    )
}

export default User;