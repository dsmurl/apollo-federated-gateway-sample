const { gql } = require("apollo-server");

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

module.exports = typeDefs;
