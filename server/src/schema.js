import { makeExecutableSchema, addMockFunctionsToSchema } from "apollo-server-express";

import { resolvers } from './resolvers';

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
    addContact(firstName: String!, lastName: String!): Contact
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers});
addMockFunctionsToSchema({ schema});

export { schema };
