import Profile from './pages/profile/Profile';
// import { Switch } from '@mui/material';
import Home from './pages/home/Home'
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Routes,Route,redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  // const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <Routes>
        <Route path='/' exact element={user ? <Home/> : <Register/>} />
        <Route path='/login' element={user ? <redirect to="/" /> : <Login/> } />
        <Route path='/register' element={user ? <redirect to="/" /> : <Register/> } />
        <Route path='/profile/:username' element={<Profile/>} />
    </Routes>
  )
}

export default App;
