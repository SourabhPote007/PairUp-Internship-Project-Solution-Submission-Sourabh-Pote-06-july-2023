const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create A Post
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error);
    }
});
// Create A Post

// Update A Post
router.put("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated");
        } else{
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
// Update A Post


// Delete A Post
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("the post has been deleted");
        } else{
            res.status(403).json("You can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
// Delete A Post

// Like A Post
router.put("/:id/like", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.params.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})
// Like A Post

// Get A Post
router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})
// Get A Post

// Get All Post
// Get All Post

// Get Timeline Posts
router.get("/timeline/:userId", async(req,res)=>{
    // let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId:currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({ userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error);
    }
})
// Get Timeline Posts

// Get Users all Posts 
router.get("/profile/:username", async(req,res)=>{
    // let postArray = [];
    try {
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId:user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})
// Get Users all Posts 
// 

module.exports = router;