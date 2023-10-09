import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../actions/UserAction";

const INITIAL_STATE = {
  user: {
    email: "",
    token: "",
    auth: false,
  },
};

function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
        },
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user: {
          auth: false,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {
          email: "",
          token: "",
          auth: false,
        },
      };

    default:
      return {
        ...state,
      };
  }
}

export default UserReducer;
