import express from 'express';
import { ApolloServer} from "apollo-server-express";
import { schema } from './src/schema';
import cors from 'cors';

const PORT = 4000;
const server = new ApolloServer({ schema });
const app = express();

app.use('*', cors({ origin: "http://localhost:3000"}));

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);