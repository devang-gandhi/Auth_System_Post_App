import {Schema, model} from 'mongoose';

const postSchema = new Schema({

    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    }
},{timestamps: true});

const post = model('posts', postSchema);
export default post;