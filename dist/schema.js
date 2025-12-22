"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

    type Post {
     id:Id!
     title:String!
     content:String!
     author:User
     createdAt:String!
     Published:Boolean!
    }

    type Mutation {
    signup(
    name:String!
    email:String!
    password:String!
    ):User
    }


    type User {
     id:ID!
     name:String!
     email:String!
     posts:[Post]!
     createdAt:String!
    
    }


    type Profile{
    id:ID!
    bio:String!
    createdAt:String!
    user:User!
    }
`;
