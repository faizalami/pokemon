import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

const gqlClient = new ApolloClient({
  uri: process.env.REACT_APP_GQL_URI,
  cache: new InMemoryCache(),
});

export default gqlClient;
