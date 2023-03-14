import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import { getCookie } from "../storage/browserStorage";

const TESTNETURL = "https://api-mumbai.lens.dev/";
const MAINNETURL = "https://api.lens.dev";

const APIURL = MAINNETURL;

const httpLink = createHttpLink({
    uri: APIURL,
});

const authLink = setContext((_, {headers}) => {
    const token = getCookie("accessToken");
    return {
        headers: {
            ...headers,
            "x-access-token": token ? `Bearer ${token}` : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
