const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

// Initialize an ApolloGateway instance and pass it an array of
// your implementing service names and URLs
const gateway = new ApolloGateway({
  serviceList: [
    { name: "car-service", url: "http://localhost:4001" },
    { name: "person-service", url: "http://localhost:4002" },
  ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(4010).then(({ url }) => {
  console.log(`🚀  Car-Person Gateway ready at ${url}`);
});
