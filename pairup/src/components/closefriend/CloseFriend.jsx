import './closefriend.css'

export default function CloseFriend({user}) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
      <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PublicFolder+user.profilePicture} alt="" />
            <span className="sidebarFriendname">{user.username}</span>
          </li>
  )
}
