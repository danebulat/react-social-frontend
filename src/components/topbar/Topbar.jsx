import '@/components/topbar/topbar.css';
import { Search, AccountCircle, Chat, CircleNotifications } from '@mui/icons-material';
import { useContext }  from 'react';
import { Link }        from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { basename }    from '../../config/server';

export default function Topbar() {
  
  const { user } = useContext(AuthContext);

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
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <AccountCircle className="topbarIcon" />
            <span className="topbarIconBadge">1</span>
          </div> 
          <div className="topbarIconItem">
            <CircleNotifications className="topbarIcon"/>
            <span className="topbarIconBadge">1</span>
          </div> 
          <div className="topbarIconItem">
            <Chat className="topbarIcon"/>
            <span className="topbarIconBadge">2</span>
          </div> 
        </div>
        
        {user && <Link to={`/profile/${user.username}`}>
          <img className="topbarImg" 
            src={user.profilePicture 
              ? `${basename}${user.profilePicture}` 
              : `${basename}/assets/person/noAvatar.png`} alt="" />
        </Link>}
      </div>
    </div>
  );
}
