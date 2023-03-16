export const Channel$ = (data: any) => {
  return {
    id: data?._id,
    type: data?.type,
    name: data?.name,
    orgId: data?.orgId,
    private: data?.private,
    users: data?.users,
    admins: data?.admins,
    createdBy: data?.createdBy,
    created_at: data?.createdAt,
    updated_at: data?.updatedAt,
    permissions: data?.permissions,
    image: "",
    lastMessage: "",
    membersCount: 0,
    notificationCount: 0,
    pinnedMessages: data?.state?.pinnedMessages
  };
};

export const ChannelStream$ = (data: any, raw?: any, owner?: any) => {
  return {
    id: data?.id,
    type: data?.type,
    name: data?.name,
    description: data?.description,
    orgId: data?.orgId,
    private: data?.private,
    users: data?.users,
    admins: data?.admins,
    isAdmin:
      String(data?.created_by?.id)?.toLowerCase() == String(owner)?.toLowerCase(),
    createdBy: data?.created_by?.id,
    created_at: data?.created_at,
    updated_at: data?.updated_at,
    permissions: data?.own_capabilities,
    image: "",
    unreadCountObject: raw?.state?.read ? raw?.state?.read : 0,
    lastMessage:
      raw?.state?.messageSets[0]?.messages[
        raw?.state?.messageSets[0]?.messages?.length - 1
      ],
    membersCount: data?.member_count,
    notificationCount: 0,
    raw: raw,
    pinnedMessages: raw?.state?.pinnedMessages
  };
};

export const ChannelXMTP$ = (data: any) => {
  return {
    id: data?.peerAddress?.toLowerCase(),
    type: data?.type,
    name: data?.peerAddress?.toLowerCase(),
    orgId: data?.orgId,
    private: data?.private,
    users: data?.users,
    admins: data?.admins,
    createdBy: data?.createdBy?.toLowerCase(),
    created_at: data?.createdAt,
    updated_at: data?.updatedAt,
    permissions: data?.permissions,
    image: "",
    lastMessage: "",
    membersCount: 0,
    notificationCount: 0,
    unreadCountObject: {},
    send: data.send,
    xmtpRaw: data,
    pinnedMessages: data?.state?.pinnedMessages
  };
};
