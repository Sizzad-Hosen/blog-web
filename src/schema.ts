
 export const typeDefs = `#graphql

    type Query {
        users: [User!]!
        posts: [Post!]!
        user(id: ID!): User
        post(id: ID!): Post
        me: User
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean!
    }

    type UserArgs{
    token: String
    }

    type Mutation {
        signup(
            name: String!
            email: String!
            password: String!
        ): UserArgs
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