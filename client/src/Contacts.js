import React, { useState, useCallback } from "react";
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import DeleteContact from './DeleteContact';
import UpdateContact from './UpdateContact';

const Contacts = ({ data: { loading, error, contacts }}) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = useCallback(() => setIsToggled((state) => !state), [
		setIsToggled,
	]);

  if (loading) {
    return <p>Loading...</p>
  }
  
  if (error) {
    return <p>{error.message}</p>
  }

  return (
		<ul>
			{contacts.map((item) =>
				isToggled ? (
					<li key={item.id} style={{ display: "flex" }}>
						<UpdateContact
							id={item.id}
							firstName={item.firstName}
							lastName={item.lastName}
						/>
						<button onClick={toggle}>X</button>
					</li>
				) : (
					<li key={item.id} style={{ display: "flex" }}>
						{item.firstName} {item.lastName}
						<DeleteContact id={item.id} />
						<button onClick={toggle}>Edit</button>
					</li>
				)
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