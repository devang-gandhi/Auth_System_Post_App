import * as joi from 'joi';

const schema = joi.object({
    userName: joi.string().alphanum().min(3).max(30).required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    firstName: joi.string().alphanum().min(3).max(30).required(),
    lastName : joi.string().alphanum().min(3).max(30).required(),
});

const schema2 = joi.object({
    userName: joi.string().alphanum().min(3).max(30).required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const userRegRules = (newUser)=>{
    const val = schema.validate(newUser);
    if(val.error){
        return val.error.message;
    }
}

export const userAuthRules = (userName, password)=>{
    const val = schema2.validate(userName, password);
    if(val.error){
        return val.error.message;
    }
}