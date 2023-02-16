import UserProfile from "@/components/user/UserProfile";
import UserSetting from "@/components/user/UserSetting";
import { AuthContext } from "@/providers/AuthProvider";
import { Row, StyledChat, StyledChatList } from "@/styles/StyledComponents";
import React, { useState } from "react";
import { useContext } from "react";

const User = () => {
    const authContext = useContext(AuthContext);

    const TempalteRight = () => {
        return (
            <UserProfile user={authContext?.user} />
        )
    }


    return (
        <Row>
        <StyledChatList>

        </StyledChatList>
        <StyledChat>
            <TempalteRight />
        </StyledChat>
        </Row>
    )
}

export default User;