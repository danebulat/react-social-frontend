import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home     from './pages/home/Home'
import Profile  from './pages/profile/Profile'
import Login    from './pages/login/Login'
import Register from './pages/register/Register'
import {useContext}     from 'react';
import {AuthContext}    from './contexts/AuthContext';
import LoggedInRedirect from './components/LoggedInRedirect';

function App() {

  const { user } = useContext(AuthContext);

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register />} />
        <Route path="/login" element={
          <LoggedInRedirect>
            <Login />
          </LoggedInRedirect>
        }/>
        <Route path="/register" element={
          <LoggedInRedirect>
              <Register />
          </LoggedInRedirect>
        }/>
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
