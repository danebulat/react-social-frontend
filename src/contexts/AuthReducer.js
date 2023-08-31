const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.currentUser,
        axiosJWT: action.payload.axiosJWT,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "REGISTER_COMPLETE":
      return {
        user: action.payload.currentUser,
        axiosJWT: action.payload.axiosJWT,
        isFetching: false,
        error: false,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followingIds: [...state.user.followingIds, action.payload]
        },
      };
    case "UNFOLLOW": {
      return {
        ...state,
        user: {
          ...state.user,
          followingIds: state.user.followingIds.filter(uid => 
            uid !== action.payload)
        },
      };
    }
    case "LOGOUT":
      return {
        user: null,
        axiosJWT: null,
        isFetching: false,
        error: false,
      };
    case "REFRESH_TOKENS":
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        }
      };
    default:
      return state;
  }
}

export default AuthReducer;
