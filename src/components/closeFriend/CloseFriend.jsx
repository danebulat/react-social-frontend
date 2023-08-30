import '@/components/closeFriend/closeFriend.css';
import { Link } from 'react-router-dom';

export default function CloseFriend({ user }) {
  return (
    <Link className="sidebarFriendLink" to={`/profile/${user.username}`}>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" 
          src={user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} 
          alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
}
