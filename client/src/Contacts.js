import React from 'react';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import DeleteContact from './DeleteContact';
import AddContact from './AddContact';

const Contacts = ({ data: { loading, error, contacts }}) => {
  if (loading) {
    return <p>Loading...</p>
  }
  
  if (error) {
    return <p>{error.message}</p>
  }

  const isUpdating = false;

  return (
    <ul>
      { contacts.map( item => isUpdating ? <AddContact /> : (<li key={item.id}>{item.firstName} {item.lastName}<DeleteContact id={item.id}/></li>)
      )}
    </ul>
  );
}

export const contactsListQuery = gql`
  query ContactsQuery {
    contacts {
      id
      firstName
      lastName
    }
  }
`;

export default graphql(contactsListQuery)(Contacts);