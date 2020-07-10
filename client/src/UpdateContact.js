import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { contactsListQuery } from "../src/Contacts";

class UpdateContact extends Component {
	handleUpdate = () => {
		const { id, firstName, lastName } = this.props;

		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				updateContact: {
					id,
					firstName,
					lastName,
					__typename: "[Contact]",
				},
			},
			update: (store, { data: { updateContact } }) => {
				const data = store.readQuery({ query: contactsListQuery });
				const updatedItem = data.contacts.find(
					(contact) => contact.id === updateContact.id
				);
				
				updatedItem.firstName = firstName;
				updatedItem.lastName = lastName;
		
				store.writeQuery({ query: contactsListQuery, data });
			},
		});
	};

	render() {
		return (
			<div>
				<input
					value={this.props.firstName}
					placeholder="First name"
					onChange={(e) => this.setState({ firstName: e.target.value })}
				/>
				<input
					value={this.props.lastName}
					placeholder="Last name"
					onChange={(e) => this.setState({ lastName: e.target.value })}
				/>
				<button onClick={this.handleUpdate}>Save Edit</button>
			</div>
		);
	}
}

const updateContact = gql`
	mutation updateContact($id: String!, $firstName: String, $lastName: String) {
		updateContact(id: $id) {
			id
			firstName
			lastName
		}
	}
`;

const UpdateContactWithMutation = graphql(updateContact)(UpdateContact);

export default UpdateContactWithMutation;
