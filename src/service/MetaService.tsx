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

export const metaResolver = async (params: any) => {
  const { slug, page, limit, category, uid, owner } = params;
  console.log("slug and other params",slug,page,limit, category, uid, owner);
  let url = `${config.metaServer}/indexer/metaResolver?limit=${
    limit ? limit : 30
  }${slug ? `&slug=${slug}` : ""}${category ? `&category=${category}` : ""}${
    page ? `&page=${page}` : ""
  }${uid ? `&uid=${uid}` : ""}${owner ? `&owner=${owner}` : ""}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMetaSchemas = async () => {
  const response = await fetch(
    `${config.metaServer}/indexer/meta-schemas/fetchAll`
  );
  const data = await response.json();
  return data;
};

// export const fetchMetaBySlug = async (metaSlug: any) => {
//   const response = await fetch(
//     `${config.metaServer}/indexer/metas/fetch-by-slug/${metaSlug}`
//   );
//   const data = await response.json();
//   return data;
// };

export const fetchMetaByUid = async (uid: any) => {
  const response = await fetch(
    `${config.metaServer}/indexer/metas/fetch-by-uid/${uid}`
  );
  const data = await response.json();
  return data;
};

export const fetchMetaByIpfsCid = async (cid: any) => {
  const response = await fetch(
    `https://gateway.lighthouse.storage/ipfs/${cid}`
  );
  const data = await response.json();
  return data;
};

// export const fetchPendingMeta = async (owner: string) => {
//   const response = await fetch(
//     `${config.metaServer}/api/studio/getMeta/${owner}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     }
//   );
//   console.log("form studio service pending metas", response);
//   return response.json();
// };

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

export const editPendingMeta = async (id: string, data: any) => {
  if (data && id) {
    const response = await fetch(
      `${config.metaServer}/api/studio/update/${id}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Edit response", response);
  }
};
