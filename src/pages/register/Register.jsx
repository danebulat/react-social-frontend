import '@/pages/register/register.css';
import { useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { registerCall } from '../../apiCalls'; 
import { Link } from 'react-router-dom';

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef(); 
  const passwordAgain = useRef(); 
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    }
    else {
      const userCredentials = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value,
      };

      await registerCall(userCredentials, dispatch);
    }
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

        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input ref={email} required type="email" placeholder="Email" className="loginInput" />
            <input ref={username} required placeholder="Username" className="loginInput" />
            <input ref={password} required type="password" placeholder="Password" className="loginInput" />
            <input ref={passwordAgain} required type="password" placeholder="Password" className="loginInput" />
            <button type="submit" className="loginButton">Sign Up</button>
            <Link className="loginRegisterButtonCont" to="/login">
              <button className="loginRegister">Log into Account</button>
            </Link>
          </form>
        </div>

      </div>
    </div>
  );
}
