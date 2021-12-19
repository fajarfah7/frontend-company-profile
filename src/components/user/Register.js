import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { register } from '../../actions/user';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [name, setName]               = useState("")
  const [username, setUsername]       = useState("")
  const [email, setEmail]             = useState("")
  const [address, setAddress]         = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword]       = useState("")
  const [rePassword, setRePassword]   = useState("")
  const [registerStatus, setRegisterStatus] = useState(false)

  const Swal2 = withReactContent(Swal)
  const dispatch = useDispatch()
  const resetRegisterRedux = useMemo(() => {
    return {
      type:"REGISTER",
      payload: {
        loading: false,
        data: false,
        error: false,
      }
    }
  }, [])
  const registerLoading = useSelector((state) => state.UserReducer.registerLoading)
  const registerResult = useSelector((state) => state.UserReducer.registerResult)
  const registerError = useSelector((state) => state.UserReducer.registerError)
  const headers = {headers:{"Content-Type":"application/json"}}

  useEffect(() => {
    if (registerResult) {
      setRegisterStatus(true)
      Swal2.fire({
        icon:"success",
        title:"Success Register"
      }).then((res) => {
        if (res.isConfirmed) {
          props.history.push({
            pathname:"/",
          });
        }
      })
    }

    if (registerError) {
      let errorMessages = "<ul>";
      for (const errMessage of registerError.messages) {
        for (const [key, message] of Object.entries(errMessage)){
          errorMessages += `<li style="text-align:left; color:red;" key=${key}>${message}</li>`;
        }
      }
      errorMessages += "</ul>";

      Swal2.fire({
        icon:"error",
        title:"Register failed",
        html:errorMessages,
        showCloseButton:true,
      })
    }
    dispatch(resetRegisterRedux)
  }, [dispatch, registerResult, registerError, Swal2, props.history, resetRegisterRedux])

  const submitForm = () => {
    let data = {
      "id":0,
      "name":name,
      "username":username,
      "email":email,
      "address":address,
      "phone_number":phoneNumber,
      "password":password,
      "re_password":rePassword
    }

    dispatch(register(headers, data))
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
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
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="password"
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
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                      placeholder="Repeat password"
                      autoComplete="re_password"
                    />
                  </CInputGroup>
                  {!registerLoading && <CButton color="primary" onClick={submitForm} block>Create Account</CButton>}
                  {registerLoading && <CButton color="success" disabled block>Loading</CButton>}
                  {registerStatus && <Link to="/" className="btn btn-secondary btn-block mt-1" block>Back</Link>}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
