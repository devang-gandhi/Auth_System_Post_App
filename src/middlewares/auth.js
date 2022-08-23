import { verify } from "jsonwebtoken";
import { SECRET } from "../config";
import { user } from "../models";

const authMiddleware = async(req, res, next)=>{
    const authHeaders = req.get('Authorization');
    // console.log("AUTH_HEADERS",authHeaders);

    if(!authHeaders) {
        req.isAuth = false;
        return next();
    }

    let token = authHeaders.split(' ')[1];

    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = verify(token, SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }

    let authUser = await user.findById(decodedToken._id);
    //console.log("AUTHENTICATED USER", authUser);
    if(!authUser){
        req.isAuth = false;
        return next();
    }

    req.user = authUser;
    req.isAuth = true;
    return next();
}

export default authMiddleware;