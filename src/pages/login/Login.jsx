import '@/pages/login/login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../contexts/AuthContext';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

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
    <>
      <Topbar />

      <div className="login">
        <Sidebar />

        <div className="loginWrapper">

          <form className="loginBox" onSubmit={handleClick}>
            <input required type="email" placeholder="Email" className="loginInput" ref={email} />
            <input required minLength="4" type="password" placeholder="Password" className="loginInput" ref={password} />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" size="25px" /> : "Log In"}
            </button>

            <Link className="loginRegisterButtonCont" to="/register">
              <button className="loginRegisterButton" disabled={isFetching}>
                {isFetching ? <CircularProgress color="inherit" size="25px" /> : "Create a New Account"}
              </button>
            </Link>
          </form>

        </div>
      </div>
    </>
  );
}
