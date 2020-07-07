import express from 'express';
import { ApolloServer} from "apollo-server-express";
import { schema } from './src/schema';

const server = new ApolloServer({ schema });
const PORT = 4000;

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);