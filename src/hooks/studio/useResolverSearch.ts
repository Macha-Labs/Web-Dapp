import { useState } from "react";
import useUserId from "./useUserId";
import useUserMeta from "./useUserMeta";

type Props = {
  userAdderss: string;
};

const useResolverSearch = () => {
  const hookUserMetas = useUserMeta();
  const hookUserId = useUserId();
  const [isLoading, setIsLoading] = useState<any>(true);

  const _fetch = (address: string) => {
    setIsLoading(true);
    hookUserMetas.fetchMetas(address);
    setIsLoading(false);
  };
  return {
    searchResults: hookUserMetas.userMeta,
    _fetch,
    isLoading:isLoading,
  };
};

export default useResolverSearch;
