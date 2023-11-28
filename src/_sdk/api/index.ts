import { config } from "@/config";
import { MetaSearchInterface, SearchInterface } from "../interfaces";

export const embeddSearchResolver = async (query: String) => {
  const response = await fetch(
    `${config.metaServer}/graph/api/query/lens_publication`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: query })
    }
  );
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return {
      error: "Not found",
    };
  }
};

export const queryResolver = async (params: SearchInterface) => {
  const { searchQuery, category, slug, owner, page, limit } = params;
  const response = await fetch(
    `${config.metaServer}/indexer/queryResolver/${searchQuery}?limit=${limit ? limit : 30
    }${slug ? `&slug=${slug}` : ""}${category ? `&category=${category}` : ""}${page ? `&page=${page}` : ""
    }${owner ? `&owner=${owner}` : ""}`,
    { headers: { Authorization: `Bearer ${config.apiKey}` } }
  );
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return {
      error: "Not found",
    };
  }
};

export const metaResolver = async (params: MetaSearchInterface) => {
  const { slug, page, limit, category, uid, owner } = params;
  // //console.log("slug and other params", slug, page, limit, category, uid, owner);
  let url = `${config.metaServer}/indexer/metaResolver?limit=${limit ? limit : 30
    }${slug ? `&slug=${slug}` : ""}${category ? `&category=${category}` : ""}${page ? `&page=${page}` : ""
    }${uid ? `&uid=${uid}` : ""}${owner ? `&owner=${owner}` : ""}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${config.apiKey}` },
  });
  const data = await response.json();
  return data;
};
