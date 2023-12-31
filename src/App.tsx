import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home     from './pages/home/Home'
import Profile  from './pages/profile/Profile'
import Login    from './pages/login/Login'
import Register from './pages/register/Register'
import {useContext}     from 'react';
import {AuthContext}    from './contexts/AuthContext';
import LoggedInRedirect from './components/LoggedInRedirect';
import ScrollToTop      from './hooks/ScrollToTop';
import { basename }     from './config/server';

function App() {
  const { user } = useContext(AuthContext);

  return ( 
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          user ? <Home /> : <Login />
        }/>
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFoundPage() { 
  return (<h1>404: Page Not Found</h1>);
}

export default App;
