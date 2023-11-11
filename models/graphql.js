import { gql } from "apollo-server";

export const typeDefs = gql`
type Query {
    hello: String,
    getAllUsers: [User],
    getMyProfile(name: String): User
}

type Mutation {
    createUser(name: String, email: String): User,
    deleteUser(id: Int): Boolean,
    updateUser(id: Int, name: String, email: String): User
}

type User {
    id: Int
    name: String
    email: String
  }

`