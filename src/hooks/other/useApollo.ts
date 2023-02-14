import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const useApollo = () => {
    const authLink = setContext((_, {headers}) => {
        const token = localStorage.getItem("accessToken");
        console.log("Authentication token", token);
        return {
          headers: {
            ...headers,
            'x-access-token': token ? `Bearer ${token}` : "",
          }
        }
      })

    const getClient = (httpLink) => {
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
          })
        return client;
    }

    return {
        client: getClient
    }
}

export default useApollo;