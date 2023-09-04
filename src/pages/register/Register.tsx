import '@/pages/register/register.css';
import { useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { registerCall } from '../../apiCalls'; 
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Register() {

  const username      = useRef<HTMLInputElement>(null);
  const email         = useRef<HTMLInputElement>(null);
  const password      = useRef<HTMLInputElement>(null); 
  const passwordAgain = useRef<HTMLInputElement>(null); 
  const { dispatch }  = useContext(AuthContext);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordAgain.current!.value !== password.current!.value) {
      passwordAgain.current!.setCustomValidity("Passwords don't match");
    }
    else {
      const userCredentials = {
        username: username.current!.value,
        password: password.current!.value,
        email: email.current!.value,
      };

      dispatch && await registerCall(userCredentials, dispatch);
    }
  }

  return (
    <>
      <Topbar />

      <div className="login">
        <Sidebar />

        <div className="loginWrapper">

          <form onSubmit={handleClick} className="registerBox">
            <input ref={email} required type="email" placeholder="Email" className="loginInput" />
            <input ref={username} required placeholder="Username" className="loginInput" />
            <input ref={password} required type="password" placeholder="Password" className="loginInput" />
            <input ref={passwordAgain} required type="password" placeholder="Confirm Password" className="loginInput" />
            <button type="submit" className="loginButton">Sign Up</button>
            <Link className="loginRegisterButtonCont" to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>

        </div>
      </div>
    </>
  );
}
