import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { updateUser, updateUserPassword, setUser, login } from '../../../actions/user';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Profile = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.UserReducer.user);

  const Swal2 = withReactContent(Swal);

  const updateUserLoading = useSelector((state) => state.UserReducer.updateUserLoading);
  const updateUserResult = useSelector((state) => state.UserReducer.updateUserResult);
  const updateUserError = useSelector((state) => state.UserReducer.updateUserError);

  const updateUserPasswordLoading = useSelector((state) => state.UserReducer.updateUserPasswordLoading);
  const updateUserPasswordResult = useSelector((state) => state.UserReducer.updateUserPasswordResult);
  const updateUserPasswordError = useSelector((state) => state.UserReducer.updateUserPasswordError);

  const loginResult = useSelector((state) => state.UserReducer.loginResult);
  const loginError = useSelector((state) => state.UserReducer.loginError);

  const [ID, setID]                   = useState(0)
  const [name, setName]               = useState("")
  const [username, setUsername]       = useState("")
  const [email, setEmail]             = useState("")
  const [address, setAddress]         = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [oldPassword, setOldPassword]       = useState("")
  const [newPassword, setNewPassword]       = useState("")
  const [reNewPassword, setReNewPassword]   = useState("")

  useEffect(() => {
    let ujwt = localStorage.getItem("ujwt")
    if (ujwt === null || user.id === false) {
      props.history.push({ pathname:"/" })
    }
    if (user.id) {
      setID(user.id)
      setName(user.name)
      setUsername(user.username)
      setEmail(user.email)
      setAddress(user.address)
      setPhoneNumber(user.phoneNumber)
    }
  }, []);

  useEffect(() => {
    if (updateUserResult) {
      let ujwt = localStorage.getItem("ujwt");
      dispatch(setUser(ujwt));
      dispatch({
        type:"UPDATE_USER",
        payload:{
          loading: false,
          data: false,
          error: false,
        },
      });
      Swal2.fire({
        icon:"success",
        title:"Success update data",
      });
      // let headers = {
      //   headers: { "Content-Type":"application/json" }
      // }
      // let data = {
      //   username: username,
      //   password: newPassword,
      // }
      // dispatch(login(headers, data))
    }

    if (updateUserError) {
      let errorMessages = "<ul>";
      for (const errMessage of updateUserError.messages) {
        for (const [_, message] of Object.entries(errMessage)){
          errorMessages += `<li style="text-align:left; color:red;">${message}</li>`;
        }
      }
      errorMessages += "</ul>";
      Swal2.fire({
        icon:"error",
        title: "Error",
        html: errorMessages,
        showCloseButton: true,
      });
    }
  }, [updateUserResult, updateUserError]);

  useEffect(() => {
    if (updateUserPasswordResult) {
      dispatch({
        type:"UPDATE_USER_PASSWORD",
        payload:{
          loading: false,
          data: false,
          error: false,
        }
      })
      let headers = {
        headers: { "Content-Type":"application/json" }
      }
      let data = {
        username: username,
        password: newPassword,
      }
      dispatch(login(headers, data))
    }

    if (updateUserPasswordError) {
      let errorMessages = "<ul>";
      for (const errMessage of updateUserPasswordError.messages) {
        for (const [_, message] of Object.entries(errMessage)){
          errorMessages += `<li style="text-align:left; color:red;">${message}</li>`;
        }
      }
      errorMessages += "</ul>"
      Swal2.fire({
        icon:"error",
        title: "Error",
        html: errorMessages,
        showCloseButton: true,
      });
    }
  }, [updateUserPasswordResult, updateUserPasswordError]);

  useEffect(() => {
    if (loginResult) {
      localStorage.setItem("ujwt", loginResult.token)
      dispatch(setUser(localStorage.getItem("ujwt")))
      dispatch({
        type:"LOGIN",
        payload:{
          loading: false,
          data: false,
          error: false,
        },
      });
      setOldPassword("")
      setNewPassword("")
      setReNewPassword("")
      Swal2.fire({
        icon:"success",
        title:"Success update data",
      });
    }
    if (loginError) {
      Swal2.fire({
        icon:"error",
        title:"Failed change data",
      })
    }
  }, [loginResult, loginError])

  const doUpdateUser = (e) => {
    e.preventDefault()
    let ujwt = localStorage.getItem("ujwt");
    let headers = {
      headers: { "Content-Type":"application/json", "Authorization":`Bearer ${ujwt}` }
    }
    let data = {
      id:ID,
      name:name,
      username:username,
      email:email,
      address:address,
      phone_number:phoneNumber,
    }
    dispatch(updateUser(data, headers))
  }

  const doUpdateUserPassword = (e) => {
    e.preventDefault()
    let ujwt = localStorage.getItem("ujwt");
    let headers = {
      headers: { "Content-Type":"application/json", "Authorization":`Bearer ${ujwt}` }
    }
    let data = {
      id: ID,
      old_password: oldPassword,
      new_password: newPassword,
      re_new_password: reNewPassword,
    }
    dispatch(updateUserPassword(data, headers))
  }

  return (
    <CRow>
      <CCol md="8" lg="8" xl="8">
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm>
              <h1>User Data</h1>
              <p className="text-muted">Change Account Information</p>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-address-book" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  autoComplete="name"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                  disabled
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>@</CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-map" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  autoComplete="address"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-phone" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  autoComplete="phone_number"
                />
              </CInputGroup>
              <CRow>
                <CCol md="6">
                  <CButton color="primary" onClick={(e) => doUpdateUser(e)} block>Save</CButton>
                </CCol>
                <CCol md="6">
                  <Link to="/" className="btn btn-secondary btn-block mt-1" block>Cancel</Link>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="4" lg="4" xl="4">
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm>
              <h1>User Credentials</h1>
              <p className="text-muted">Change your password</p>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                  autoComplete="old_password"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  autoComplete="new_password"
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="password"
                  value={reNewPassword}
                  onChange={(e) => setReNewPassword(e.target.value)}
                  placeholder="Repeat New password"
                  autoComplete="re_new_password"
                />
              </CInputGroup>
              <CButton color="primary" onClick={(e) => doUpdateUserPassword(e)} block>Change Password</CButton>
              <Link to="/" className="btn btn-secondary btn-block mt-1" block>Cancel</Link>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
