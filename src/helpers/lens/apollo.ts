import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getAsyncData} from "../../service/AsyncStorageService";

const TESTNETURL = "https://api-mumbai.lens.dev/";
const MAINNETURL = "https://api.lens.dev";

const APIURL = TESTNETURL;

const httpLink = createHttpLink({
    uri: APIURL,
});

const authLink = setContext((_, {headers}) => {
    // const token = localStorage.getItem("accessToken");
    let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4REFFQjQ4NDEwRUEwMmM0RDk2NERCMjA2QUJBQmRBMTI4NjJBQTgxRSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NzM1MjY3MDYsImV4cCI6MTY3MzUyODUwNn0.oSVQWuGSVDAcb_W9FR6mqORrcDbsOZdiGgwX6XSWPoA";

    // });
    return {
        headers: {
            ...headers,
            "x-access-token": `Bearer ${token}`,
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
