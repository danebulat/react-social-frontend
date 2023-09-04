import {AxiosError, AxiosInstance} from "axios";

/* -------------------------------------------------- */
/* Authentication + User                              */
/* -------------------------------------------------- */

export type User = {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  isAdmin: boolean;
  createdAt: string;
  followingIds: number[];
  accessToken: string;
  refreshToken: string;
}

export type UserCredentials = {
  username?: string;
  email: string;
  password: string;
}

export type DecodedToken = {
  exp: number;
  iat: number;
}

export type RefreshTokens = {
  accessToken: string;
  refreshToken: string;
}

/* -------------------------------------------------- */
/* User displays                                      */
/* -------------------------------------------------- */

/* sidebar user data */
export type SidebarUser = {
  userId: number;
  username: string;
  profilePicture: string | null;
  createdAt: Date;
}

/* fetched user data to display their profile */
export type FetchedUser = {
  id: number;
  username: string;
  email: string;
  profile_picture: string | null;
  cover_picture: string | null;
  desc: string | null;
  city: string | null;
  from: string | null;
  relationship: number;
  followingIds: number[];
}

/* -------------------------------------------------- */
/* Auth Context + Reducer Types                       */
/* -------------------------------------------------- */

export type ActionType =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { currentUser: User, axiosJWT: AxiosInstance }}
  | { type: "LOGIN_FAILURE"; payload: AxiosError }
  | { type: "REGISTER_COMPLETE"; payload: { currentUser: User, axiosJWT: AxiosInstance }}
  | { type: "FOLLOW"; payload: number }
  | { type: "UNFOLLOW"; payload: number }
  | { type: "LOGOUT"; }
  | { type: "REFRESH_TOKENS"; payload: RefreshTokens; }

export type DispatchType = React.Dispatch<ActionType>;

export type AuthState = {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  axiosJWT?: AxiosInstance | null;
  dispatch?: DispatchType;
}

/* -------------------------------------------------- */
/* Posts                                              */
/* -------------------------------------------------- */

export type PostType = {
  id: number;
  user_id: number;
  desc: string;
  img: string;
  created_at: Date;
  updated_at: Date;
  likes: number;
  likeIds: number[];
}

