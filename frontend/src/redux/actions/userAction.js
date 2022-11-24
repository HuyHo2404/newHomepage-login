import { STATUS_CODE, TOKEN } from '../../config/settingSystem';
import { authServices } from '../../services/authService';
import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from './types';
import axios from 'axios'
import { checkAccessToken, checkRefreshToken } from '../../utils/checkEXPToken';
export const getUserInfor = () => {
  return async (dispatch) => {
    try {
      const checkTimeAccessToken = checkAccessToken()
      if (checkTimeAccessToken === true) {
        await authServices.getUserInfor(localStorage.getItem(TOKEN))
          .then((res) => {
            dispatch(getUserInfoSuccess(res.data.content[0]));
          })
      } else {
        const checkTimeRefreshToken = checkRefreshToken();
        if(checkTimeRefreshToken === true) {
          const refreshToken = {
            refresh_token: localStorage.getItem('refresh_token'),
          }
          await authServices.getAccessToken(refreshToken).then((res) => {
            console.log("token moi ", res.data.access_token)
            // check time refresh token trong db
          })
          // call api lay lai access token

        }else{
          // refresh token het han(clear redux, log out) log out 
        }

      }

    } catch (e) {
      dispatch(getUserInfoError(e));
    }
  };
};
export const getUserInfoSuccess = (payload) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload,
  };
};

export const getUserInfoError = (error) => {
  return {
    type: GET_USER_INFO_FAIL,
    payload: error,
  };
};

