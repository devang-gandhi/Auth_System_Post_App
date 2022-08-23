import { ApolloError } from "apollo-server-express"
import { compare, hash } from "bcryptjs";
import { issueToken, serializeUser } from "../../functions/userFunction";
import {userAuthRules, userRegRules} from '../../validators/user';

export default {
    Query:{
        //authUserProfile : async(_, args, ctx)=>{console.log("CTX",ctx); console.log("ARGS",args);},
        authenticatedUser: async(_, {userName, password}, {user})=>{

            try {
                const val = await userAuthRules({userName, password}, {abortEarly: false});
                if(val){
                    throw new Error(val, 404);
                }
                
                let User = await user.findOne({userName});

                if(!User){
                    throw new Error('Username not found...');
                }

                let isMatch = await compare(password, User.password);

                if(!isMatch){
                    throw new Error('Incorrect Password...');
                }
                // User = User.toObject();
                // User.id = User._id;
                // User = serializeUser(User);

                let token = await issueToken(User.toObject());

                return{
                    user : User,
                    token 
                }
    
            } 
            catch (err) {
                throw new ApolloError(err.message, 404);
            }
        },

    },
    Mutation:{
        registerUser: async(_, {newUser}, {user})=>{
        
            try {
                const val = await userRegRules(newUser, {abortEarly: false});
                if(val){
                    throw new Error(val, 404);
                }

                let {userName, email} = newUser;
                let User;
                User = await user.findOne({userName});
    
                if(User){
                    throw new Error('Username is already taken.');
                }
    
                User = await user.findOne({email});
    
                if(User){
                    throw new Error('Email is already registered.');
                }
                
                User = new user(newUser);

                User.password = await hash(newUser.password, 10);

                let result = await User.save();
                // result.id = result._id;
                // result = serializeUser(result);
                // result = result.toObject();

                let token = await issueToken(result.toObject());
                
                return{
                    token,
                    user :  result
                }
            } catch (err) {
                throw new ApolloError(err.message, 400);
            }

        }
    }
}