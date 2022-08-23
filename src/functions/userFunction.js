import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import {SECRET} from '../config/index';

export const issueToken = async(user) =>{

    let token = await sign(user, SECRET, {expiresIn: 60*60*24});
    return `Bearer ${token}`;
}

export const serializeUser = async(user)=>
    pick(user, ['id', 'userName', 'email', 'firstName', 'lastName']);