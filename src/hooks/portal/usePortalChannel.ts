import { permissionsChannel } from "./../../service/ChannelService";
// import {useNavigation} from "@react-navigation/native";
import { putChannelForUser } from "../../service/ChannelService";
import { logger } from "../../helpers/logger";
import { editChannel } from "../../service/ChannelService";
import { useContext, useState } from "react";
// import {useToast} from "native-base";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { ChannelStream$ } from "../../schema/channel";
import { Toast, useToast } from "@chakra-ui/react";

const usePortalChannel = (channelData: any, callback: any = null) => {
  const toast = useToast();
  const [channel, setChannel] = useState(
    channelData ? channelData : ChannelStream$({})
  );
  const [isLoading, setIsLoading] = useState(false);
  const authProvider = useContext(AuthContext) as AuthContextType;
  // const navigation = useNavigation<any>();

  const update = (usersIds: any = null) => {
    if (!channel?.name) {
      callback?.prompt('Add a name to the channel')
      return;
    }
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
          callback.edit();

          setIsLoading(false);
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
        members: usersIds
      })
        .then((res) => {
          logger(
            "channel",
            "usePortalChannelUpdate.create",
            "getting response from API",
            [res]
          );

          setIsLoading(false);
          callback.new();
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
  const deleteChannel = (channel: any) => {
    logger("channel", "usePortalChanneldelete", "Deleting Channel", [channel]);
    channel.raw.delete();
    callback.delete();
  };
  const muteChannel = (channel: any) => {
    logger("channel", "usePortalChannelmute", "Muting Channel", [channel]);
    channel.raw.mute();
    callback.mute();
  };
  const unMuteChannel = (channel: any) => {
    logger("channel", "usePortalChannelUnmute", "UnMuting Channel", [channel]);
    channel.raw.unmute();
    callback.unmute();
  };
  return {
    update,
    channel,
    setChannel,
    isLoading,
    setIsLoading,
    togglePermission,
    updatePermissions,
    deleteChannel,
    muteChannel,
    unMuteChannel,
  };
};

export default usePortalChannel;
