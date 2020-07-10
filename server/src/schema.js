//https://www.apollographql.com/docs/tutorial/schema/

// Every data graph uses a schema to define the types of data it includes

export const typeDefs = `
  type Contact {
    id: ID!
    firstName: String
    lastName: String
  }

  type Query {
    contacts: [Contact]
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    deleteContact(id: String!): [Contact]
  }
`;
