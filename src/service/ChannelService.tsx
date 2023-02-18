import {config} from "../config";

export const getChannel = async (channelId) => {
    const response = await fetch(`${config.url}/api/channel/find/${channelId}`);
    const data = await response.json();
    console.log(data);
    return data;
};

///// ------------------------------------------- FOR USERS ------------------------------------------- /////
export const putChannelForUser = async (data) => {
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

export const fetchChannelsForUser = async (userId) => {
    const response = await fetch(
        `${config.url}/api/channel/messaging/user/${userId}/find`
    );
    const data = await response.json();
    console.log(data);
    return data;
};

///// ----------------------------------------- FOR ORGANIZATIONS ------------------------------------- /////
export const fetchChannelsForOrg = async (orgId) => {
    const response = await fetch(`${config.url}/api/channel/org/${orgId}/find`);
    const data = await response.json();
    console.log(data);
    return data;
};

export const putChannel = async (data) => {
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

export const permissionsChannel = async (data, id) => {
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
    return response.json();
};

export const editChannel = async (data, id) => {
    const response = await fetch(`${config.url}/api/channel/edit/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });
    return response.json();
};

export const delChannel = async (data) => {
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
export const addMembers = async (data) => {
    console.log(data);
    const resopnse = await fetch(`${config.url}/api/channel/admin-add-members/${data.id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const removeMembers = async (data) => {
  console.log(data);
  const response = await fetch(
    `${config.url}/api/channel/admin-remove-members/${data.id}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};