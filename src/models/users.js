import {Schema, model} from 'mongoose';

const userSchema = new Schema({

    userName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required: true
    },
    firstName:{
        type : String,
        required: true
    },
    lastName:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    }

},{timestamps: true});

const user = model('users', userSchema);
export default user;