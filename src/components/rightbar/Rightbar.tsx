import '@/components/rightbar/rightbar.css';
import { useContext, useEffect, useState } from 'react';
import axios                        from 'axios';
import lodash                       from 'lodash';
import { Add, Remove }              from '@mui/icons-material';
import { Link }                     from 'react-router-dom';
import Online                       from '../online/Online';
import { AuthContext }              from '../../contexts/AuthContext';
import { serverUri, basename }      from '../../config/server';
import { FetchedUser, SidebarUser } from '../../types/types';

type RightbarProps = {
  user?: FetchedUser; 
}

export default function Rightbar({ user }: RightbarProps) {
  
  const [friends, setFriends] = useState<SidebarUser[]>([]);
  const [currentUserFriends, setCurrentUserFriends] = useState<SidebarUser[]>([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(() => {
    if (user) {
      return currentUser ? currentUser.followingIds.includes(user?.id) : false;
    }
    return false;
  });

  //check if current user is following this profile
  useEffect(() => {
    if (!lodash.isEmpty(currentUser) && (!lodash.isEmpty(user))) {
      currentUser?.followingIds.includes(user.id)
        ? setFollowed(true)
        : setFollowed(false);
    }
  }, [user, currentUser]);

  //fetch user following users
  useEffect(() => {
    if (!lodash.isEmpty(user)) {
      const getFriends = async () => {
        try {
          const res = await axios.get(`${serverUri}/api/users/friends/${user.id}`);
          setFriends(res.data);
        }
        catch (err) {
          console.log(err);
        }
      }
      getFriends();
    }
  }, [user]);

  //fetch current user friends if on timeline page
  useEffect(() => {
    if (!lodash.isEmpty(currentUser) && !user) {
      const getCurrentUserFriends = async () => {
        try {
          const res = await axios.get(`${serverUri}/api/users/friends/${currentUser!.id}`);
          setCurrentUserFriends(res.data);
        }
        catch (err) {
          console.log(err);
        }
      }
      getCurrentUserFriends();
    }
  }, [currentUser]);

  //follow or unfollow this user
  const handleClick = async () => {
    if (!dispatch) throw Error('dispatch undefined');
    if (!user) throw Error('user undefined');

    try {
      if (followed) {
        await axios.put(`${serverUri}/api/users/${user.id}/unfollow`, null,
          { headers: { authorization: `Bearer ${currentUser!.accessToken}` }});

        dispatch({type:"UNFOLLOW", payload: user.id});
      } else {
        await axios.put(`${serverUri}/api/users/${user.id}/follow`, null,
          { headers: { authorization: `Bearer ${currentUser!.accessToken}` }});

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
        <img className="rightbarAd"  src={`${basename}/assets/ad.jpg`} alt="" />
        <h4 className="rightbarTitle">Friends</h4>

        {currentUserFriends.length === 0 && <span>No follwings.</span>}
        <ul className="rightbarFriendList">
          {currentUserFriends.map(friend => (
            <Online key={friend.userId} user={friend} />
          ))}
        </ul>
      </>
    );
  }

  const ProfileRightBar = () => {
    return (
      <>
      {(currentUser && user!.username !== currentUser.username) && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow" }
          {followed ? <Remove /> : <Add /> }
        </button>
      )}

      <h4 className="rightbarTitle">Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user!.city ? user!.city : '-'}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user!.from ? user!.from : '-'}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user!.relationship === 1 ? 'Single' : user!.relationship === 2 ? 'Married' : '-'}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">Friends</h4>
      <div className="rightbarFollowings">

        {friends.length === 0 && <span>No followings.</span>}

        {friends.map(friend => (
          <Link key={friend.userId} to={`/profile/${friend.username}`} 
                style={{ textDecoration: "none" }}>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" 
                src={friend.profilePicture 
                      ? `${basename}${friend.profilePicture}` 
                      : `${basename}/assets/person/noAvatar.png`} 
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

