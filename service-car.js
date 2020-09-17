const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const cars = [
  { id: "1", model: "Cougar" },
  { id: "2", model: "Mustang" },
  { id: "3", model: "F150" },
];

const typeDefs = gql`
  type Car @key(fields: "id") {
    id: ID!
    model: String
  }

  extend type Query {
    getCars: [Car]
    getCarById(id: ID!): Car
  }
`;

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
      console.log('   ref: ', ref);
      return cars.find((car) => car.id === ref.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Car Server ready at ${url}`);
});
