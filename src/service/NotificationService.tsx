import { config } from "../config";

// testing stream notifs
export const newMessageNotification = async (payload: any) => {
    const response = await fetch(`${config.url}/api/notify`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};
