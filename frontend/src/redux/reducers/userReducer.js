import { STATUS_CODE } from '../../config/settingSystem';
import { GET_USER_INFO_FAIL, GET_USER_INFO_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  userInfor: {
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    email: '',
  },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfor: {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          address: action.payload.address,
          phone_number: action.payload.phone_number,
          email: action.payload.email,
        },
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
