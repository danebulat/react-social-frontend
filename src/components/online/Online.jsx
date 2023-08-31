import '@/components/online/online.css';
import { Link } from 'react-router-dom';
import { basename } from '../../config/server';

export default function Online({ user }) {
  return (
    <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color:"inherit" }}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" 
            src={user.profile_picture 
              ? `${basename}${user.profile_picture}`
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
