import React from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import Contacts from './Contacts';

//In order to initialize Apollo Client you must initialize link and cache
const cache = new InMemoryCache();
const link = new HttpLink({
	uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link,
  cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="App-header">
          <h2>CRM</h2>
        </div>
        <Contacts />
      </div>
    </ApolloProvider>
  );
}

export default App;
