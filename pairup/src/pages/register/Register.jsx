import { NavLink } from 'react-router-dom'
import './register.css'
import { useRef } from 'react';
import axios from 'axios';
// import { useHistory } from "react-router-dom";

export default function Register() {
    // const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    // const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords doesn't match!");
        }else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            }
            try {
                await axios.post("/auth/register",user);
                // history.push("/login");
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(email.current.value);
        // loginCall({email:email.current.value,password:password.current.value}, dispatch)
    }
    // console.log(user);

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
                    <form onSubmit={handleClick} className="loginBox">
                    <input type="text" placeholder="Enter Your Full Name" ref={username} className="loginInput" required/>
                    <input type="email" placeholder="Enter Your Email" ref={email} className="loginInput" required/>
                        <input type="password" minLength={6} placeholder="Enter Your Password" ref={password}  className="loginInput" required/>
                        <input type="password" minLength={6} placeholder="Confirm Your Password Again" ref={passwordAgain}  className="loginInput" required/>
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <span className="LoginForget"> <NavLink style={{textDecoration:"none",color:"black"}} to="/login" >Already have an account?</NavLink></span>
                        <button className="loginRegisterButton"><NavLink style={{textDecoration:"none",color:"white"}}  to="/login" >Log Into Account</NavLink></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
