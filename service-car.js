const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const CarTypesDefs = require("./schema-car");

const cars = [
  { id: "1", model: "Cougar" },
  { id: "2", model: "Mustang" },
  { id: "3", model: "F150" },
];

const resolvers = {
  Query: {
    getCars() {
      return cars;
    },
    getCarById(_, { id }) {
      return cars.find((car) => car.id === id);
    },
  },
  Car: {
    __resolveReference(ref) {
      console.log("   ref: ", ref);
      return cars.find((car) => car.id === ref.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs: CarTypesDefs, resolvers }]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Car Server ready at ${url}`);
});
