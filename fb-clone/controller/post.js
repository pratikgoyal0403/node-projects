const Post = require('../model/posts');
const User = require('../model/users');

exports.getPosts = (req, res, next)=>{
    Post.find().then(posts=>{
        if(!posts){
            return res.status(204).json({message: 'no posts found'});
        }
        res.status(200).json({posts: posts});
    }).catch(err => console.log(err));
}

exports.postPost = (req, res, next)=>{
    const caption = req.body.caption;
    const userId = req.body.userId;
    const username = req.body.username;
    const profileImage = req.body.userImg;
    const image = req.file;
    const post = new Post({
        caption,
        imageUrl: image.path,
        userInfo:{
            userId: userId,
            username: username,
            imageUrl: profileImage
        }
    });
    post.save().then(post=>{
        if(!post){
            return res.status(400).json({message: 'unable to create post'})
        }
        res.status(201).json({posts: post});
    }).catch(err => console.log(err));
}

exports.postComment = (req, res, next)=>{
    const comment = req.body.comment;
    const userId = req.body.userId;
    const postId = req.body.postId;
    let username;
    User.findById(userId).then(user=>{
        if(!user){
            return;
        }
        username = user.username;
        return Post.findById(postId);
    }).then(post=>
    {
        if(!post){
            return res.status(500).json({message: 'something went wrong'});
        }
        post.comments.push({comment: comment, username});
        return post.save();
    }).then(updatedPost=>{
        if(!updatedPost){
            return console.log('err');
        }
        res.status(200).json({post: updatedPost});
    }).catch(err => console.log(err));
}
// exports.getUserSpecificPosts = (req, res, next)=>{
//     const userId = req.params.userId;
//     console.log(userId);
//     Post.find({'userInfo.userId': userId}).then(result=> {
//         if(!result){
//             console.log(result)
//             return res.status(404).json({message: 'posts not found'});
//         }
//         console.log(result);
//         res.status(200).json({posts: result});
//     }).catch(err => console.log(err));
// }