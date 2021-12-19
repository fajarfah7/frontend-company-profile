import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CCol,
  CInput,
  CLabel,
} from '@coreui/react';
import { login, setUser } from '../../../actions/user';

const LoginModal = forwardRef((props, ref) => {
  const [stateModalLogin, setStateModalLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const loginResult = useSelector((state) => state.UserReducer.loginResult)
  const loginError = useSelector((state) => state.UserReducer.loginError)
  const [errorMessage, setErrorMessage] = useState("")

  const headers = {
    headers:{
      "Content-Type":"application/json"
    }
  }

  useEffect(() => {
    if (stateModalLogin) {
      setErrorMessage("")
      setUsername("")
      setPassword("")
    }
  }, [stateModalLogin])

  useEffect(() => {
    if (loginResult) {
      localStorage.setItem("ujwt", loginResult.token)
      setStateModalLogin(false)
      dispatch(setUser(loginResult.token))
    }
    if (loginError) {
      setErrorMessage(loginError.messages[0].api)
    }
  }, [dispatch, loginResult, loginError])

  const doLogin = () => {
    let data = {"username":username,"password":password}
    dispatch(login(headers, data))
  }
  const changeStateModalLogin = () => {
    setStateModalLogin(!stateModalLogin)
  }
  useImperativeHandle(ref, () => ({
    changeStateModalLogin
  }))

  return (
    <CModal
      show={stateModalLogin}
      onClose={() => setStateModalLogin(false)}
      size="sm"
    >
      <CModalHeader closeButton>
        <CModalTitle>Login Form</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row style={{display:errorMessage === "" ? "none":"block"}}>
          <CCol md="12"><CLabel style={{color:"red"}}>{errorMessage}</CLabel></CCol>
        </CFormGroup>
        <CFormGroup>
          <CLabel>Username</CLabel>
          <CInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doLogin()
              }
            }}
          />
        </CFormGroup>
        <CFormGroup>
          <CLabel>Password</CLabel>
          <CInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                doLogin()
              }
            }}
          />
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={doLogin}>Login</CButton>{' '}
        <CButton color="secondary" onClick={() => {
          setStateModalLogin(false)
        }}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
})

export default LoginModal;
