import { metaResolver } from "@/_sdk/api";
import { fetchMetaByIpfsCid } from "@/service/MetaService";
import { useState } from "react";

const useMeta = () => {
  const [metaData, setMetaData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = (value: any) => {
    if (String(value).length == 24) {
      metaResolver({uid:value}).then((res) => {
        setMetaData(res.data[0]);
        setIsLoading(false)
        //console.log(res.data, "useMeta");
      });
    }
    else {
      fetchMetaByIpfsCid(value).then((res) => {
        if (res) {
          //console.log(res, "ipfs meta data")
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
