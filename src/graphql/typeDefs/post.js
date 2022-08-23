import {gql} from 'apollo-server-express';

export default gql`
    extend type Query{
        getAllPosts: [post!]!
        getPostByID(id : ID!): post! 
    },

    extend type Mutation {
        createNewPost(newPost:postInput!) : post! @isAuth
        editPostById(updatedPost: postInput, id: ID!) : post! @isAuth
        deletePostById(id : ID!): postNotify! @isAuth
    }

    input postInput{
        title : String!
        content : String!
    }

    type post {
        id: ID!
        title : String!
        content: String!
        createdAt: String
        updatedAt: String
    }

    type postNotify{
        id: ID!
        message: String!
        success : Boolean
    }
`;