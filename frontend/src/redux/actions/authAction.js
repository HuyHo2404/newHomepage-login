import { STATUS_CODE, TOKEN } from '../../config/settingSystem';
import { authServices } from '../../services/authService';
import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR } from './types';
import axios from 'axios'
export const loginAccount = (userLogin) => {
  return async (dispatch) => {
    try {
      await authServices.signin(userLogin).then(async (res) => {
        if (res.data.statusCode === STATUS_CODE.SUCCESS) {
          localStorage.clear();
          localStorage.setItem('access_token', (res.data.access_token));
          localStorage.setItem('access_token_exp', (res.data.access_token_exp));
          localStorage.setItem('refresh_token', (res.data.refresh_token));
          localStorage.setItem('refresh_token_exp', (res.data.refresh_token_exp));
          await authServices.getUserInfor(localStorage.getItem(TOKEN))
            .then((res) => {
              console.log("res data: ", res.data.content[0])

              localStorage.setItem('user_role', res.data.content[0].permissions.role_type);
              localStorage.setItem('user_email', res.data.content[0].email);
              localStorage.setItem('user_name', res.data.content[0].first_name + ' ' + res.data.content[0].last_name);
              dispatch(loginAccountSuccess(res.data.content[0]));

            })
        }
        if (res.data.statusCode === STATUS_CODE.NOT_FOUND) {
          alert("Email or password is incorrect!");
          dispatch(loginAccountError(res.data));
        }

      })
    } catch (e) {
      dispatch(loginAccountError(e));
    }
  };
};
export const loginAccountSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginAccountError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};
// export const logoutAction = () => {
//   // const data = {
//   //   access_token, refresh_token
//   // }
//   // const res = await axios.post('http://localhost:8000/api/logout', { refresh_token }, {
//   //   headers: {
//   //     Authorization: `Bearer ${access_token}`
//   //   }
//   // });
//   // console.log("ressss",res)

//   return async (dispatch) => {
//     try {
//       await authServices.logout(refresh_token).then((res) => {
//         console.log('ressss' , res)
//       })
//       // await authServices.logout(data).then((res) => {
//       //   console.log(res)
//       // })
//       // const dataLogout = {
//       //   refresh_token
//       // };
//       // let axiosConfig = {
//       //   headers: {
//       //     'Content-Type': 'application/json;charset=UTF-8',
//       //     "Access-Control-Allow-Origin": "*",
//       //     'Authorization': `Bearer ${access_token}`
//       //   }
//       // };
//       // await axios.post('http://localhost:8000/api/logout', dataLogout, axiosConfig)
//       //   .then((res) => {
//       //     console.log("RESPONSE RECEIVED: ", res.data.statusCode);
//       //     if (res.data.statusCode === STATUS_CODE.SUCCESS) {
//       //       // localStorage.clear();
//       //     }
//       //   })
//       //   .catch((err) => {
//       //     console.log("AXIOS ERROR: ", err);
//       //   })
//     } catch (e) {
//       dispatch(logoutError(e))
//     }
//   }
// }
export const logoutSuccess = (payload) => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error,
  };
};