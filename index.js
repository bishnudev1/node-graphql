import { ApolloServer } from "apollo-server";
import { typeDefs } from "./models/graphql.js";
import { resolvers } from "./controllers/resolvers.js";

const port = process.env.PORT || 4000;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});

server.listen({ port: port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
}).catch((err) => {
    console.log(err);
});