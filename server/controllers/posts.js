import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';
export const getPosts =  async (req, res) =>{
    
    try{
        const postMessage = await PostMessage.find();
        //console.log(postMessage);
        res.status(200).json(postMessage);
    } catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;

    const newPostMessage = new PostMessage({...post, 
        creator : req.userId , createdAt : new Date().toISOString()});

    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
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
    //console.log('likePost server')
    const { id:_id }  = req.params;

    if(!req.userId) res.json({message : 'Need login'})
    //console.log(`userid:${req.userId}`)
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with id ');
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id == String(req.userId));
    //console.log(`before push`)
    if(index == -1) {
        //like the post
        post.likes.push(req.userId);
    }
    else{
        //dislike a post
        post.likes =post.likes.filter((id)=> id!=  String(req.userId));
    }
    //console.log(`before updatepost`)
  
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});

    res.status(200).json(updatedPost);
}