import { MoreVert } from '@mui/icons-material'
import './post.css'
// import { Users } from '../../dummyData'
import { useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
// import { format } from 'timeago.js';

export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isliked,setIsLiked] = useState(false)
    const [user,setUser] = useState({});
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes]);
    
    useEffect(()=>{
        // console.log("Feed Rendered");
        const fetchUser = async () =>{
        const res = await axios.get(`users?userId=${post.userId}`);
        // console.log(res);
          // return res.dat
        setUser(res.data)
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like",{ userId : currentUser._id});
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(post);
    // const user = Users.filter(u=>u.id===1)
    // console.log(user[0].username)
    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <NavLink to={`/profile/${user.username}`}>
                    <img className="postProfileImg" src={user.profilePicture} alt="" />
                    </NavLink>
                    <div className="postUsername">{user.username}</div>
                    <div className="postDate">{post.createdAt}</div>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PublicFolder+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PublicFolder}like.png`} onClick={likeHandler} alt="" />
                    <img className="likeIcon" src={`${PublicFolder}heart.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
