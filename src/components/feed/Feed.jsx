import '@/components/feed/feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AuthContext} from '../../contexts/AuthContext';

export default function Feed({ username }) {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  //fetch posts for user's timeline or profie page
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`http://localhost:5000/api/posts/profile/${username}`)
          : await axios.get(`http://localhost:5000/api/posts/timeline/${user.id}`, 
          { headers: { authorization: "Bearer " + user.accessToken}})

        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.created_at) - new Date(p1.created_at)
        }));
      }
      catch (err) {
        console.log(err);
      }
    }
    if (username !== null) {
      fetchPosts();
    }
  }, [username, user]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {(!username || (user && username === user.username)) && <Share setPosts={setPosts} />}
          {posts.length > 0 && posts.map(p => 
            <Post key={p.id} post={p} />
          )}
          {posts.length === 0 && 
            <span>No posts yet.</span>}
        </div>
      </div>
    </>
  );
}

