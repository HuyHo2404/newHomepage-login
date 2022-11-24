import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { DOMAIN, DOMAIN_REACT, STATUS_CODE } from '../../../config/settingSystem';
import './AdminLayout.css';
import { logoutAction, logoutError, logoutSuccess } from '../../../redux/actions/authAction';
import { checkAccessToken } from '../../../utils/checkEXPToken';
import { getUserInfor } from '../../../redux/actions/userAction';

export default function AdminLayout() {
  const dispatch = useDispatch();
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  //logout
  const [isShowLogout, setIsShowLogout] = useState(false);
  // const userFirstName = useSelector((state) => state.user.userInfor.first_name)
  // const userLastName = useSelector((state) => state.user.userInfor.last_name)
  const fullName = 'abc';
  // const [userInfo, setUserInfo] = useState({});
  // useEffect(()=>{
  //   dispatch(getUserInfor())
  // },[])
  // const handleLogout = async () => {
  //   const refresh_token = localStorage.getItem('refresh_token');
  //   const access_token = localStorage.getItem('access_token');
  //   const dataLogout = {
  //     refresh_token
  //   };
  //   let axiosConfig = {
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       "Access-Control-Allow-Origin": "*",
  //       'Authorization': `Bearer ${access_token}`
  //     }
  //   };
  //   const res = await axios.post('http://localhost:8000/api/logout', dataLogout, axiosConfig)
  //   //   .then((res) => {
  //   if (res.data.statusCode === STATUS_CODE.SUCCESS) {
  //     dispatch(logoutSuccess(res.data))
  //     localStorage.clear();
  //     // const userRole = localStorage.getItem('user_role');
  //     // if(!userRole || userRole === null){
  //     return <Navigate to='/'></Navigate>
  //     // }
  //   } else {
  //     dispatch(logoutError(res.data))
  //   }
  // }

  const handleToggleSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };

  const handleShowLogout = () => {
    setIsShowLogout(!isShowLogout);
  };

  return (
    <div className={isShowSidebar ? 'wrapper isShowSidebar' : 'wrapper'}>
      <h1>Banner</h1>
      <div id="header">
        <div className="navbar">
          <div className="tool-bar">
            <div className="navbar-btn">
              <i
                onClick={() => {
                  handleToggleSidebar();
                }}
                className="fa-solid fa-bars"
              ></i>
            </div>
            <div className="title">WELCOME</div>
          </div>
          <p>LOGO</p>
          <div className="action">
            <div
              className="avatar"
              onClick={() => {
                handleShowLogout();
              }}
            >
              {/* <NavLink to="/login">
                <img src={require('../../../assets/images/avatar-default.png')} alt="" />
              </NavLink> */}
              <img src={require('../../../assets/images/avatar-default.png')} alt="" />
              {isShowLogout && (
                <div className="menu">
                  <ul>
                    <li>
                      <i className="fas fa-user-circle" />
                      <a href="#">My Profile</a>
                    </li>
                    <li>
                      <i className="fas fa-sign-out-alt" />
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <ul className="sidebar-menu-toggle">
          <li className="interface">
            <img src={require('../../../assets/images/avatar-default.png')} alt="" />
            <div className="username">
              <p>{fullName}</p>
            </div>
          </li>
          <li className="item">
            <a href="#">
              <i className="icon fa-solid fa-book-medical" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <i className="icon fa-solid fa-calendar-days" />
              <span>Campaign</span>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <i className="icon fa-solid fa-house" />
              <span>Account</span>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="main">
        <div className="card" />
      </div> */}
    </div>
  );
}
