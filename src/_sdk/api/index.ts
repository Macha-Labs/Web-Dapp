import { config } from "../config";
import { MetaSearchInterface, SearchInterface } from "../interfaces";

export const queryResolver = async (params: SearchInterface) => {
  const { searchQuery, category, slug, owner, page, limit } = params;
  const response = await fetch(
    `${config.metaServer}/indexer/queryResolver/${searchQuery}?limit=${
      limit ? limit : 30
    }${slug ? `&slug=${slug}` : ""}${category ? `&category=${category}` : ""}${
      page ? `&page=${page}` : ""
    }${owner ? `&owner=${owner}` : ""}`
  );
  if (response.status == 200) {
    console.log("response querySearch api", response);
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
  console.log("slug and other params", slug, page, limit, category, uid, owner);
  let url = `${config.metaServer}/indexer/metaResolver?limit=${
    limit ? limit : 30
  }${slug ? `&slug=${slug}` : ""}${category ? `&category=${category}` : ""}${
    page ? `&page=${page}` : ""
  }${uid ? `&uid=${uid}` : ""}${owner ? `&owner=${owner}` : ""}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
