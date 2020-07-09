import express from 'express';
import { ApolloServer} from "apollo-server-express";
import cors from 'cors';
import { resolvers } from "./src/resolvers";
import { typeDefs } from "./src/schema";

const PORT = 4000;
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

app.use('*', cors({ origin: "http://localhost:3000"}));

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);