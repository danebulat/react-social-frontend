import { createContext, useReducer, useEffect } from 'react';
import AuthReducer from './AuthReducer.js';
import { getAxiosJWTInstance } from '../apiCalls.js';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('currentUser')),
  isFetching: false,
  error: false,
  axiosJWT: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //check local storage on page load and log in if user found
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      dispatch({ 
        type: "LOGIN_SUCCESS", 
        payload: {currentUser: storedUser, axiosJWT: getAxiosJWTInstance(storedUser, dispatch)}
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user: state.user, 
      isFetching: state.isFetching, 
      error: state.error, 
      axiosJWT: state.axiosJWT,
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
