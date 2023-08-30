import '@/components/feed/feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AuthContext} from '../../contexts/AuthContext';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:5000/api/posts/profile/${username}`, 
        { headers: { authorization: "Bearer " + user.accessToken}})
 
        : await axios.get(`http://localhost:5000/api/posts/timeline/${user.id}`, 
        { headers: { authorization: "Bearer " + user.accessToken}})

      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.created_at) - new Date(p1.created_at)
      }));
    }
    fetchPosts();
  }, [username, user.id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.length && posts.map(p => 
          <Post key={p.id} post={p} />
        )}
      </div>
    </div>
  );
}

