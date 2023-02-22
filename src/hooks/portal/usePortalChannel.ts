import { permissionsChannel } from "./../../service/ChannelService";
// import {useNavigation} from "@react-navigation/native";
import { putChannelForUser } from "../../service/ChannelService";
import { logger } from "../../helpers/logger";
import { editChannel } from "../../service/ChannelService";
import { useContext, useState } from "react";
// import {useToast} from "native-base";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { ChannelStream$ } from "../../schema/channel";
import { useToast } from "@chakra-ui/react";

const usePortalChannel = (channelData: any, callback:any=null) => {
    const [channel, setChannel] = useState(
        channelData ? channelData : ChannelStream$({})
    );
    const [isLoading, setIsLoading] = useState(false);    
    const authProvider = useContext(AuthContext) as AuthContextType;
    // const navigation = useNavigation<any>();

    const update = () => {
        setIsLoading(true);
        if (channel.id) {
            editChannel(
                {
                    name: channel.name,
                    description: channel.description,
                    image: channel.image,
                },
                channel.id
            )
                .then((res) => {
                    logger(
                        "channel",
                        "usePortalChannelUpdate.update",
                        "getting response from API",
                        [res]
                    );
                    callback();
                    
                    setIsLoading(false);
                    // navigation.navigate("Chat", {
                    //     channel: channel,
                    // });
                })
                .catch((err) => {
                    logger(
                        "channel",
                        "usePortalChannelUpdate.update",
                        "getting error from API",
                        [err]
                    );
                });
        } else {
            putChannelForUser({
                name: channel.name,
                description: channel.description,
                userAddress: authProvider.address,
                image: channel.image,
            })
                .then((res) => {
                    logger(
                        "channel",
                        "usePortalChannelUpdate.create",
                        "getting response from API",
                        [res]
                    );                    
                    
                    setIsLoading(false);
                    callback();
                    // ! TODO: This data is sent by DB and not getStream, have to resolve this
                    // navigation.navigate("Chat", {
                    //     channel: channel,
                    // });
                })
                .catch((err) => {
                    logger(
                        "channel",
                        "usePortalChannelUpdate.create",
                        "getting error from API",
                        [err]
                    );
                });
        }
    };

    const togglePermission = (value: any) => {
        console.log("channel.permissions", channel.permissions);
        if (channel.permissions.includes(value)) {
            setChannel({
                ...channel,
                permissions: channel.permissions.filter(
                    (permission: any) => permission !== value
                ),
            });
        } else {
            setChannel({
                ...channel,
                permissions: [...channel.permissions, value],
            });
        }
    };
const deleteChannel= ()=>{

}
    const updatePermissions = () => {
        logger(
            "channel",
            "usePortalChannelUpdate.updatePermissions",
            "updating permissions",
            [channel]
        );
        
        setIsLoading(true);
        permissionsChannel({ permissions: channel.permissions }, channel.id)
            .then((res) => {
                logger(
                    "channel",
                    "usePortalChannelUpdate.updatePermissions",
                    "getting response from API",
                    [res]
                );
                // toast.show({
                //     description: "Channel Permissions updated successfully",
                //     avoidKeyboard: true,
                //     duration: 3000,
                // });
                setIsLoading(false);
                // navigation.goBack();
            })
            .catch((err) => {
                logger(
                    "channel",
                    "usePortalChannelUpdate.updatePermissions",
                    "getting error from API",
                    [err]
                );
            });
    };

    return {
        update,
        channel,
        setChannel,
        isLoading,
        setIsLoading,
        togglePermission,
        updatePermissions,
    };
};

export default usePortalChannel;
