import {gql} from 'apollo-server-express';

export default gql`

    extend type Query{
        authenticatedUser(userName: String!, password: String!): authResp!
    }

    extend type Mutation{
        registerUser(newUser: userInput!) : authResp! 
    }

    input userInput{
        userName : String!
        email: String!
        firstName: String!
        lastName: String!
        password: String!
    }
    
    type user{
        userName : String!
        email: String!
        firstName: String!
        lastName: String!
        id: ID!
    }

    type authResp{
        user: user!
        token : String!
    }
`;