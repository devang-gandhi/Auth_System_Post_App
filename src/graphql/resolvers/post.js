import {postValidate} from '../../validators/post';

export default {
    Query: {
        getAllPosts: async(_, {}, {post}) =>{
            let posts = await post.find();
            return posts;
        },

        getPostByID : async(_, {id}, {post}) =>{
            let Post = await post.findById(id);
            return Post;
        }
    },
    Mutation: {
        createNewPost : async(_, {newPost}, {post}) =>{

            const val = await postValidate(newPost, {abortEarly: false});
            if(val){
                throw new Error(val, 404);
            }

            let result = await post.create(newPost);
            return result;
        },
        editPostById : async(_, {id, updatedPost}, {post})=>{

            const val = await postValidate(updatedPost, {abortEarly: false});
            if(val){
                throw new Error(val, 404);
            }
            
            let editedPost = await post.findByIdAndUpdate(id, { ...updatedPost}, {new : true});
            return editedPost;
        },
        deletePostById : async(_, {id}, {post}) =>{

            let deletedPost = await post.findByIdAndDelete(id);
            return {
                success : true,
                id: deletedPost.id,
                message : 'Post has been deleted!'
            }
        }
    }
}