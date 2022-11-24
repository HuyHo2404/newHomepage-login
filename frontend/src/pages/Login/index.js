import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../redux/actions/authAction';
import { Navigate } from 'react-router-dom';
import { ROLES, STATUS_CODE } from '../../config/settingSystem';

function Login() {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.login.userRole);
 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email must be required").email("Please enter a valid email"),
      password: Yup.string().required("Password must required").min(6, "Password must be at least 6 characters")
    }),
    onSubmit: (values) => {
      dispatch(loginAccount(values));
    }
  })
  if(userRole && userRole === ROLES.ADMIN){
    return <Navigate to="/admin"></Navigate>
  }
  if(userRole && userRole === ROLES.DAC_MEMBERS){
    return <Navigate to="/dac-member"></Navigate>
  }
  if(userRole && userRole === ROLES.ADVERTISER){
    return <Navigate to="/advertiser"></Navigate>
  }
  return (
    <div className='wraper-login'>
      <div className="cover">
      <form onSubmit={formik.handleSubmit}>
        <h1>WELCOME</h1>
        <div className="form__control">
          <input type="email" name="email" value={formik.values.email} placeholder='Email' onChange={formik.handleChange}></input>
          {formik.errors.email && (
            <p style={{ color: "red" }}>{formik.errors.email}</p>
          )}
        </div>
        <div className="form__control">
          <input type="password" name="password" value={formik.values.password} placeholder='Password' onChange={formik.handleChange}></input>
          {formik.errors.password && (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" id="btn-login">Login</button>
        <div className="another-login">
          <div className="facebook">
            <button type="submit" value="Facebook" id="btn-facebook">Facebook</button>
          </div>
          <div className="google">
            <button type="button" value="Google" id="btn-google">Google</button>
          </div>
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default Login;
