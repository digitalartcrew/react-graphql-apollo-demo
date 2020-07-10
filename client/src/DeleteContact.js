import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { contactsListQuery } from "../src/Contacts";

class DeleteContact extends Component {

	handleDelete = () => {
		const { id } = this.props;
		
		this.props.mutate({
				variables: { id },
				optimisticResponse: {
					deleteContact: {
						id,
						__typename: "[Contact]",
					},
				},
				update: (store, { data: { deleteContact } }) => {
					const data = store.readQuery({ query: contactsListQuery });
					const deletedItem = data.contacts.find(contact => contact.id === deleteContact.id);
					const index = data.contacts.indexOf(deletedItem);

					data.contacts.splice(index, 1);
					store.writeQuery({ query: contactsListQuery, data });
				},
			})
	};

	render() {
		return (
			<button onClick={this.handleDelete}>Delete</button>
		);
	}
}

const deleteContact = gql`
	mutation deleteContact($id: String!) {
		deleteContact(id: $id) {
			id
		}
	}
`;

const DeleteContactWithMutation = graphql(deleteContact)(DeleteContact);

export default DeleteContactWithMutation;
