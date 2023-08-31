import '@/components/sidebar/sidebar.css';
import { useState, useEffect, useContext } from 'react';
import { Link }        from 'react-router-dom';
import axios           from 'axios';
import CloseFriend     from '../closeFriend/CloseFriend';
import { AuthContext } from '../../contexts/AuthContext';
import { logoutCall }  from '../../apiCalls';
import { 
  RssFeed, 
  Chat, 
  PlayCircle, 
  Group, 
  Bookmark, 
  Event, 
  AccountBox,
  Logout,
  Login } from '@mui/icons-material'

export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const { user, axiosJWT, dispatch } = useContext(AuthContext);

  //fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/all');
        setUsers(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await logoutCall(user, axiosJWT, dispatch);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">

          {user ? (
          <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li> 
          </Link>
          ) : (
            <li className="sidebarListItem sidebarDisabledItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          )}
           
          {user ? (
          <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color:"inherit"}}>
            <li className="sidebarListItem">
              <AccountBox className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </li> 
          </Link>
          ) : (
            <li className="sidebarListItem sidebarDisabledItem">
              <AccountBox className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </li>
          )}

          <li className="sidebarListItem sidebarDisabledItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li> 
          <li className="sidebarListItem sidebarDisabledItem">
            <PlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li> 
          <li className="sidebarListItem sidebarDisabledItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li> 
          <li className="sidebarListItem sidebarDisabledItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li> 
          <li className="sidebarListItem sidebarDisabledItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li> 

          {user ? (
            <li className="sidebarListItem" onClick={handleLogout}>
              <>
              <Logout className="sidebarIcon" />
              <span style={{cursor:"pointer"}} className="sidebarListItemText">Logout</span>
              </>
            </li>
            ) : (
            <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>
              <li className="sidebarListItem">
                <Login className="sidebarIcon" />
                <span className="sidebarListItemText">Login</span>
              </li>
            </Link>
          )}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <h2 className="sidebarSubHeading">All Users</h2>
        <ul className="sidebarFriendList">
          {users.map(u => (
            <CloseFriend key={u.userId} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

