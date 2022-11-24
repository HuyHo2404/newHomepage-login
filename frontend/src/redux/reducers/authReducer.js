import { STATUS_CODE } from '../../config/settingSystem';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../actions/types';

// const check_access_token = localStorage.getItem('access_token');

// const initialState = check_access_token
//   ? {
//       login: {
//         userEmail: localStorage.getItem('user_email'),
//         userName: localStorage.getItem('user_name'),
//         userRole: localStorage.getItem('user_role'),
//         isLoading: false,
//         isError: false,
//         isLoggedIn: true,
//         status: STATUS_CODE.SUCCESS,
//       },
//     }
//   : {
//       login: {
//         userEmail: null,
//         userName: null,
//         userRole: null,
//         isLoading: false,
//         isError: false,
//         isLoggedIn: false,
//         status: null,
//       },
//     };
const initialState = {
  login: {
    userEmail: null,
    userName: null,
    userRole: null,
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    status: null,
  },
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: {
          userName: null,
          userEmail: null,
          userRole: null,
          isLoading: true,
          isError: false,
          isLoggedIn: false,
          status: null,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          userEmail: action.payload.email,
          userName: action.payload.first_name + '' + action.payload.last_name,
          userRole: action.payload.permissions.role_type,
          isLoading: false,
          isError: false,
          isLoggedIn: true,
          status: STATUS_CODE.SUCCESS,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          userName: null,
          userEmail: null,
          userRole: null,
          isLoading: false,
          isError: true,
          isLoggedIn: false,
          status: STATUS_CODE.NOT_FOUND,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: {
          userName: null,
          userEmail: null,
          userRole: null,
          isLoading: false,
          isError: true,
          isLoggedIn: false,
          status: STATUS_CODE.NOT_FOUND,
        }
      }
    case LOGOUT_ERROR:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default authReducer;
