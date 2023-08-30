import '@/components/post/post.css';
import { useState, useEffect, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Post({ post }) {

  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext);

  //check if current user likes this post
  useEffect(() => {
    setIsLiked(post.likeIds.includes(currentUser.id));
  }, [currentUser.id, post.likeIds]);

  //fetch author of post in user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users?userId=${post.user_id}`)
      setUser(res.data);
    }
    fetchUser();
  }, [post.user_id]);

  //handle current user liking post
  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post.id}/like`, null,
       { headers: { authorization: "Bearer " + currentUser.accessToken}} );
    }
    catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img className="postProfileImg" 
                src={user.profile_picture || '/assets/person/noAvatar.png'} alt="" /> 
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.created_at)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span> 
          {post.img && 
          <img className="postImg" crossOrigin="anonymous" 
            src={`http://localhost:5000/images/${post.img}`} alt="" />}
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="heartIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">0 comments</span>
          </div>
        </div>

      </div>
    </div>
  );
}
