import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { contactsListQuery } from "../src/Contacts";

class AddContact extends Component {
  //set up default state
  state = {
    firstName: '',
    lastName: '',
  }

  //create a function to handle save
  handleSave = () => {
    //using deconstruction to prevent retyping this.state
    const { firstName, lastName } = this.state
    const id = require('crypto').randomBytes(5).toString('hex');

    //mutates is a function that comes from graphql, create variables to pass into graphql
    this.props.mutate({
				variables: { id, firstName, lastName },
				optimisticResponse: {
					addContact: {
						id,
						firstName,
						lastName,
						__typename: "Contact",
					},
				},
				update: (store, { data: { addContact } }) => {
					const data = store.readQuery({ query: contactsListQuery });
					data.contacts.push(addContact);
					store.writeQuery({ query: contactsListQuery, data });
				},
			})
			.then((res) => {
				this.setState({
					firstName: "",
					lastName: "",
				});
			});
  }

  render() {
    return (
			<div>
				<input
					value={this.state.firstName}
					placeholder="First name"
					onChange={(e) => this.setState({ firstName: e.target.value })}
				/>
				<input
					value={this.state.lastName}
					placeholder="Last name"
					onChange={(e) => this.setState({ lastName: e.target.value })}
				/>
        <button onClick={this.handleSave}>Save</button>
			</div>
		);
  }
}

const createContact = gql`
  mutation addContact($id: String!, $firstName: String!, $lastName: String!){
    addContact(id: $id, firstName: $firstName, lastName: $lastName){
      id
      firstName
      lastName
    }
  }
`;

const AddContactWithMutation = graphql(createContact)(AddContact)

export default AddContactWithMutation;
