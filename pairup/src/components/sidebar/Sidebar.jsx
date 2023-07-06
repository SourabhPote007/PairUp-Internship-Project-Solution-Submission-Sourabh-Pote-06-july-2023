import { RssFeed, School, Event, WorkOutline, HelpOutline, Bookmark, Group, PlayCircleFilledOutlined, Chat } from '@mui/icons-material'
import './sidebar.css'
import { Users } from '../../dummyData'
import CloseFriend from '../closefriend/CloseFriend'

export default function Sidebar() {
  return (
    <div className="sidebar"> 
    <div className="sidebarWrapper">
        <ul className="sidebarList">

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span>Feed</span>
          </li>

          <li className="sidebarListItem">
            <Chat className="sidebarIcon"/>
            <span>Chat</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon"/>
            <span>Videos</span>
          </li>

          <li className="sidebarListItem">
            <Group className="sidebarIcon"/>
            <span>Groups</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon"/>
            <span>Bookmarks</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon"/>
            <span>Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon"/>
            <span>Jobs</span>
          </li>

          <li className="sidebarListItem">
            <Event className="sidebarIcon"/>
            <span>Events</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon"/>
            <span>Courses</span>
          </li>

        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

        <ul className="sidebarFriendList">
         {Users.map(u=>(
          <CloseFriend key={u.id} user={u}/>
         ))}
        </ul>
    </div>
    </div>
  )
}
