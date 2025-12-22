
 export const typeDefs = `#graphql

    type Query {
        hello: String!
        ping: String!
        users: [User!]!
        posts: [Post!]!
        user(id: ID!): User
        post(id: ID!): Post
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean!
    }

    type Mutation {
        signup(
            name: String!
            email: String!
            password: String!
        ): User
        createPost(
            title: String!
            content: String!
            authorId: ID!
        ): Post
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]!
        createdAt: String!
    }

    type Profile {
        id: ID!
        bio: String!
        createdAt: String!
        user: User!
    }
`; 