import { createContext, useReducer, useEffect } from 'react';
import AuthReducer             from './AuthReducer.js';
import { getAxiosJWTInstance } from '../apiCalls.js';
import { AuthState, User }     from '../types/types.js';

function getUserLocalStorage(): string | null {
  return localStorage.getItem('currentUser');
}

const INITIAL_STATE: AuthState = {
  user: getUserLocalStorage() 
          ? JSON.parse(localStorage.getItem('currentUser') as string)
          : null,
  isFetching: false,
  error: false,
  axiosJWT: null,
};

/* component to wrap app children */
export const AuthContext = createContext(INITIAL_STATE);

/* component to import and warp app */
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //check local storage on page load and log in if user found
  useEffect(() => {
    const storedUserJSON = localStorage.getItem('currentUser')

    if (storedUserJSON) {
      const storedUser: User = JSON.parse(storedUserJSON);
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
