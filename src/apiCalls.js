import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { serverUri } from './config/server';

export function getAxiosJWTInstance(currentUser, dispatch) {
  const axiosJWT = axios.create();

  // check refresh token before every request
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(currentUser.accessToken);
  
      // generate new tokens if access token expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await refreshTokenCall(currentUser, dispatch);
        config.headers["authorization"] = "Bearer " + currentUser.accessToken;
      }
  
      // return updated config for the request
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosJWT;
}

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({type: "LOGIN_START"});

  try {
    const res = await axios.post(`${serverUri}/api/login`, userCredentials);
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    
    const currentUser = res.data;
    const axiosJWT = getAxiosJWTInstance(currentUser, dispatch);
    dispatch({type: "LOGIN_SUCCESS", payload: { currentUser, axiosJWT }});
  } 
  catch(err) {
    dispatch({type: "LOGIN_FAILURE", payload: err});
  }
}

export const registerCall = async (userCredentials, dispatch) => {
  try {
    const res = await axios.post(`${serverUri}/api/register`, userCredentials);
    localStorage.setItem('currentUser', JSON.stringify(res.data));

    const currentUser = res.data;
    const axiosJWT = getAxiosJWTInstance(currentUser, dispatch)
    dispatch({ type: "REGISTER_COMPLETE", payload: { currentUser, axiosJWT }});
  }
  catch (err) {
    console.log(err);
  }
}

export const logoutCall = async (currentUser, axiosJWT, dispatch) => {
  try {
    await axiosJWT.post(`${serverUri}/api/logout`,
      { token: currentUser.refreshToken },
      { headers: { authorization: `Bearer ${currentUser.accessToken}` }});

    localStorage.removeItem('currentUser');
    dispatch({ type: "LOGOUT" });
  }
  catch (err) {
    console.log(err);
  }
}

export const refreshTokenCall = async (currentUser, dispatch) => {
  try {
    const res = await axios.post(`${serverUri}/api/refresh`,
      { token: currentUser.refreshToken });
    dispatch({ type: "REFRESH_TOKENS", payload: res.data });
  }
  catch (err) {
    console.log(err);
  }
}
