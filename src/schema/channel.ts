import {omitDeep} from "@patomation/omit-deep";

const omit = (object: any, name: string) => {
    return omitDeep(object, name);
};

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
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
        permissions: data?.permissions,
        image: "",
        lastMessage: "",
        membersCount: 0,
        notificationCount: 0,
    };
};

export const ChannelStream$ = (data: any, raw?: any) => {
    return {
        id: data?.id,
        type: data?.type,
        name: data?.name,
        description: data?.description,
        orgId: data?.orgId,
        private: data?.private,
        users: data?.users,
        admins: data?.admins,
        createdBy: data?.created_by?.id,
        createdAt: data?.created_at,
        updatedAt: data?.updated_at,
        permissions: data?.own_capabilities,
        image: "",
        unreadCountObject: raw?.state?.read ? raw?.state?.read : 0,
        lastMessage: raw?.state?.messageSets[0]?.messages[raw?.state?.messageSets[0]?.messages?.length - 1],
        membersCount: data?.member_count,
        notificationCount: 0,
        raw: raw,
    };
};
