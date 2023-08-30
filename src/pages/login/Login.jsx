import '@/pages/login/login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../contexts/AuthContext';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Login() {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    await loginCall({
      email: email.current.value, 
      password: password.current.value
    }, dispatch);
  }
  
  return (
    <div className="login">
      <div className="loginWrapper">
        
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3> 
          <span className="loginDesc">
            Connect with friends and the world around you on Social App.
          </span>
        </div>

        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input required type="email" placeholder="Email" className="loginInput" ref={email} />
            <input required minLength="4" type="password" placeholder="Password" className="loginInput" ref={password} />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size="25px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>

            <Link className="loginRegisterButtonCont" to="/register">
              <button className="loginRegister" disabled={isFetching}>
                {isFetching ? <CircularProgress color="inherit" size="25px" /> : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>

      </div>
    </div>
  );
}
