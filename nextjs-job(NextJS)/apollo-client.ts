import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  //   const token = localStorage.getItem("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      //   authorization: token || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
