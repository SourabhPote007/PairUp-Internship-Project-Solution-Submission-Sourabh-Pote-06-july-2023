import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../Online/Online'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add } from '@mui/icons-material';

export default function Rightbar({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const {user:currentUser} = useContext(AuthContext);
  const [followed,setFollowed] = useState(false)

  console.log(user, "User Found");
  useEffect(()=>{
    // currentUser.followings.includes(user?.id)
    try {
      setFollowed(currentUser.followings.includes(user?.id))
    } catch (error) {
      console.log(error,"Error in setFollowed");
    }
  },[currentUser,user.id]);

  useEffect(()=>{
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/"+ user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  },[user._id]);

  const handleClick = async () => {
    try {
      if(followed){
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id});
      }else{
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }
  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Sourabh Pote</b> and <b> 3 other friends</b> have their birthday today</span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () =>{
    return(
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? "<Remove />" : <Add />}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">City :</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">From :</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===1 ? "Single" : user.relationship ===1 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">My Friends</h4>
        <div className="rightbarFollowings">
            
          <div className="rightbarFollowings">
          {friends.map((friend)=>(
            <NavLink to={"/profile/"+friend.username}> 
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={friend.profilePicture} alt="" />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
            </NavLink>
          ))}
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={`${PublicFolder}person/2.jpeg`} alt="" />
              <span className="rightbarFollowingName">Sourabh Pote</span>
            </div>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={`${PublicFolder}person/3.jpeg`} alt="" />
              <span className="rightbarFollowingName">Sourabh Pote</span>
            </div>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={`${PublicFolder}person/4.jpeg`} alt="" />
              <span className="rightbarFollowingName">Sourabh Pote</span>
            </div>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={`${PublicFolder}person/5.jpeg`} alt="" />
              <span className="rightbarFollowingName">Sourabh Pote</span>
            </div>
            <div className="rightbarFollowing">
              <img className="rightbarFollowingImg" src={`${PublicFolder}person/6.jpeg`} alt="" />
              <span className="rightbarFollowingName">Sourabh Pote</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {
          user ? 
          <ProfileRightbar/> :
          <HomeRightbar />
        }
      </div>
    </div>
  )
}
