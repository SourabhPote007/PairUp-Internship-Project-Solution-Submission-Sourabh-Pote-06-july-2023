import { useContext, useRef } from 'react';
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(email.current.value);
        loginCall({email:email.current.value,password:password.current.value}, dispatch)
    }
    console.log(user);

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginlogo">
                        <img src="https://mir-s3-cdn-cf.behance.net/projects/404/acc37282426791.Y3JvcCw4ODI3LDY5MDUsNzQyLDA.png" alt="" />
                    </h3>
                    <span className="loginDesc">Connect with friends and find flatemates with the world around you on PairUp.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="Email" className="loginInput" ref={email} required/>
                        <input type="password" className="loginInput" ref={password} required minLength={6}/>
                        <button type="submit" disabled={isFetching} className="loginButton">{isFetching ? (<CircularProgress  color="inherit" size={30} /> ) : ("Log In")}</button>
                        <span className="LoginForget">Forget Password?</span>
                        {/* <button className="loginRegisterButton">{isFetching ? (<CircularProgress  color="inherit" size={30} />) : ("Create A New Account")}</button> */}
                        <NavLink style={{textDecoration:"none"}} to="/register">
                            <button className="loginRegisterButton">Create A New Account</button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}
