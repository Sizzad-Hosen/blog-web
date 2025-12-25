
 export const typeDefs = `#graphql

    type Query {
        users: [User!]!
        posts: [Post]
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

    type AuthPayload{
    token: String
    }

    type PostPayload{
     userError:String
     post:Post
    }
   input PostInput{
    title: String
    content: String
    }
    type Mutation {
        signup(
            name: String!
            email: String!
            password: String!
        ): AuthPayload
        
        signin(
            email: String!
            password: String!
        ): AuthPayload

        addPost(
          post: PostInput!
        ): PostPayload

        updatePost(
        postId:ID!
            post: PostInput
        ): PostPayload

        publishPost(
        postId:ID!
        ): PostPayload
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