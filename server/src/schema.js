import { makeExecutableSchema, addMocksToSchema} from 'graphql-tools';

const typeDefs = `
  type Contact {
    id: ID!
    firstName: String
    lastName: String
  }

  type Query {
    contacts: [Contact]
  }
`;

const schema = makeExecutableSchema({ typeDefs});
addMocksToSchema({ schema});

export { schema };