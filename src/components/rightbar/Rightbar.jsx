import '@/components/rightbar/rightbar.css';
import Online from '../online/Online';
import { Users } from '../../dummyData.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import lodash from 'lodash';

export default function Rightbar({ user }) {
  
  const [friends, setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followingIds.includes(user?.id));

  //TODO: Remove when fetching user from local storage
  //set if current user follows this user
  useEffect(() => {
    setFollowed(
      currentUser.followingIds.includes(user?.id)
    );
  }, [currentUser, user]);

  //fetch following users
  useEffect(() => {
    if (!lodash.isEmpty(user)) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get(`http://localhost:5000/api/users/friends/${user.id}`);
          setFriends(friendList.data);
        }
        catch (err) {
          console.log(err);
        }
      }
      getFriends();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:5000/api/users/${user.id}/unfollow`, null,
          { headers: { authorization: `Bearer ${currentUser.accessToken}` }});

        dispatch({type:"UNFOLLOW", payload: user.id});
      } else {
        await axios.put(`http://localhost:5000/api/users/${user.id}/follow`, null,
          { headers: { authorization: `Bearer ${currentUser.accessToken}` }});
        
        dispatch({type:"FOLLOW", payload: user.id});
      }
    }
    catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>

        <img className="rightbarAd"  src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  }

  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow" }
          {followed ? <Remove /> : <Add /> }
        </button>
      )}

      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '-'}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">

        {friends.map(friend => (
          <Link key={friend.id} to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" 
                src={friend.profile_picture 
                      ? friend.profile_picture 
                      : '/assets/person/noAvatar.png'} 
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}

      </div>
      </>
    );
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
