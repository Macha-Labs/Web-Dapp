import { config } from "../config";

export const putStreamToken = async(body: any) => {
    const response = await fetch(`${config.url}/api/stream/token/create`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const data = await response.json();
    return data;
}


export const postStreamChannel = async(data: any) => {
    const response = await fetch(`${config.url}/api/stream/channel/update`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

export const addStreamMembers = async (data: any) => {
    const response = await fetch (`${config.url}/api/stream/join-channel`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response;
}

export const removeStreamMembers = async (data: any) => {
    const response = await fetch (`${config.url}/api/stream/removemember`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response;
}

export const viewStreamMembers = async (channelId: string) => {
    const response = await fetch (`${config.url}/api/stream/viewmembers/${channelId}`);
    const data = await response.json();
    return data;
}

export const listenPresence = async(channelId: string) => {
    const response = await fetch(`${config.url}/api/channels/presence/${channelId}`);
}

//creating a relation between channel and member added to stream
export const addChannelMembers = async(data: any) => {
    const response = await fetch(`${config.url}/api/channel/member/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

