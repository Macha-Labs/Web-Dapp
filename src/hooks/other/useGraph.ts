import { helperIPFS } from "@/helpers";
import { fetchArweaveData, graphQuery } from "@/service/MetaService";
import { useState } from "react";

const useGraph = () => {
  const [mData, setMData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [audioUrl, setAudioUrl] = useState<any>();
  const [audioCover, setAudioCover] = useState<any>();

  const _fetch = async (id: any, type: any) => {
    const data = {
      data: id,
    };
    console.log("data logging",data)
    const res = await graphQuery(type, data);
    const audiodata = await fetchArweaveData(
      helperIPFS(res?.document?.raw?.metadata?.rawURI)
    );
    setMData(res);
    setAudioUrl(helperIPFS(audiodata?.lens?.audio?.item));
    setAudioCover(helperIPFS(audiodata?.lens?.audio?.cover));
    setIsLoading(false);
  };

  return {
    _fetch: _fetch,
    mData: mData,
    isLoading: isLoading,
    audioUrl: audioUrl,
    audioCover: audioCover,
  };
};

export default useGraph;
