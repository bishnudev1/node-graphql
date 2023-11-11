import { gql } from "apollo-server";

export const typeDefs = gql`
type Query {
    hello: String,
    getAllUsers: [User],
    getMyProfile: User
}
type User {
    id: Int
    name: String
    email: String
  }

`