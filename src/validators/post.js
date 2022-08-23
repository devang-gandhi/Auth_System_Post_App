import * as joi from 'joi';

const schema = joi.object({
    title: joi.string().min(3).max(30).required(),
    content: joi.string().min(3).max(100).required(),
});

export const postValidate = (title, content)=>{
    const val = schema.validate(title, content);
    if(val.error){
        return val.error.message;
    }
}