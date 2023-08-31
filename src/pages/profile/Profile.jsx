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
  const [userFound, setUserFound] = useState(false);
  const username = useParams().username;

  //fetch user for this profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users?username=${username}`)
        setUser(res.data);
        setUserFound(true);
      }
      catch (err) {
        console.log(err);
        setUserFound(false);
      }
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
                src={user.cover_picture ? user.cover_picture : "/assets/person/noCover.jpg"} alt="" />
              <img className="profileUserImg" 
                src={user.profile_picture ? user.profile_picture : "/assets/person/noAvatar.png"} alt="" />

              <div className="profileInfo">
                <div className="profileInfoCont">
                  <h4 className="profileInfoName">
                    {userFound ? user.username : "Not Found"}
                  </h4>
                  <span className="profileInfoDesc">
                    {userFound ? user.desc : "404"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="profileRightBottom">
            {userFound 
              ? (<>
                <Feed username={username} />
                <Rightbar user={user} />
                </>)
              : (<div style={{textAlign: "center", width:"100%", marginTop:"20px"}}>
                User doesn't exist
                </div>
            )}
          </div>
        </div>
      </div>
    </>
    </div>
  );
}
