// Designed with help from:  Mission Brief - https://www.youtube.com/watch?v=IOPiOr5fqYE

const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

//  Make sure to create a .env file that will set a APOLLO_KEY value to the target graph service key in ApolloStudio
require("dotenv").config();

// Header passing from:  https://www.apollographql.com/docs/apollo-server/api/apollo-gateway/
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set("userid", context.userId);
  }
}

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs or none for ApolloStudio resolution
const gateway = new ApolloGateway({
  // serviceList: [
  //   { name: "car-service", url: "http://localhost:4001" },
  //   { name: "person-service", url: "http://localhost:4002" },
  // ],
  debug: true,
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

console.log(
  "   Connecting to Apollo Studio Graph at APOLLO_KEY: ",
  process.env.APOLLO_KEY
);

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  engine: {
    apiKey: process.env.APOLLO_KEY,
    graphVariant: "dev",
  },
  subscriptions: false,
  context: ({ req }) => {
    const userID = req.headers.authorization || "";
    return { userID };
  },
});

server.listen(4010).then(({ url }) => {
  console.log(`🚀  Car-Person Gateway ready at ${url}`);
});
