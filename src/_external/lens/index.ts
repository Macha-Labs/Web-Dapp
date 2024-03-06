import { client as lensClient } from "@/helpers/lens/client";

export const useSearchLens = () => {
    const fetchPublications = async(query: string) => {
        const res = await lensClient.search.publications({query: query});
        console.log('Lens Search Results Publications', res);
        return res;
    };

    const fetchProfiles = async(query: string) => {
        const res = await lensClient.search.profiles({query: query});
        console.log('Lens Search Results Profiles', res);
        return res;
    }

    return {
        lensPublications: fetchPublications,
        lensProfiles: fetchProfiles,
      };
}