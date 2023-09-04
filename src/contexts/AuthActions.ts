import {AxiosError} from 'axios';
import { User, RefreshTokens } from '../types/types';

export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: User) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
})
 
export const LoginFailure = (error: AxiosError) => ({
  type: "LOGIN_FAILURE",
  payload: error,
})

export const RegisterSuccess = (user: User) => ({
  type: "REGISTER_COMPLETE",
  payload: user,
});

export const Follow = (userId: number) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId: number) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const RefreshTokensAction = (tokens: RefreshTokens) => ({
  type: "REFRESH_TOKENS",
  payload: tokens,
});
