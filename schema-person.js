const { gql } = require("apollo-server");

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

module.exports = typeDefs;
