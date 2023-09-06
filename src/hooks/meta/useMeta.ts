import { fetchMetaByIpfsCid, fetchMetaByUid } from "@/service/MetaService";
import { useState } from "react";

const useMeta = () => {
  const [metaData, setMetaData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = (metaSlug: any) => {
    if (String(metaSlug).length == 24) {
      fetchMetaByUid(metaSlug).then((res) => {
        setMetaData(res.data);
        setIsLoading(false)
        console.log(res.data, "useMeta");
      });
    }
    else {
      fetchMetaByIpfsCid(metaSlug).then((res) => {
        if (res) {
          console.log(res, "ipfs meta data")
          setMetaData({
            meta: {
              data: {
                modified: {
                  meta_description: res.description,
                  meta_image: res.link,
                }
              }
            },
            meta_tags: res.tags ? res.tags.split(",") : [],
            metaOwner: res.owner
          })
        }
      })
      setIsLoading(false)
    }
  };

  return {
    _fetch: _fetch,
    metaData: metaData,
    isLoading: isLoading
  };
};

export default useMeta;
