import { client as lensClient } from "@/helpers/lens/client";
import { mapToSearchPosts, mapToSearchProfile } from "./data";

export const useSearchLens = () => {
    const fetchPublications = async(query: string) => {
        const res = await lensClient.search.publications({query: query});
        const resMapped = mapToSearchPosts(res.items);
        console.log('Lens Search Results Publications', res, resMapped);
        return resMapped;
    };

    const fetchProfiles = async(query: string) => {
        const res = await lensClient.search.profiles({query: query});
        const resMapped = mapToSearchProfile(res.items);
        console.log('Lens Search Results Profiles', res, resMapped);
        return resMapped;
    }

    return {
        lensPublications: fetchPublications,
        lensProfiles: fetchProfiles,
      };
}