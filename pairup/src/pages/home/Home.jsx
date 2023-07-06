import './home.css';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
// import Home from "./pages/home/Home";

function Home() {
  const {user} = useContext(AuthContext);
  return (
    <>
    <Topbar />
    <div className="homeContainer">
    <Sidebar />
    <Feed />
    <Rightbar user={user}/>
    </div>
    </>
  )
}
export default Home;