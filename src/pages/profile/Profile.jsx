import '@/pages/profile/profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {
  const [user, setUser] = useState({})
  const username = useParams().username;

  //fetch user for this profile
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users?username=${username}`)
      setUser(res.data);
    }
    fetchUser();
  }, [username]);

  return (
    <div>
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">

          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" 
                src={user.cover_picture ? user.cover_picture : "/assets/person/noCover.png"} alt="" />
              <img className="profileUserImg" 
                src={user.profile_picture ? user.profile_picture : "/assets/person/noAvatar.png"} alt="" />
            </div>
            
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>

        </div>
      </div>
    </>
    </div>
  );
}
