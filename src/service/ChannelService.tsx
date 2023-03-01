import {config} from "../config";

export const getChannel = async (channelId: any) => {
    const response = await fetch(`${config.url}/api/channel/find/${channelId}`);
    const data = await response.json();
    return data;
};

///// ------------------------------------------- FOR USERS ------------------------------------------- /////
export const putChannelForUser = async (data: any) => {
    const response = await fetch(`${config.url}/api/channel/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.json();
};

export const fetchChannelsForUser = async (userId: any) => {
    const response = await fetch(
        `${config.url}/api/channel/messaging/user/${userId}/find`
    );
    const data = await response.json();
    return data;
};

///// ----------------------------------------- FOR ORGANIZATIONS ------------------------------------- /////
export const fetchChannelsForOrg = async (orgId: any) => {
    const response = await fetch(`${config.url}/api/channel/org/${orgId}/find`);
    const data = await response.json();
    return data;
};

export const putChannel = async (data: any) => {
    const response = await fetch(`${config.url}/api/channel/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response.json();
};

export const permissionsChannel = async (data: any, id: any) => {
    const response = await fetch(
        `${config.url}/api/channel/permissions/${id}`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        }
    );
    return response;
};

export const editChannel = async (data: any, id: any) => {
    const response = await fetch(`${config.url}/api/channel/edit/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });
    return response;
};

export const delChannel = async (data: any) => {
    const response = await fetch(`${config.url}/api/channel/delete`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

// adding a user in a channel
export const serviceAddMembers = async (data: any) => {
    const response = await fetch(`${config.url}/api/channel/admin-add-members/${data.id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

export const serviceRemoveMembers  = async (data: any) => {
    const response = await fetch(`${config.url}/api/channel/admin-remove-members/${data.id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};