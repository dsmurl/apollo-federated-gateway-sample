const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const persons = [
  { id: "1", name: "Sam", car: { id: "3" } },
  { id: "2", name: "Ted", car: { id: "2" } },
  { id: "3", name: "Nic", car: { id: "1" } },
];

const typeDefs = gql`
  type Person {
    id: ID!
    name: String
    car: Car
  }

  extend type Car @key(fields: "id") {
    id: ID! @external
  }

  type Query {
    getPersons: [Person]
    getPersonById(id: ID!): Person
    me: Person
  }
`;

const resolvers = {
  Query: {
    Person: {
      car(_, { person }) {
        return { __typename: "Car", id: person.car };
      },
    },
    getPersons() {
      return persons;
    },
    getPersonById(_, { id }) {
      return persons.find((person) => person.id === id);
    },
    me() {
      return persons.find((person) => person.id === "1");
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀  Person Server ready at ${url}`);
});
