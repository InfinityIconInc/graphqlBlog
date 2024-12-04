const { buildSchema } = require('graphql');

//graphQL schema
const schema = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        body: String!
        image: String
        slug: String!
        userId: ID!
    }
    
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        avatar: String
    }
    
    type Query {
        getPost(slug:String!): Post
        getPostById(id:ID!): Post
        getPosts: [Post]
        getPostsByUser(userId: ID!): [Post]
        
        getUserById(id: ID!): User
        AuthUser(email: String!, password: String!): User
    }
    
    type Mutation {
        createPost(title: String!, body: String!, image: String, userId: ID!): Post
        deletePost(id: ID!): String
        updatePost(id: ID!, title: String!, body: String!, image: String, slug: String!, userId: ID): Post
        
        createUser(name: String!, email: String!, password: String!, avatar: String): User
        modifyUser(id: ID!, name: String!, email: String!, password: String!, avatar: String): User
    }
    `
);

module.exports = schema;