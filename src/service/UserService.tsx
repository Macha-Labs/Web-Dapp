import { config } from "../config";


export const getUsers = async () => {
    const response = await fetch(`${config.url}/api/users`);
    const data = await response.json();
    return data;
}

export const searchUsers = async (query: any) => {
    const response = await fetch(`${config.url}/api/users/search/${query}`);
    const data = await response.json();
    return data;
}

export const getAllUsers = async (username: string) => {
    const response = await fetch(`${config.url}/api/user/${username}/`);
    const data = await response.json();
    return data;
}

export const findOrCreateUser = async (userData: any) => {
    const response = await fetch(`${config.url}/api/user/find-or-create`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    const data = await response.json();
    return data;
}

export const findUserWallet = async (address: string) => {
    const response = await fetch(`${config.url}/api/user/${address}/find`);
    const data = await response.json();
    return data;
}

export const findUserGoogle = async (googleId: string) => {
    const response = await fetch(`${config.url}/api/user/${googleId}/google-find`);
    const data = await response.json();
    return data;
}

export const createUser = async(auth: any, uniqueId: string, userData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/create`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}


export const updateUser = async(auth: any, uniqueId: string, userData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/update`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}

export const updatePluginSocial = async(auth: any, uniqueId: string, pluginData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-social`, {
        method: 'POST',
        body: JSON.stringify(pluginData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}


export const updatePluginBlock = async(auth: any, uniqueId: string, pluginData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-block-explorer`, {
        method: 'POST',
        body: JSON.stringify(pluginData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}

export const updatePluginWallet = async(auth: any, uniqueId: string, pluginData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-wallet`, {
        method: 'POST',
        body: JSON.stringify(pluginData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}

export const updatePluginBlockscanChat = async(auth: any, uniqueId: string, pluginData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-blockscan-chat`, {
        method: 'POST',
        body: JSON.stringify(pluginData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}

export const updatePluginTags = async(auth: any, uniqueId: string, pluginData: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-tags`, {
        method: 'POST',
        body: JSON.stringify(pluginData),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
}

export const updatePluginLens = async(auth: any, uniqueId: string, data: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/plugin-lens`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const updateCalendar = async(auth: any, uniqueId: string, calendar: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/calendar`, {
        method: 'POST',
        body: JSON.stringify({'calendar': calendar}),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}


export const updateWallet = async(auth: any, uniqueId: string, wallet: any) => {
    const response = await fetch(`${config.url}/api/user/${auth}/${uniqueId}/wallet`, {
        method: 'POST',
        body: JSON.stringify({'wallet': wallet}),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

export const checkUserName = async(auth: any, uniqueId: string, username: string) => {
    const response = await fetch(`${config.url}/api/username/${auth}/${uniqueId}/${username}`);
    const data = await response.json();
    return data;
}

export const updateUserName = async(auth: any, uniqueId: string, username: string) => {
    const response = await fetch(`${config.url}/api/username/${auth}/${uniqueId}/${username}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const data = await response.json();
    return data;
}

export const updateActions = async(auth: any, uniqueId: string, actionsString: any) => {
    const response = await fetch(`${config.url}/api/${auth}/${uniqueId}/actions`, {
        method: 'POST',
        body: JSON.stringify({'actions': actionsString}),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const updateHiring = async(auth: any, uniqueId: string, hiringList: any[]) => {
    const response = await fetch(`${config.url}/api/${auth}/${uniqueId}/hiring`, {
        method: 'POST',
        body: JSON.stringify({'hiring': hiringList}),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const updatePhoto = async(address: string, file: any) => {
    let formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.url}/api/${address}/photo`, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

