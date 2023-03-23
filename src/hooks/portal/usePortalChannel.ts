import { permissionsChannel } from "./../../service/ChannelService";
import { putChannelForUser } from "../../service/ChannelService";
import { logger } from "../../helpers/logger";
import { editChannel } from "../../service/ChannelService";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { Channel$ } from "@/schema/channel";

const usePortalChannel = (channelObj: any, callback: any = null) => {
  console.log('Rendering >>>>> usePortalChannel');
  const [channel, setChannel] = useState(
    channelObj ? channelObj : new Channel$('getstream', {private: true})
  );
  const [isLoading, setIsLoading] = useState(false);
  const authProvider = useContext(AuthContext) as AuthContextType;

  const update = (usersIds: any = []) => {
    if (!channel?.name) {
      callback?.prompt("Add a name to the channel");
      return;
    }
    setIsLoading(true);
    if (channel.id) {
      editChannel(
        {
          name: channel.name,
          description: channel.description,
          image: channel.image,
          private: channel?.private,
        },
        channel.id
      )
        .then(res => {
          logger(
            "channel",
            "usePortalChannelUpdate.update",
            "getting response from API",
            [res]
          );
          callback.edit();

          setIsLoading(false);
        })
        .catch(err => {
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
        members: usersIds.concat([authProvider.address]),
        private: channel?.private || true,
      })
        .then(res => {
          logger(
            "channel",
            "usePortalChannelUpdate.create",
            "getting response from API",
            [res]
          );

          setIsLoading(false);
          callback.new(res._id);
        })
        .catch(err => {
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
      .then(res => {
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
      .catch(err => {
        logger(
          "channel",
          "usePortalChannelUpdate.updatePermissions",
          "getting error from API",
          [err]
        );
      });
  };
  const deleteChannel = (channel: any) => {
    logger("channel", "deleteChannel", "Deleting Channel", [channel]);
    channel.raw.delete().then((res: any) => {
      callback.delete(channel.id);
    });
  };
  const clearChat = (channel: any) => {
    logger("channel", "usePortalChannelclarChat", "Chat Clear", [channel]);
    channel.raw.truncate().then((res: any) => {
      callback.clear();
    });
  };
  const muteChannel = (channel: any) => {
    logger("channel", "usePortalChannelmute", "Muting Channel", [channel]);
    channel.raw.mute().then(() => {
      callback.mute();
    });
  };
  const unMuteChannel = (channel: any) => {
    logger("channel", "usePortalChannelUnmute", "UnMuting Channel", [channel]);
    channel.raw.unmute().then(() => {
      callback.unmute();
    });
  };

  const leaveChannel = (channel: any) => {
    logger("channel", "usePortalChannelLeave", "Leaving Channel", [channel]);
    channel.raw.removeMembers([authProvider.address]).then((res: any) => {
      callback.leave(channel.id);
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
    deleteChannel,
    clearChat,
    muteChannel,
    unMuteChannel,
    leaveChannel,
  };
};

export default usePortalChannel;
