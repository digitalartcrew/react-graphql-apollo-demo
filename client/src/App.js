import React from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import Contacts from './Contacts';

const client = new ApolloClient();

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
