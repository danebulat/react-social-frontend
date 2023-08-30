import '@/components/topbar/topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { logoutCall } from '../../apiCalls.js';

export default function Topbar() {
  
  const { user, axiosJWT, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutCall(user, axiosJWT, dispatch);
  }

  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Social App</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friend, post or video" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topBarLinks">
          <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
            <span className="topbarLink">Timeline</span>
          </Link>
          <span className="topbarLink" onClick={handleLogout}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> 
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div> 
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div> 
        </div>
        
        <Link to={`/profile/${user.username}`}>
          <img className="topbarImg" 
            src={user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} alt="" />
        </Link>
      </div>
    </div>
  );
}
