import { config } from "../config";

// testing stream notifs
export const newMessageNotification = async (payload: any) => {
    console.log("Testing notifs ", payload);
    const response = await fetch(`${config.url}/api/notify`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};
