import '@/components/online/online.css';
import { Link } from 'react-router-dom';
import { basename } from '../../config/server';
import { SidebarUser } from '../../types/types';

type OnlineProps = {
  user: SidebarUser;
}

export default function Online({ user }: OnlineProps) {
  return (
    <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color:"inherit" }}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" 
            src={user.profilePicture 
              ? `${basename}${user.profilePicture}`
              : `${basename}/assets/person/noAvatar.png`} 
            alt="" 
          />
          {/*<span className="rightbarOnline"></span>*/}
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </Link>
  );
}
