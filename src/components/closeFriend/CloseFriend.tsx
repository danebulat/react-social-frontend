import '@/components/closeFriend/closeFriend.css';
import { Link } from 'react-router-dom';
import { basename } from '../../config/server';
import { SidebarUser } from '../../types/types';

type CloseFriendProps = {
  user: SidebarUser;
}

export default function CloseFriend({ user }: CloseFriendProps) {
  return (
    <Link className="sidebarFriendLink" to={`/profile/${user.username}`}>
      <li className="sidebarFriend">
        <img className="sidebarFriendImg" 
          src={user.profilePicture 
            ? `${basename}${user.profilePicture}` 
            : `${basename}/assets/person/noAvatar.png`} 
          alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
}
