import { config } from "../config";

type metaInit = {
  name: string;
  description: string;
  image?: string;
  status: string;
  owner: string;
};

export const initialiseNewMeta = async (data: metaInit) => {
  const response = await fetch(`${config.metaServer}/api/studio/metainit`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log("form studio service ", response);
  return response.json();
};

export const fetchAllMetas = async () => {
  const response = await fetch(`${config.metaServer}/api/meta/fetchAll`);
  const data = await response.json();
  return data;
};

export const fetchPendingMeta = async (owner: string) => {
  const response = await fetch(
    `${config.metaServer}/api/studio/getMeta/${owner}`,
    {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  console.log("form studio service pending metas", response);
  return response.json();
};
