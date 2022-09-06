import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';
export const getPosts =  async (req, res) =>{
    try{
        const postMessage = await PostMessage.find();
        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;

    const newPost = new PostMessage(post);

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(err){
        res.status(409).json({ message: err.message})
    }
}

export const updatePost = async (req, res) =>{
    const { id:_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id ');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post,_id }, {new:true});

    res.json(updatedPost);
}

export const deletePost = async (req, res) =>{
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id ');
    
    await PostMessage.findByIdAndRemove(_id);

    res.json({message : 'Post deleted successfully'});
}

export const likePost = async (req, res) =>{
    const { id:_id }  = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id ');
    
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount +1 }, {new:true});

    res.json(updatedPost);
}