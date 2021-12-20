const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const config = require("../config/app");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(config.appPort).then(({ url }) => {
  console.log(`
    🚀  Server ready at ${url}
    `);
});
