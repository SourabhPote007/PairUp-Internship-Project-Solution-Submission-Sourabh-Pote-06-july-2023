import React, { useEffect, useState } from 'react'
import './profile.css'
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState({});
  const params = useParams()
  // console.log(params.username);
  const username = useParams().username;

  useEffect(()=>{
    // console.log("Feed Rendered");
    const fetchUser = async () =>{
    const res = await axios.get(`/users?username=${username}`);
    // console.log(res.data, "resdata");
      // return res.dat
    setUser(res.data)
    };
    fetchUser();
}, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
      <div className="profileRight">
      <div className="profileRightTop">
        <div className="profileCover">
        <img className="profileCoverImg" src={user.coverPicture} alt="" />
        <img className="profileUserImg" src={user.profilePicture} alt="" />
        </div>
        <div className="profileInfo">
          <h4 className="proInfoName">{user.username}</h4>
          <span className="proInfoDesc">{user.desc}</span>
        </div>
      </div>
      <div className="profileRightBottom">
        <Feed username={username} />
        <Rightbar user={user}/>
      </div>
    </div>
    </div>
    </>
  )
}
