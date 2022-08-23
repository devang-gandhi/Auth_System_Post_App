import express from 'express';
import {PORT, IN_PROD, DB} from './config';
import {success, error} from 'consola';
import {ApolloServer, gql} from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';
import * as models from './models';
import authMiddleware from './middlewares/auth';
import {schemaDirectives} from './graphql/directives';

const app = express();

app.use(authMiddleware);

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    schemaDirectives,
    playground : IN_PROD,
    context: ({req})=>{
        let {isAuth, user} = req;
        return{
            req,
            isAuth,
            user,
            ...models
        }
    }
});

const startApp = async()=>{

    try {
        await mongoose.connect(DB, success({
            badge : true,
            message : 'Database Connected...'
        }));

        await server.start();
        server.applyMiddleware({app});

        app.listen(PORT, ()=>
            success({badge : true, message : `server is listening on ${PORT}...`
        }));
    } catch (err) {
        error({badge:true, message : err.message });
    }
}
startApp();