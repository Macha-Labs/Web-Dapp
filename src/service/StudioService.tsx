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

export const deleteMetaInit = async (meta: any) => {
  if (meta?.state?.status == "PENDING") {
    const response = await fetch(
      `${config.metaServer}/api/studio/delete/${meta?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("form studio service deleting pending metas", response);
    return response.json();
  } else return null;
};

export const editPendingMeta = async(id: string, data: any) => {
  if (data && id) {
    const response = await fetch(`${config.metaServer}/api/studio/update/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("Edit response", response);
  }
}