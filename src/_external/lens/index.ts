import { client as lensClient } from "@/helpers/lens/client";
import { mapToSearchProfile } from "./data";

export const useSearchLens = () => {
    const fetchPublications = async(query: string) => {
        const res = await lensClient.search.publications({query: query});
        console.log('Lens Search Results Publications', res);
        return res.items;
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