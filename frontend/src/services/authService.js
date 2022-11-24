// import Axios from 'axios';
import axios from 'axios';
import { DOMAIN } from '../../src/config/settingSystem';

export const authServices = {
  signin: (payload) => {
    return axios({
      url: `${DOMAIN}/api/login`,
      method: 'POST',
      data: payload
    })
  },
  getUserInfor: (token) => {
    return axios({
      url: `${DOMAIN}/api/profile`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
  },
  // logout: (token) => {
  //   return Axios({
  //     url: `${DOMAIN}/api/logout`,
  //     method:'POST',
  //     // data phai la 1 object
  //     data: token.refresh_token,
  //     headers: {'Authorization': 'Bearer ' + token.access_token}
  //   })
  // }
  logout: (payload) => {
    return axios({
      method: 'POST',
      url: `${DOMAIN}/api/logout`,
      data: payload,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
  },
  getAccessToken: (refresh_token) => {
    return axios({
      method: "POST",
      url: `${DOMAIN}/api/refresh-token`,
      data: refresh_token,
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
  }

}




// const login = (user) => {
//   return axios.post(`${API_URL}/login`, user);
// };

// const logout = () => {
//   localStorage.removeItem('user');
// };

// export { login, logout };
