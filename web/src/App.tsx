import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // replace with your server's URL
  cache: new InMemoryCache(),
});

const GET_HELLO = gql`
  query {
    hello
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.hello}</h1>
    </div>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;
